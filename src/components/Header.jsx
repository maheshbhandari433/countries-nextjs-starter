import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth, db, logout } from "../auth/firebase";
import { getNameOfUser } from "../auth/firebase";

const Header = () => {
  const [user] = useAuthState(auth);

  const [name, setName] = useState();

  useEffect(() => {
   getNameOfUser(user).then((name) => {
      setName(name);
    });
  }, [user]);
  
  return (
    <Container fluid>
      <Row>
        <Navbar bg="light" variant="light">
          <Container className="justify-content-end">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
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
                {user && <Button onClick={logout}>Logout</Button>
                }
              </Nav>
              {/* Insert bootstrap text container here */}
              <Navbar.Text className="m-3">
                {name ? `Welcome, ${name}` : "Welcome, Guest"}
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </Row>
    </Container>
  );
};

export default Header;