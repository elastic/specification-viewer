import { createContext, useContext, useState, useEffect } from 'react';
import { compareVersions } from 'compare-versions';

import { Model, Endpoint, TypeName, ValueOf } from './metamodel';

export const SchemaContext = createContext<Context | undefined>(undefined);

type Context = {
  schema: Model | {};
  references: Record<string, Record<string, string[]>>;
  version: string;
  setVersion: (version: string) => void;
  allVersions: string[];
}

type Version = {
  name: string;
}

const crossReference = (schema: Model): Record<string, Record<string, string[]>> => {
  const refs: Record<string, Record<string, string[]>> = {};

  const addEndpointReference = (source: Endpoint, type: TypeName, comment: string) => {
    const typeName = `${type.namespace}::${type.name}`;
    if (!(typeName in refs)) {
      refs[typeName] = {}
    }
    if (!('endpoints' in refs[typeName])) {
      refs[typeName].endpoints = [];
    }
    const ref = `${source.name} ${comment}`
    if (refs[typeName].endpoints.indexOf(ref) === -1) {
      refs[typeName].endpoints.push(ref);
    }
  }

  const addTypeReference = (source: TypeName, type: TypeName, comment: string) => {
    const typeName = `${type.namespace}::${type.name}`;
    if (!(typeName in refs)) {
      refs[typeName] = {}
    }
    if (refs[typeName].types === undefined) {
      refs[typeName].types = [];
    }
    const ref = `${source.namespace}::${source.name} ${comment}`;
    if (refs[typeName].types.indexOf(ref) === -1) {
      refs[typeName].types.push(ref);
    }
  }

  const addValueOfReferences = (source: TypeName, valueOf: ValueOf, comment: string) => {
    switch (valueOf.kind) {
      case 'instance_of':
        addTypeReference(source, valueOf.type, comment);
        break;
      case 'array_of':
        addValueOfReferences(source, valueOf.value, comment);
        break;
      case 'union_of':
        for (const item of valueOf.items) {
          addValueOfReferences(source, item, comment);
        }
        break;
      case 'dictionary_of':
        addValueOfReferences(source, valueOf.key, comment);
        addValueOfReferences(source, valueOf.value, comment);
        break;
    }
  }

  // register types referenced in endpoints
  for (const e of schema.endpoints) {
    if (e.request) {
      addEndpointReference(e, e.request, 'Endpoint Request');
    }
    if (e.response) {
      addEndpointReference(e, e.response, 'Endpoint Response');
    }
  }

  // register types references in other types
  for (const type of schema.types) {
    switch (type.kind) {
      case 'interface':
        if (type.generics) {
          for (const t of type.generics) {
            addTypeReference(type.name, t, 'Generic');
          }
        }
        if (type.inherits) {
          addTypeReference(type.name, type.inherits.type, 'Inherits');
        }
        if (type.behaviors) {
          for (const t of type.behaviors) {
            addTypeReference(type.name, t.type, 'Behavior');
          }
        }
        if (type.attachedBehaviors) {
          for (const b of type.attachedBehaviors) {
            addTypeReference(type.name, {namespace: '_spec_utils', name: b}, 'Attached behavior');
          }
        }
        for (const p of type.properties) {
          addValueOfReferences(type.name, p.type, `${p.name} (Property)`);
        }
        break;
      case 'request':
        if (type.generics) {
          for (const t of type.generics) {
            addTypeReference(type.name, t, 'Generic');
          }
        }
        if (type.inherits) {
          addTypeReference(type.name, type.inherits.type, 'Inherits');
        }
        if (type.behaviors) {
          for (const t of type.behaviors) {
            addTypeReference(type.name, t.type, 'Behavior');
          }
        }
        if (type.attachedBehaviors) {
          for (const b of type.attachedBehaviors) {
            addTypeReference(type.name, {namespace: '_spec_utils', name: b}, 'Attached behavior');
          }
        }
        for (const p of type.path) {
          addValueOfReferences(type.name, p.type, `${p.name} (path property)`);
        }
        for (const p of type.query) {
          addValueOfReferences(type.name, p.type, `${p.name} (Query property)`);
        }
        if (type.body.kind === "value") {
          addValueOfReferences(type.name, type.body.value, 'Body');
        }
        else if (type.body.kind === "properties") {
          for (const p of type.body.properties) {
            addValueOfReferences(type.name, p.type, `${p.name} (Body property)`);
          }
        }
        if (type.behaviors) {
          for (const t of type.behaviors) {
            addTypeReference(type.name, t.type, 'Behavior');
          }
        }
        break;
      case 'response':
        if (type.generics) {
          for (const t of type.generics) {
            addTypeReference(type.name, t, 'Generic');
          }
        }
        if (type.body.kind === "value") {
          addValueOfReferences(type.name, type.body.value, 'Body');
        }
        else if (type.body.kind === "properties") {
          for (const p of type.body.properties) {
            addValueOfReferences(type.name, p.type, `${p.name} (Body property)`);
          }
        }
        if (type.behaviors) {
          for (const t of type.behaviors) {
            addTypeReference(type.name, t.type, 'Behavior');
          }
        }
        if (type.attachedBehaviors) {
          for (const b of type.attachedBehaviors) {
            addTypeReference(type.name, {namespace: '_spec_utils', name: b}, 'Attached behavior');
          }
        }
        if (type.exceptions) {
          for (const e of type.exceptions) {
            if (e.body.kind === "value") {
              addValueOfReferences(type.name, e.body.value, 'Exception body');
            }
            else if (e.body.kind === "properties") {
              for (const p of e.body.properties) {
                addValueOfReferences(type.name, p.type, `${p.name} (Exception body property)`);
              }
            }
          }
        }
        break;
      case 'enum':
        break;
      case 'type_alias':
        addValueOfReferences(type.name, type.type, 'Type');
        if (type.generics) {
          for (const t of type.generics) {
            addTypeReference(type.name, t, 'Generic');
          }
        }
        break;
    }
  }
  return refs;
};

