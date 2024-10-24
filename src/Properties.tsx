import Details from './Details';
import CollapsingDetails from './CollapsingDetails';
import Description from './Description';
import Availabilities from './Availabilities';
import Deprecation from './Deprecation';
import ValueOf from './ValueOf';

import { Property as PropertyType } from './metamodel';

type Props = {
  header?: string;
  properties: PropertyType[];
}

export default function Properties({ header, properties }: Props) {
  return (
    <CollapsingDetails header={header ?? "Properties"}>
      {properties.map(p => (
        <CollapsingDetails key={p.name} value=<code>{p.name}</code>>
          <ValueOf value={p.type} />
          <Details header="Required" value={p.required ? "Yes" : "No"} />
          {p.description && <Description descr={p.description} />}
          {p.docUrl &&         
            <Details header="Documentation" value=
              <a href={p.docUrl} target="_blank" rel="noreferrer">
                Open&nbsp;
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
                  <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
                </svg>
              </a>
            />
          }
          {(p.serverDefault !== undefined) && <Details header="Server default" value={p.serverDefault.toString()} />}
          {p.availability && <Availabilities avails={p.availability} />}
          {p.deprecation && <Deprecation deprecation={p.deprecation} />}
          {p.codegenName && <Details header="Code generation name" value={p.codegenName} />}
          {p.aliases && <Details header="Aliases" value={p.aliases} />}
          {(p.containerProperty !== undefined) && <Details header="Container property" value={p.containerProperty ? 'Yes' : 'No'} />}
          {p.esQuirk && <Description header="Notes" descr={p.esQuirk} />}
        </CollapsingDetails>
      ))}
    </CollapsingDetails>
  );
}
