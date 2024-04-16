import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css';
import Logo from '../../img/logo.png';
import { Link } from 'react-router-dom';

export function Header({ isLogged, logoutHandler }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={Logo} alt="HomeFinder Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Offers
            </Nav.Link>

            {isLogged && isLogged.isAdmin && (
              <>
                <Nav.Link as={Link} to="/rentals/add">
                  Add Offer
                </Nav.Link>
                <Nav.Link as={Link} to="/users">
                  Users
                </Nav.Link>
                <Nav.Link as={Link} to="/users/add">
                  Add User
                </Nav.Link>
              </>
            )}
          </Nav>
          <Nav>
            {isLogged ? (
              <>
                <Nav.Link as={Link} to={`/user/${isLogged.id}`}>
                  My profile
                </Nav.Link>
                <Nav.Link as={Link} to="/" onClick={logoutHandler}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
