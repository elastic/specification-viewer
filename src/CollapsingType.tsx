import { useCallback } from 'react';
import { useSchema, useSchemaContext } from './SchemaContext';
import Details from './Details';
import CollapsingDetails from './CollapsingDetails';
import Type from './Type';
import References from './References';

import { BaseType } from './metamodel';

type Props = {
  header?: string;
  namespace: string;
  name: string;
}

export default function CollapsingType({ header, namespace, name }: Props) {
  const schema = useSchema();
  const { references } = useSchemaContext();
  const typeName = `${namespace}::${name}`

  const renderType = useCallback(() => {
    for (const type of schema.types) {
      const bt = type as BaseType;
      if (bt.name.namespace === namespace && bt.name.name === name) {
        return <Type type={bt} />;
      }
    }
    if (references[typeName]) {
      return <References typeName={typeName} />;
    }
    return <Details value="No additional info" />
  }, [name, namespace, schema.types, references, typeName]);

  return (
    <CollapsingDetails header={header} value=<code>{typeName}</code> cb={renderType} />
  );
}
