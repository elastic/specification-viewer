import ReactMarkdown from 'react-markdown';

import Details from './Details';
import CollapsingDetails from './CollapsingDetails';
import CollapsingType from './CollapsingType';
import Availabilities from './Availabilities';
import Deprecation from './Deprecation';

import { Endpoint as EndpointType } from './metamodel';

type Props = {
  endpoint: EndpointType;
}

export default function Endpoint({ endpoint }: Props) {
  return (
    <>
      <CollapsingDetails header="Description">
        <ReactMarkdown>
          {endpoint.description}
        </ReactMarkdown>
      </CollapsingDetails>
      <Details header="Documentation" value=
        <a href={endpoint.docUrl} target="_blank" rel="noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-up-right" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"/>
            <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"/>
          </svg>
        </a>
      />
      {endpoint.availability && <Availabilities avails={endpoint.availability} />}
      {endpoint.deprecation && <Deprecation deprecation={endpoint.deprecation} />}
      <CollapsingDetails header="URLs">
        {endpoint.urls.map(url => {
          return url.methods.map(method =>
            <>
              {url.deprecation ?
                <CollapsingDetails expanded value=<code>{`${method} ${url.path}`}</code>>
                  <Deprecation deprecation={url.deprecation} />
                </CollapsingDetails>
              :
                <Details value=<code>{`${method} ${url.path}`}</code> />
              }
            </>
          );
        })}
      </CollapsingDetails>
      <CollapsingDetails header="Request">
        <Details header="Body required" value={(endpoint.requestBodyRequired) ? 'Yes' : 'No'} />
        {endpoint.requestMediaType &&
          <CollapsingDetails header="Media types">
            {endpoint.requestMediaType.map(m => <Details value=<code>{m}</code> />)}
          </CollapsingDetails>
        }
        {endpoint.request && <CollapsingType header="Type definition" namespace={endpoint.request.namespace} name={endpoint.request.name} />}
      </CollapsingDetails>
      <CollapsingDetails header="Response">
        {endpoint.responseMediaType &&
          <CollapsingDetails header="Media types">
            {endpoint.responseMediaType.map(m => <Details value=<code>{m}</code> />)}
          </CollapsingDetails>
        }
        {endpoint.response && <CollapsingType header="Type definition" namespace={endpoint.response.namespace} name={endpoint.response.name} />}
      </CollapsingDetails>
      {endpoint.privileges &&
        <CollapsingDetails header="Privileges">
          {endpoint.privileges.index &&
            <CollapsingDetails expanded header="Index">
              {endpoint.privileges.index.map(p => <Details value={p} />)}
            </CollapsingDetails>
          }
          {endpoint.privileges.cluster &&
            <CollapsingDetails expanded header="Cluster">
              {endpoint.privileges.cluster.map(p => <Details value={p} />)}
            </CollapsingDetails>
          }
        </CollapsingDetails>
      }
    </>
  );
}

