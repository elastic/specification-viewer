import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { useSchema } from './SchemaContext';
import Loading from './Loading';
import NavBar from './NavBar';
import EndpointsView from './EndpointsView';
import TypesView from './TypesView';

export default function SchemaView() {
  const schema = useSchema();

  if (!('endpoints' in schema)) {
    return <Loading />
  }

  return (
    <BrowserRouter>
      <Container fluid className="SchemaView">
        <NavBar />
        <Routes>
          <Route path="/" element={
            <EndpointsView />
          } />
          <Route path="/endpoints/:endpoint" element={
            <EndpointsView />
          } />
          <Route path="/types" element={
            <TypesView />
          } />
          <Route path="/types/:type" element={
            <TypesView />
          } />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}