export default function SchemaProvider({ children }: React.PropsWithChildren<{}>) {
  const [schema, setSchema] = useState<Model | {}>({});
  const [references, setReferences] = useState<Record<string, Record<string, string[]>>>({});
  const [version, setVersion] = useState<string>('');
  const [allVersions, setAllVersions] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const r = await fetch('https://api.github.com/repos/elastic/elasticsearch-specification/branches');
      if (r.status === 200) {
        const s: Version[] = await r.json();
        const versions = s.map(v => v.name).filter(v => v.match(/^[0-9]+\.[0-9x]+$/));
        setAllVersions(['main'].concat(versions.sort(compareVersions).reverse()));
      }
      else {
        setAllVersions(['main', '8.16', '8.15', '8.14', '8.13']);
      }
    })();
  }, []);

  useEffect(() => {
    if (!version) {
      return;
    }
    (async () => {
      const r = await fetch(`https://raw.githubusercontent.com/elastic/elasticsearch-specification/refs/heads/${version}/output/schema/schema.json`);
      if (r.status === 200) {
        const s = await r.json();
        const refs = crossReference(s);
        setSchema(s);
        setReferences(refs);
      }
    })();
  }, [version]);

  return (
    <SchemaContext.Provider value={{ schema, references, version, setVersion, allVersions }}>
      { children }
    </SchemaContext.Provider>
  );
}

export function useSchema(): Model {
  const ctx = useContext(SchemaContext);
  const schema = ctx ? ctx.schema : {};
  return schema as Model;
}

export function useSchemaContext(): Context {
  const ctx = useContext(SchemaContext);
  return ctx ? ctx : { schema: {}, references: {}, version: 'main', setVersion: (v) => {}, allVersions: [] };
}
