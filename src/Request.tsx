import Details from './Details';
import CollapsingDetails from './CollapsingDetails';
import CollapsingType from './CollapsingType';

import { Request as RequestType } from './metamodel';

type Props = {
  type: RequestType;
}

export default function Interface({ type }: Props) {
  return (
    <p>Hi</p>
  );
}
