import CollapsingDetails from './CollapsingDetails';
import CollapsingType from './CollapsingType';
import ValueOf from './ValueOf';
import Variants from './Variants';

import { TypeAlias as TypeAliasType } from './metamodel';

type Props = {
  type: TypeAliasType;
}

export default function Interface({ type }: Props) {
  return (
    <>
      <ValueOf header="Type" value={type.type} />
      {type.generics &&
        <CollapsingDetails expanded header="Generics">
          {type.generics.map(g => (
            <CollapsingType key={`${g.namespace}::${g.name}`} namespace={g.namespace} name={g.name} />
          ))}
        </CollapsingDetails>
      }
      {type.variants && <Variants variants={type.variants} />}
    </>
  );
}
