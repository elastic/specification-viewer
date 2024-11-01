import { useCallback } from 'react';
import { useSchema } from './SchemaContext';
import Details from './Details';
import CollapsingDetails from './CollapsingDetails';
import Endpoint from './Endpoint';

type Props = {
  header?: string;
  name: string;
}

export default function CollapsingEndpoint({ header, name }: Props) {
  const schema = useSchema();

  const renderEndpoint = useCallback(() => {
    for (const endpoint of schema.endpoints) {
      if (endpoint.name === name) {
        return <Endpoint endpoint={endpoint} />;
      }
    }
    return <Details value="No additional info" />
  }, [name, schema.endpoints]);

  return (
    <CollapsingDetails header={header} value=<code>{ name }</code> cb={renderEndpoint} />
  );
}
