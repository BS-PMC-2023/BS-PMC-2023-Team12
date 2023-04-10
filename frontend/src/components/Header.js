import React, { useContext } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const auth = useContext(AuthContext);

  return (
    <header>
      <Navbar
        className="navbar navbar-expand-lg navbar-dark bg-primary"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                alt=""
                src="/SCE.png"
                width="60"
                height="60"
                className="d-inline-block align-top"
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {/* ----------pesonal zone button---------- */}
              <LinkContainer to="/PersonalZone">
                <Nav.Link>
                  אזור אישי<i className="fas"></i>
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/conntact">
                <Nav.Link>
                  צור קשר <i className="fas fa-phone"></i>
                </Nav.Link>
              </LinkContainer>
              {!auth.isLoggedIn && (
                <LinkContainer to="/login">
                  <Nav.Link>
                    התחברות <i className="fas fa-user"></i>
                  </Nav.Link>
                </LinkContainer>
              )}
              {auth.isLoggedIn && (
                <Button style={{ fontSize: '1.2rem' }} onClick={auth.logout}>
                  התנתק
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
