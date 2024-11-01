import { MouseEvent } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { useSchemaContext } from './SchemaContext';

export default function NavBar() {
  const { version, allVersions } = useSchemaContext();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path) ? "active": "";
  };

  const changeVersion = (ev: MouseEvent<HTMLElement>) => {
    ev.preventDefault();
    const version = ev.currentTarget.textContent;
    if (version) {
      let pathParts = location.pathname.split('/');
      pathParts[1] = version;
      navigate(pathParts.join('/'));
    }
  };

  return (
    <Navbar expand="lg" className="NavBar bg-body-tertiary fixed-top">
      <Navbar.Brand>
        <img
          src="/logo-elastic-glyph-color.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Elastic logo"
        />
        &nbsp;
        Elasticsearch Specification Viewer
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to={`/${version}/endpoints`} className={isActive("/endpoints")}>Endpoints</Nav.Link>
          <Nav.Link as={NavLink} to={`/${version}/types`} className={isActive("/types")}>Types</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        <NavDropdown title=<span>Elasticsearch version: <b>{version}</b></span>>
          {allVersions.map(v => (
            <NavDropdown.Item key={v} onClick={changeVersion}>{v}</NavDropdown.Item>
          ))}
        </NavDropdown>
      </Navbar.Collapse>
    </Navbar>
  );
}

