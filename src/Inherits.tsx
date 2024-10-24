import CollapsingDetails from './CollapsingDetails';
import CollapsingType from './CollapsingType';

import { Inherits as InheritsType } from './metamodel';

type Props = {
  inherits: InheritsType;
}

export default function Inherits({ inherits }: Props) {
  return (
    <CollapsingDetails header="Inherits">
      <CollapsingType header="Type" namespace={inherits.type.namespace} name={inherits.type.name} />
      {/*
      {inherits.generics &&
        {inherits.generics.map(v => <ValueOf value={v} />}
      }
      */}
    </CollapsingDetails>
  );
}
