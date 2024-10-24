import { useSchema } from './SchemaContext';
import CollapsingDetails from './CollapsingDetails';
import Type from './Type';

import { BaseType } from './metamodel';

type Props = {
  header: string;
  namespace: string;
  name: string;
}

export default function CollapsingType({ header, namespace, name }: Props) {
  const schema = useSchema();

  const renderType = () => {
    for (const type of schema.types) {
      const bt = type as BaseType;
      if (bt.name.namespace === namespace && bt.name.name === name) {
        return <Type type={bt} />;
      }
    }
  };

  return (
    <CollapsingDetails header={header} value=<code>{ `${namespace}::${name}` }</code> cb={renderType} />
  );
}
