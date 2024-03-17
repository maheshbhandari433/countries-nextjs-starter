import { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../auth/firebase";
import { getNameOfUser } from "../auth/firebase";

const Header = () => {
  const [user] = useAuthState(auth);
  const [name, setName] = useState();

  useEffect(() => {
    if (user) {
      getNameOfUser(user).then((name) => {
        setName(name);
      });
    } else {
      setName(null);
    }
  }, [user]);

  return (
    <Container fluid>
      <Navbar bg="light" variant="light" expand="lg" className="justify-content-center">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/">
              <Button variant="contained">Home</Button>
            </Link>
            <Link to="/countries">
              <Button variant="contained">Countries</Button>
            </Link>
            <Link to="/favourites">
              <Button variant="contained">Favourites</Button>
            </Link>
            {!user && (
              <>
                <Link to="/register">
                  <Button variant="contained">Register</Button>
                </Link>
                <Link to="/login">
                  <Button variant="contained">Login</Button>
                </Link>
              </>
            )}
          </Nav>
          <Nav>
            {user && <Button onClick={logout}>Logout</Button>}
          </Nav>
          <Navbar.Text className="m-3">
            {name ? `Welcome, ${name}` : "Welcome, Guest"}
          </Navbar.Text>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export default Header;
