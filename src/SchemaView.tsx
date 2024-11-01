import Container from 'react-bootstrap/Container';
import { Routes, Route } from 'react-router-dom';

import LoadSchema from './LoadSchema';
import NavBar from './NavBar';
import EndpointsView from './EndpointsView';
import TypesView from './TypesView';

export default function SchemaView() {
  return (
    <Container fluid className="SchemaView">
      <NavBar />
      <Routes>
        <Route path="/" element={
          <LoadSchema />
        } />
        <Route path="/:schemaVersion" element={
          <LoadSchema />
        } />
        <Route path="/:schemaVersion/endpoints" element={
          <LoadSchema>
            <EndpointsView />
          </LoadSchema>
        } />
        <Route path="/:schemaVersion/endpoints/:endpoint" element={
          <LoadSchema>
            <EndpointsView />
          </LoadSchema>
        } />
        <Route path="/:schemaVersion/types" element={
          <LoadSchema>
            <TypesView />
          </LoadSchema>
        } />
        <Route path="/:schemaVersion/types/:type" element={
          <LoadSchema>
            <TypesView />
          </LoadSchema>
        } />
      </Routes>
    </Container>
  );
}
