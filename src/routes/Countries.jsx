import { useEffect, useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Form, Spinner } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFavouritesFromSource } from "../auth/firebase";
import { initializeCountries } from "../store/countriesSlice";
import { addFavourite, removeFavourite } from "../store/favouritesSlice";

const Countries = () => {
  const dispatch = useDispatch();

  const countriesList = useSelector((state) => state.countries.countries);
  const favourites = useSelector((state) => state.favourites.favourites);
  const loading = useSelector((state) => state.countries.isLoading);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(initializeCountries());
    dispatch(getFavouritesFromSource());
  }, [dispatch]);

  useEffect(() => {}, [search]);

  if (loading) {
    return (
      <Col className="text-center m-5">
        <Spinner
          animation="border"
          role="status"
          className="center"
          variant="info"
        >
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Col>
    );
  }

  return (
    <Container fluid>
      <Row className="justify-content-center py-5">
        <Form.Control
          style={{ width: "50%" }}
          type="search"
          className="me-2"
          placeholder="Search for countries"
          aria-label="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </Row>
      
      <Row xs={2} md={3} lg={4} className="mx-5">
        {countriesList
          .filter((country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
          )
          .map((country, index) => (
            <Col className="mt-5" key={country.name.common}>
              <Card className="h-100 country-card" style={{ backgroundColor: index % 2 === 0 ? "#e6f7ff" : "#c7e3ff" }}>
                {favourites.some(
                  (favourite) => favourite === country.name?.common
                ) ? (
                  <FavoriteBorderIcon
                    onClick={() =>
                      dispatch(removeFavourite(country.name.common))
                    }
                  />
                ) : (
                  <FavoriteIcon
                    onClick={() =>
                      dispatch(addFavourite(country.name.common))}
                  /> 
                )}
                <Link
                  to={`/countries/${country.name.common}`}
                  state={{ country: country }}
                  className="card-link"
                >
                  <Card.Img
                    variant="top"
                    src={country.flags.svg}
                    className="rounded h-50"
                    style={{
                      objectFit: "cover",
                      minHeight: "200px",
                      maxHeight: "200px",
                    }}
                  />
                </Link>
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{country.name.common}</Card.Title>
                  <Card.Subtitle className="mb-5 text-muted">
                    {country.name.official}
                  </Card.Subtitle>
                  
                  <ListGroup
                    variant="flush"
                    className="flex-grow-1 justify-content-end"
                  >
                    <ListGroup.Item>
                      <i className="bi bi-translate me-2"></i>
                      {Object.values(country.languages ?? {}).join(", ")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="bi bi-cash-coin me-2"></i>
                      {Object.values(country.currencies || {})
                        .map((currency) => currency.name)
                        .join(", ")}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <i className="bi bi-people me-2"></i>
                      {country.population.toLocaleString()}
                    </ListGroup.Item>
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default Countries;