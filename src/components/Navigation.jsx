import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Nav, Navbar, Button } from 'react-bootstrap';
import { useAuth } from "../contexts/AuthContext";
import '../styles/Style.css';

function Navigation() {
  const location = useLocation();
  const { auth, logout } = useAuth();
  const user = auth?.user;
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    logout();
    navigate("/login");
  }

  return (
    <Navbar expand="lg" bg="dark" id="custom-navbar" data-bs-theme="dark" className="sticky-top shadow">
      <Container>
        <Navbar.Brand as={Link} to="/user" className="headerText"><h1>TrainingPage</h1></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav variant="underline" activeKey={location.pathname}>
            <Nav.Link as={Link} to="/user" eventKey="/user">
              My Page
            </Nav.Link>
            <Nav.Link as={Link} to="/newsession" eventKey="/newsession">
              New Session
            </Nav.Link>
            <Nav.Link as={Link} to="/userstats" eventKey="/userstats">
              Statistics
            </Nav.Link>
            <Nav.Link as={Link} to="/timer" eventKey="/timer">
              Timer
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            <Button
              variant="secondary"
              size="sm"
              onClick={handleLogout}
              className="mt-2 mt-lg-0"
            >
              Log out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Navigation