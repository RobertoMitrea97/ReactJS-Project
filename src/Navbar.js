import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Redirect } from 'react-router-dom';

function CollapsibleExample() {
  
  const submitLogout = (e) =>{
    e.preventDefault();
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    return <Redirect to = {{ pathname: "/" }} />;
  }

  var Authceva = '';
  if(!localStorage.getItem('auth_token')){
    Authceva = (
      <Nav.Link href="/Login" > Login </Nav.Link>
    )

  }
  else
  {
    Authceva = (
      
      <Nav>
      <Nav.Link href="/" >Home </Nav.Link>
      <Nav.Link href="/Products" >Products </Nav.Link>
      <Nav.Link href="/AddProduct" >Add Products </Nav.Link>
      <button onClick={submitLogout}>LogOut</button>
      </Nav>
      )

  }
  
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
      <Container>
        <Navbar.Brand href="/">React App</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            
            
          </Nav>
          <Nav>
            
            {Authceva}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;