import { useEffect } from 'react';

import { PropsWithChildren } from "react";
import { useParams, Navigate } from 'react-router-dom';

import Loading from './Loading';
import { useSchema, useSchemaContext } from './SchemaContext';

export default function LoadSchema({ children }: PropsWithChildren<{}>) {
  const { schemaVersion } = useParams();
  const schema = useSchema();
  const { version, setVersion } = useSchemaContext();

  useEffect(() => {
    if (!schemaVersion) {     
      setVersion('main');
    }
    else if (schemaVersion !== version) {
      setVersion(schemaVersion);
    }
  });

  if (!('endpoints' in schema)) {
    return <Loading />
  }
  
  if (children === undefined) {
    return <Navigate to={`/${version}/endpoints`} />
  }

  return (
    <>{children}</>
  );
}
