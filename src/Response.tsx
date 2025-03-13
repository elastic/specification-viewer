import CollapsingDetails from './CollapsingDetails';
import CollapsingType from './CollapsingType';
import Body from './Body';
import Behaviors from './Behaviors';
import Description from './Description';
import AttachedBehaviors from './AttachedBehaviors';
import Examples from './Examples';

import { Response as ResponseType } from './metamodel';

type Props = {
  type: ResponseType;
}

export default function Response({ type }: Props) {
  return (
    <>
      {type.generics &&
        <CollapsingDetails expanded header="Generics">
          {type.generics.map(g => (
            <CollapsingType key={`${g.namespace}::${g.name}`} namespace={g.namespace} name={g.name} />
          ))}
        </CollapsingDetails>
      }
      <Body body={type.body} />
      {type.behaviors && <Behaviors behaviors={type.behaviors} />}
      {type.attachedBehaviors && <AttachedBehaviors behaviors={type.attachedBehaviors} />}
      {type.exceptions &&
        <CollapsingDetails header="Exceptions">
          {type.exceptions.map((e, i) => (
            <CollapsingDetails key={i} header="Status code" value={e.statusCodes.join(', ')}>
              <Body body={e.body} />
              {e.description && <Description descr={e.description} />}
            </CollapsingDetails>
          ))}
        </CollapsingDetails>
      }
      {type.examples && <Examples examples={type.examples} />}
    </>
  );
}
