import Details from './Details';
import ValueOf from './ValueOf';
import Properties from './Properties';

import { Body as BodyType } from './metamodel';
import { ValueBody, PropertiesBody } from './metamodel';

type Props = {
  body: BodyType;
}

export default function Body({ body }: Props) {
  if (body.kind === 'value') {
    const v = body as ValueBody;
    return (
      <>
        <ValueOf header="Value" value={v.value} />
        {v.codegenName && <Details header="Code generation name" value={v.codegenName} />}
      </>
    );
  }
  else if (body.kind === 'properties') {
    const v = body as PropertiesBody;
    return (
      <Properties header="Body properties" properties={v.properties} />
    );
  }
  else if (body.kind === 'no_body') {
    return (
      <Details header="No body" />
    );
  }
  else {
    return null;
  }
}
