import Details from './Details';
import CollapsingDetails from './CollapsingDetails';
import CollapsingType from './CollapsingType';
import Inherits from './Inherits';
import Behaviors from './Behaviors';
import Properties from './Properties';
import Variants from './Variants';
import AttachedBehaviors from './AttachedBehaviors';

import { Interface as InterfaceType } from './metamodel';

type Props = {
  type: InterfaceType;
}

export default function Interface({ type }: Props) {
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
      {type.behaviors && <Behaviors behaviors={type.behaviors} />}
      {type.attachedBehaviors && <AttachedBehaviors behaviors={type.attachedBehaviors} />}
      <Properties properties={type.properties} />
      {type.shortcutProperty && <Details header="Shortcut property" value={type.shortcutProperty} />}
      {type.variants && <Variants variants={type.variants} />}
    </>
  );
}
