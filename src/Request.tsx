import CollapsingDetails from './CollapsingDetails';
import CollapsingType from './CollapsingType';
import Inherits from './Inherits';
import Properties from './Properties';
import Body from './Body';
import Behaviors from './Behaviors';
import AttachedBehaviors from './AttachedBehaviors';

import { Request as RequestType } from './metamodel';

type Props = {
  type: RequestType;
}

export default function Request({ type }: Props) {
  return (
    <>
      {type.generics &&
        <CollapsingDetails expanded header="Generics">
          {type.generics.map(g => (
            <CollapsingType key={`${g.namespace}::${g.name}`} header="Generic" namespace={g.namespace} name={g.name} />
          ))}
        </CollapsingDetails>
      }
      {type.inherits && <Inherits inherits={type.inherits} />}
      {type.path.length > 0 && <Properties header="Path properties" properties={type.path} />}
      {type.query.length > 0 && <Properties header="Query properties" properties={type.query} />}
      <Body body={type.body} />
      {type.behaviors && <Behaviors behaviors={type.behaviors} />}
      {type.attachedBehaviors && <AttachedBehaviors behaviors={type.attachedBehaviors} />}
    </>
  );
}
