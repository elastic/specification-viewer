import { createContext, useContext, useState, useEffect } from 'react';
import { compareVersions } from 'compare-versions';

import { Model } from './metamodel';

type Context = {
  schema: Model | {};
  version: string;
  setVersion: (version: string) => void;
  allVersions: string[];
}

type Version = {
  name: string;
}

export const SchemaContext = createContext<Context | undefined>(undefined);

export default function SchemaProvider({ children }: React.PropsWithChildren<{}>) {
  const [schema, setSchema] = useState<Model | {}>({});
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
      const s = await r.json();
      setSchema(s);
    })();
  }, [version]);

  return (
    <SchemaContext.Provider value={{ schema, version, setVersion, allVersions }}>
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
  return ctx ? ctx : { schema: {}, version: 'main', setVersion: (v) => {}, allVersions: [] };
}
