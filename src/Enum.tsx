import Details from './Details';
import CollapsingDetails from './CollapsingDetails';
import Description from './Description';
import Availabilities from './Availabilities';

import Deprecation from './Deprecation';

import { Enum as EnumType } from './metamodel';

type Props = {
  type: EnumType;
}

export default function Interface({ type }: Props) {
  return (
    <>
      <Details header="Open" value={type.isOpen ? 'Yes' : 'No'} />
      <CollapsingDetails expanded header="Members">
        {type.members.map((m, i) => (
          <div key={i}>
            {(m.aliases || m.codegenName || m.description || m.deprecation || m.availability) ?
              <CollapsingDetails value=<code>{m.name}</code>>
                {m.description && <Description descr={m.description} />}
                {m.codegenName && <Details header="Code generation name" value={m.codegenName} />}
                {m.availability && <Availabilities avails={m.availability} />}
                {m.deprecation && <Deprecation deprecation={m.deprecation} />}
              </CollapsingDetails>
            :
              <Details value=<code>{m.name}</code> />
            }
          </div>
        ))}
      </CollapsingDetails>
    </>
  );
}
