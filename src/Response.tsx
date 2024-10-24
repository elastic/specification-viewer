import Details from './Details';
import CollapsingDetails from './CollapsingDetails';
import CollapsingType from './CollapsingType';

import { Response as ResponseType } from './metamodel';

type Props = {
  type: ResponseType;
}

export default function Interface({ type }: Props) {
  return (
    <p>Hi</p>
  );
}
