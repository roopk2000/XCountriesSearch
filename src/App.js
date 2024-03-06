import React, { useState, useEffect } from "react";
import "./App.css"; // Import your CSS file

function CountriesApp() {
  const [countries, setCountries] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = () => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        return response.json();
      })
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch countries");
      });
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Filter countries based on the search term
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="input">
        <input
          type="text"
          placeholder="Search countries..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="ten"
        />
      </div>
      <div className="grid-container">
        {error && <p>{error}</p>}
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div key={country.name.common} className="grid-item countryCard">
              <img src={country.flags.svg} alt={country.name.common} />
              <p>{country.name.common}</p>
            </div>
          ))
        ) : (
          <p>No countries found.</p>
        )}
      </div>
    </>
  );
}

export default CountriesApp;
