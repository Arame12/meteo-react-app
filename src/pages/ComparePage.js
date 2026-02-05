import { useState } from "react";
import { getWeatherByCity } from "../services/weatherAPI";
import "./ComparePage.css";

function ComparePage() {
  const [city1, setCity1] = useState("");
  const [city2, setCity2] = useState("");
  const [weather1, setWeather1] = useState(null);
  const [weather2, setWeather2] = useState(null);
  const [error, setError] = useState("");

  const getCountryName = (code) => {
    const regionNames = new Intl.DisplayNames(["fr"], { type: "region" });
    return regionNames.of(code);
  };

  const handleCompare = async () => {
    if (!city1 || !city2) {
      setError("Veuillez entrer deux villes");
      return;
    }

    setError("");

    try {
      const data1 = await getWeatherByCity(city1);
      const data2 = await getWeatherByCity(city2);

      setWeather1(data1);
      setWeather2(data2);
    } catch {
      setError("Erreur lors de la récupération des données");
    }
  };

  return (
    <div className="compare-container">

      <h1 className="compare-title">
        Comparer deux villes
      </h1>

      <div className="compare-inputs">

        <input
          className="search-input"
          type="text"
          placeholder="Ville 1"
          value={city1}
          onChange={(e) => setCity1(e.target.value)}
        />

        <input
          className="search-input"
          type="text"
          placeholder="Ville 2"
          value={city2}
          onChange={(e) => setCity2(e.target.value)}
        />

        <button
          className="search-button"
          onClick={handleCompare}
        >
          Comparer
        </button>

      </div>

      {error && <p className="compare-error">{error}</p>}

      <div className="compare-results">

        {weather1 && (
          <div className="compare-card">

            <h2 className="compare-city">
              {weather1.name}{" "}
              {getCountryName(weather1.sys.country)}
            </h2>

            <p className="compare-weather">
              {Math.round(weather1.main.temp)}°C |{" "}
              {weather1.weather[0].description}
            </p>

            <p>💧 Humidité : {weather1.main.humidity}%</p>
            <p>💨 Vent : {weather1.wind.speed} m/s</p>

          </div>
        )}

        {weather2 && (
          <div className="compare-card">

            <h2 className="compare-city">
              {weather2.name}{" "}
              {getCountryName(weather2.sys.country)}
            </h2>

            <p className="compare-weather">
              {Math.round(weather2.main.temp)}°C |{" "}
              {weather2.weather[0].description}
            </p>

            <p>💧 Humidité : {weather2.main.humidity}%</p>
            <p>💨 Vent : {weather2.wind.speed} m/s</p>

          </div>
        )}

      </div>

    </div>
  );
}

export default ComparePage;
