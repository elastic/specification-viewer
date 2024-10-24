import Details from "./Details";
import CollapsingDetails from "./CollapsingDetails";
import { Deprecation as EndpointDeprecation } from "./metamodel";

type Props = {
  deprecation: EndpointDeprecation;
}

export default function Deprecation({ deprecation }: Props) {
  return (
    <>
      <CollapsingDetails header="Deprecation">
        <Details header="Version" value={deprecation.version} />
        <Details header="Description" value={deprecation.description} />
      </CollapsingDetails>
    </>
  );
}
