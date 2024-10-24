import Details from './Details';
import CollapsingDetails from './CollapsingDetails';
import CollapsingType from './CollapsingType';

import { Interface as InterfaceType } from './metamodel';

type Props = {
  type: InterfaceType;
}

export default function Interface({ type }: Props) {
  return (
    <p>Hi</p>
  );
}
