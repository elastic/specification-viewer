import Details from './Details';
import CollapsingDetails from './CollapsingDetails';
import CollapsingType from './CollapsingType';
import ValueOf from './ValueOf';

import { Behavior as BehaviorType } from './metamodel';

type Props = {
  behaviors: BehaviorType[];
}

export default function Behaviors({ behaviors }: Props) {
  return (
    <CollapsingDetails header="Behaviors">
      {behaviors.map((b, i) => (
        <div key={i}>
          <CollapsingType header="Behavior" namespace={b.type.namespace} name={b.type.name} />
          {b.generics &&
            <CollapsingDetails header="Generics">
              {b.generics.map((g, i) => (
                <ValueOf key={i} value={g} />
              ))}
            </CollapsingDetails>
          }
          {b.meta &&
            <CollapsingDetails header="Meta">
              {Object.keys(b.meta).map(k => (
                <Details key={k} header={k} value={b.meta ? b.meta[k] : ""} />
              ))}
            </CollapsingDetails>
          }          
        </div>
      ))}
    </CollapsingDetails>
  );
}
