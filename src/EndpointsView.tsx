import { useState, useRef } from 'react';

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { NavLink, useParams } from 'react-router-dom';

import { useSchema } from './SchemaContext';
import Endpoint from './Endpoint';

export default function EndpointsView() {
  const [search, setSearch] = useState('');
  const searchInput = useRef<HTMLInputElement>(null);
  const schema = useSchema();
  const { endpoint } = useParams();

  const searchChanged = () => {
    setSearch(searchInput.current?.value || '');
  };

  const filteredEndpoints = schema.endpoints.filter(endpoint => {
    return endpoint.name.match(search) != null;
  });

  const selectedEndpoint = (!endpoint) ? null : schema.endpoints.filter(e => e.name === endpoint)?.[0];

  return (
    <>
      <Container fluid className="EndpointsList">
        <FloatingLabel
          controlId="floatingInput"
          label="Regex Filter"
          className="mb-3"
        >
          <Form.Control type="text" autoFocus ref={searchInput} onChange={searchChanged} />
        </FloatingLabel>
        <ListGroup variant="flush">
          {filteredEndpoints.map((endpoint) => {
            return <ListGroup.Item key={endpoint.name} as={NavLink} action to={ '/endpoints/' + endpoint.name }>{ endpoint.name }</ListGroup.Item>;
          })}
        </ListGroup>
      </Container>
      <Container fluid className="EndpointsView">
        {selectedEndpoint != null ?
          <>
            <h1>{ selectedEndpoint.name }</h1>
            <Endpoint endpoint={selectedEndpoint} />
          </>
        :
          <h4>← Select an endpoint</h4>
        }
      </Container>
    </>
  );
}
