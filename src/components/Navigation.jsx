import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import '../styles/Style.css';

function Navigation() {
  const location = useLocation();

  function handleLogout() {
    localStorage.removeItem("token");
    logout();
    navigate("/login");
  }

  return (
    <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="shadow">
      <Container>
        <Navbar.Brand as={Link} to="/home" className="headerText"><h1>Your Training Page</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav variant="underline" activeKey={location.pathname}>
            <Nav.Link as={Link} to="/newsession" eventKey="/newsession">
              New Session
            </Nav.Link>
            <Nav.Link as={Link} to="/home" eventKey="/home">
              My Page
            </Nav.Link>
            <Nav.Link as={Link} to="/statistics" eventKey="/statistics">
              Statistics
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleLogout}
              className="mt-2 mt-lg-0"
            >
              Logga ut
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Navigation