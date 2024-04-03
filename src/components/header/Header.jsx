import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css';
import Logo from '../../img/logo.png'; 

export function Header() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
        </Nav>
        <Container className="justify-content-center">
        <Navbar.Brand href="#home" className="mx-auto">
          <img
            src={Logo}
            height="60%"
            alt="HomeFinder Logo"
          />
        </Navbar.Brand>
        </Container>
      </Container>
    </Navbar>
  );
}