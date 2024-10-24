import Details from './Details';
import CollapsingDetails from './CollapsingDetails';
import CollapsingType from './CollapsingType';

import { TypeAlias as TypeAliasType } from './metamodel';

type Props = {
  type: TypeAliasType;
}

export default function Interface({ type }: Props) {
  return (
    <p>Hi</p>
  );
}
