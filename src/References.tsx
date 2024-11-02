import { useSchemaContext } from './SchemaContext';
import CollapsingDetails from './CollapsingDetails';
import CollapsingEndpoint from './CollapsingEndpoint';
import CollapsingType from './CollapsingType';

type Props = {
  typeName: string;
}

export default function References({ typeName }: Props) {
  const { references } = useSchemaContext();
  let refCount = 0;

  if (references[typeName] !== undefined) {
    if (references[typeName].endpoints) {
      refCount += references[typeName].endpoints.length;
    }
    if (references[typeName].types) {
      refCount += references[typeName].types.length;
    }
  }

  return (
    <>
      {typeName in references && (references[typeName].endpoints || references[typeName].types) &&
        <CollapsingDetails header="References" value={`${refCount}`}>
          {references[typeName].endpoints &&
            <>
              {references[typeName].endpoints.map(endpointName => {
                const comment = endpointName.split(' ').slice(1).join(' ');
                const name = endpointName.split(' ')[0];
                return <CollapsingEndpoint key={name} header={comment} name={name} />;
              })}
            </>
          }
          {references[typeName].types &&
            <>
              {references[typeName].types.map(typeName => {
                const comment = typeName.split(' ').slice(1).join(' ');
                const [namespace, name] = typeName.split(' ')[0].split('::')
                return <CollapsingType key={typeName} header={comment} namespace={namespace} name={name} />;
              })}
            </>
          }
        </CollapsingDetails>
      }
    </>
  );
}
