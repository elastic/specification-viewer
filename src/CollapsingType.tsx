import { useCallback } from 'react';
import { useSchema } from './SchemaContext';
import Details from './Details';
import CollapsingDetails from './CollapsingDetails';
import Type from './Type';

import { BaseType } from './metamodel';

type Props = {
  header?: string;
  namespace: string;
  name: string;
}

export default function CollapsingType({ header, namespace, name }: Props) {
  const schema = useSchema();

  const renderType = useCallback(() => {
    for (const type of schema.types) {
      const bt = type as BaseType;
      if (bt.name.namespace === namespace && bt.name.name === name) {
        return <Type type={bt} />;
      }
    }
    return <Details value="No additional info" />
  }, [name, namespace, schema.types]);

  return (
    <CollapsingDetails header={header} value=<code>{`${namespace}::${name}` }</code> cb={renderType} />
  );
}
