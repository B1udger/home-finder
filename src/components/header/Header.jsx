import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css';
import Logo from '../../img/logo.png';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Nav className="me-auto">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/rentals/add" className="nav-link">
            Add Offer
          </Link>
        </Nav>
        <Container className="justify-content-center">
          <Navbar.Brand className="mx-auto">
            <Link to="/">
              <img src={Logo} height="60%" alt="HomeFinder Logo" />
            </Link>
          </Navbar.Brand>
        </Container>
      </Container>
    </Navbar>
  );
}
