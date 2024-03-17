import { useState } from "react";
import axios from "axios";
import { Container, Typography, Button, TextField, Grid, CircularProgress, Link } from "@mui/material";
import styles from './Home.module.css';
import { CountryMap } from "../components/CountryMap";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [countryName, setCountryName] = useState("");
  const [capital, setCapital] = useState("");
  const [error, setError] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [country, setCountry] = useState(null);


  const handleInputChange = (event) => {
    setCountryName(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
      );

      if (response.data.length === 0) {
        throw new Error("Country not found");
      } else {
        setCapital(response.data[0].capital[0]);
        setCountry(response.data[0]);
      }
    } catch (error) {
      console.error("Error fetching country:", error);
      setError("Country not found");
    } finally {
      setLoading(false);
    }
  };

  const handleShowMap = () => {
    setShowMap(true);
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

      <Container className={styles.root}>
        <Typography variant="h4" className={styles.title}>
          Find Country Capital
        </Typography>
        <Grid container spacing={4}>
        <Grid item xs={12} md={15}>
            <TextField
              label="Enter Country Name"
              variant="outlined"
              fullWidth
              value={countryName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12} md={15}>
            <Button variant="contained" color="primary" onClick={handleFormSubmit}>
              {loading ? <CircularProgress size={24} /> : "Get Capital"}
            </Button>
          </Grid>
        </Grid>
        {error && <Typography color="error">{error}</Typography>}
        {capital && (
          <div>
            <Typography variant="h5" className={styles.title}>
              Capital of {countryName} is {capital}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleShowMap}>
              Show Map
            </Button>
          </div>
        )}
      </Container>

      {showMap && capital && (
        <Container className={styles.root}>
          <Typography variant="h4" className={styles.title}>
            Country Map
          </Typography>
          <CountryMap country={country} />
        </Container>
      )}
    </>
  );
};

export default Home; 




/* import { useState } from "react";
import axios from "axios";
import { Row, Col, Form } from "react-bootstrap";
import { Container, Typography, Button, TextField} from "@mui/material";
import styles from './Home.module.css';
import { Link } from "react-router-dom";
import { CountryMap } from "../components/CountryMap";
import { GetCapital } from "../components/GetCapital";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [capitalName, setCapitalName] = useState("");
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);


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

  
    <GetCapital />

     <Container> 
      <Row className="mt-5">
        <Col xs={8} md={15} className="mx-auto">
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="capitalName">
              <TextField
                type="text"
                label="Enter Capital to see Country Map"
                value={capitalName}
                fullWidth
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
  */