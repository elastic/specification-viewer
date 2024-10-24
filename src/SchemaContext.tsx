import { createContext, useContext, useState, useEffect } from 'react';

import { Model } from './metamodel';

const SchemaContext = createContext<Model | {}>({});

export default function SchemaProvider({ children }: React.PropsWithChildren<{}>) {
  const [schema, setSchema] = useState<Model | {}>({});

  useEffect(() => {
    (async () => {
      const r = await fetch('https://raw.githubusercontent.com/elastic/elasticsearch-specification/refs/heads/main/output/schema/schema.json');
      const s = await r.json();
      setSchema(s);
    })();
  }, []);

  return (
    <SchemaContext.Provider value={schema}>
      { children }
    </SchemaContext.Provider>
  );
}

export function useSchema(): Model {
  return useContext(SchemaContext) as Model;
}
