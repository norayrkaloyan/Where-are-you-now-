import { useEffect, useState } from "react";
import axios from "axios";

const CountryInfo = ({ userCountry }) => {
  const [countryInfo, setCountryInfo] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/alpha/${userCountry}`)
      .then((response) => setCountryInfo(response.data[0]))
      .catch((error) => setError(error));
  }, [userCountry]);
  console.log(countryInfo);
  return (
    <div>
      {countryInfo ? (
        <div className="infos">
          <img
            src={countryInfo.flags.png}
            alt={`flag of ${countryInfo.altSpellings[1]}`}
          />
          <p>
            The country you are located in is {countryInfo.altSpellings[1]},(
            {countryInfo.altSpellings[3]}).
          </p>
          <p>
            {countryInfo.population
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
            people live here.
          </p>
          <p>
            The capital of {countryInfo.altSpellings[1]} is{" "}
            {countryInfo.capital[0]}.
          </p>
          <p>
            People are driving on the {countryInfo.car.side} side of the street.
          </p>
          <p>
            In Deutschland, {countryInfo.altSpellings[3]} is called{" "}
            {countryInfo.translations.deu.official}.
          </p>
        </div>
      ) : (
        "Loading..."
      )}
      {error && (
        <h2>Oh No! Something went wrong! This is the error: {error.message}</h2>
      )}
    </div>
  );
};

export default CountryInfo;
