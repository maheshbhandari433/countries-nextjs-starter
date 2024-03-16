import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { Button, Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { CountryMap } from "../components/CountryMap";

const CountriesSingle = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [weather, setWeather] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [borderCountries, setBorderCountries] = useState([]);
  const country = location.state.country;


  useEffect(() => {

    const fetchData = async () => {
        try {

            // Fetch weather data
            const weatherResponse = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&units=metric&appid=5d162dad58ffa39544422393f6d5273f`
            );
            setWeather(weatherResponse.data);

             /* console.log(country); */
           
            // Fetch bordering country names
            const borderCountryPromises = (country.borders || []).map(async (border) => {
                const response = await axios.get(
                    `https://restcountries.com/v3.1/alpha/${border}`
                );
                return response.data;
                
            });
            const borderCountriesArrays = await Promise.all(borderCountryPromises);
            const borderCountries = borderCountriesArrays.flat();
            setBorderCountries(borderCountries);

        } catch (error) {
            console.error("Error fetching data:", error);
            setError(true);
        } finally {
          setLoading(false);
        }
    };
    
    fetchData();

}, [country.borders, country.capital]);


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
    <Container fluid className="px-0">
    <Row className="m-5">
        <Col>
          {" "}
          <Image
            thumbnail
            src={`https://source.unsplash.com/featured/1600x900?${country.name.common}`}
          />
        </Col>
          <Col>
          <h2 className="display-4">{country.name.common}</h2>
          <h3>Capital: {country.capital}</h3>
          <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt={weather.weather[0].description}
              />
          {!error && weather ? (
            <div>
              <p>
                Right now it is <strong>{weather.main.temp}</strong> degrees and {weather.weather[0].description} in {country.capital}
              </p>    
            </div>
          ) : <p>Weather data not available</p>}
          
          <div>
  <h4>Borders</h4>
  {country.borders && country.borders.length > 0 ? (
    <ul>
      {borderCountries.map((borderCountry) => (
    <div key={borderCountry.cca3}>
      <Button
      variant="light"
      onClick={() => navigate(`/countries/${borderCountry.name.common}`, { state: { country: borderCountry } } 
      )}
      > 
      {borderCountry.name.common}
    </Button>
    </div>
  ))} 
    </ul>
  ) : (
    <p>This country has no border.</p>
  )} 
</div>
  </Col>
    </Row>

      <Row>
      <Col className="mx-3">
      <Button 
      variant="light" 
      onClick={() => navigate("/countries")}
      >
      Back to Countries
      </Button> 
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
  );
};

export default CountriesSingle;

