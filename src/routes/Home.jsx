import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Row, Col, Form } from "react-bootstrap";
import { Container, Typography, Button} from "@mui/material";
import { Loader } from "@googlemaps/js-api-loader";
import styles from './Home.module.css';
import { Link } from "react-router-dom";
import { CountryMap } from "../components/CountryMap";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [capitalName, setCapitalName] = useState("");
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);
  const mapContainerRef = useRef(null);

  const handleInputChange = (event) => {
    setCapitalName(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/capital/${capitalName}?fullText=true`
      );

      if (response.data.length === 0) {
        throw new Error("Country is empty");
      } else {
        setCountry(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching country:", error);
      setError("Country not found for the provided capital");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Container className={styles.root}>
    <Typography variant="h2" className={styles.title}>
      Welcome to Homepage
    </Typography>
    <Typography variant="body1" paragraph>
      Discover, explore and learn about different countries around the world.
    </Typography>
    <Button
      component={Link}
      to="/countries"
      variant="contained"
      color="primary"
      className={styles.button}
    >
      Explore Countries
    </Button>
  </Container>

     <Container> 
      <Row className="mt-5">
        <Col xs={12} md={8} className="mx-auto">
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="capitalName">
              <Form.Control
                type="text"
                placeholder="Enter capital of the country"
                value={capitalName}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? "Loading..." : "View in map"}
            </Button>
          </Form>
          {error && <p className="text-danger">{error}</p>}
        </Col>
      </Row>

      {country && (
        <Row className="mt-5">
          <Col xs={12} md={15}>
            <CountryMap country={country} />
          </Col>
        </Row>
      )}
    </Container>
    </>
  );
};

export default Home;
