import ReactMarkdown from 'react-markdown';

import Details from './Details';
import CollapsingDetails from './CollapsingDetails';
import Availabilities from './Availabilities'
;
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
        {type.members.map(m => (
          <>
            {(m.aliases || m.codegenName || m.description || m.deprecation || m.availability) ?
              <CollapsingDetails value=<code>{m.name}</code>>
                {m.description &&
                  <CollapsingDetails header="Description">
                    <ReactMarkdown>
                      {m.description}
                    </ReactMarkdown>
                  </CollapsingDetails>
                }
                {m.codegenName && <Details header="Code generation name" value={m.codegenName} />}
                {m.availability && <Availabilities avails={m.availability} />}
                {m.deprecation && <Deprecation deprecation={m.deprecation} />}
              </CollapsingDetails>
            :
              <Details value=<code>{m.name}</code> />
            }
          </>
        ))}
      </CollapsingDetails>
    </>
  );
}
