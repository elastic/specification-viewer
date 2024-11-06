import { useState, useRef } from 'react';

import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { NavLink, useParams } from 'react-router-dom';

import { useSchema, useSchemaContext } from './SchemaContext';
import Type from './Type';

import { BaseType } from './metamodel';

export default function TypesView() {
  const [search, setSearch] = useState('');
  const searchInput = useRef<HTMLInputElement>(null);
  const schema = useSchema();
  const { version } = useSchemaContext();
  const { type } = useParams();

  const searchChanged = () => {
    setSearch(searchInput.current?.value || '');
  };

  const filteredTypes = schema.types.filter(type => {
    const bt = type as BaseType;
    return `${bt.name.namespace}::${bt.name.name}`.match(new RegExp(search, "i")) != null;
  });

  const selectedType = (!type) ? null : schema.types.filter(t => `${t.name.namespace}::${t.name.name}` === type)?.[0];

  return (
    <>
      <Container fluid className="TypesList">
        <FloatingLabel
          controlId="floatingInput"
          label="Regex Filter"
          className="mb-3"
        >
          <Form.Control type="text" autoFocus ref={searchInput} onChange={searchChanged} />
        </FloatingLabel>
        <ListGroup variant="flush">
          {filteredTypes.map((type) => {
            const bt = type as BaseType;
            return <ListGroup.Item key={`${bt.name.namespace}::${bt.name.name}`} as={NavLink} action to={ `/${version}/types/${bt.name.namespace}::${bt.name.name}` }>{ `${bt.name.namespace}::${bt.name.name}` }</ListGroup.Item>;
          })}
        </ListGroup>
      </Container>
      <Container fluid className="TypesView">
        {selectedType != null ?
          <>
            <h1>{ `${selectedType.name.namespace}::${selectedType.name.name}` }</h1>
            <Type type={selectedType} />
          </>
        :
          <h4>← Select a type</h4>
        }
      </Container>
    </>
  );
}
