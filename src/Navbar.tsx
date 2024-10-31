import Nav from 'react-bootstrap/Nav';
import RBNavbar from 'react-bootstrap/Navbar';
import { NavLink, useLocation } from 'react-router-dom';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname.startsWith(path) ? "active": "";
  };

  return (
    <RBNavbar expand="lg" className="Navbar bg-body-tertiary fixed-top">
      <RBNavbar.Brand>
        <img
          src="/logo-elastic-glyph-color.svg"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="Elastic logo"
        />
        &nbsp;
        Elasticsearch Specification Viewer
      </RBNavbar.Brand>
      <RBNavbar.Toggle aria-controls="basic-navbar-nav" />
      <RBNavbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as={NavLink} to="/" className={isActive("/endpoints")}>Endpoints</Nav.Link>
          <Nav.Link as={NavLink} to="/types" className={isActive("/types")}>Types</Nav.Link>
        </Nav>
      </RBNavbar.Collapse>
    </RBNavbar>
  );
}

