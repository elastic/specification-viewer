import Details from "./Details";
import CollapsingDetails from "./CollapsingDetails";
import { Availabilities as EndpointAvailabilities } from "./metamodel";

type Props = {
  avails: EndpointAvailabilities;
}

export default function Availabilities({ avails }: Props) {
  return (
    <CollapsingDetails header="Availability">
      {avails.stack && 
        <CollapsingDetails expanded header="Stack">
          {avails.stack.since && <Details header="Since" value={avails.stack.since} />}
          {avails.stack.featureFlag && <Details header="Feature Flag" value={avails.stack.featureFlag} />}
          {avails.stack.stability && <Details header="Stability" value={avails.stack.stability} />}
          {avails.stack.visibility && <Details header="Visibility" value={avails.stack.visibility} />}
        </CollapsingDetails>
      }
      {avails.serverless && 
        <CollapsingDetails expanded header="Serverless">
          {avails.serverless.since && <Details header="Since" value={avails.serverless.since} />}
          {avails.serverless.featureFlag && <Details header="Feature Flag" value={avails.serverless.featureFlag} />}
          {avails.serverless.stability && <Details header="Stability" value={avails.serverless.stability} />}
          {avails.serverless.visibility && <Details header="Visibility" value={avails.serverless.visibility} />}
        </CollapsingDetails>
      }
    </CollapsingDetails>
  );
}
