import { useState } from "react";
import SearchBar from "../components/SearchBar";
import { getWeatherByCity } from "../services/weatherApi";

function Search() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Traduire code pays → nom complet
  const getCountryName = (code) => {
    const regionNames = new Intl.DisplayNames(["fr"], { type: "region" });
    return regionNames.of(code);
  };

  const handleSearch = async () => {
    if (!city) {
      setError("Veuillez entrer une ville");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await getWeatherByCity(city);
      setWeather(data);
    } catch {
      setError("Ville non trouvée");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = () => {
    const stored = JSON.parse(localStorage.getItem("favorites")) || [];

    if (stored.length >= 3) {
      alert("Maximum 3 villes favorites");
      return;
    }

    const exists = stored.find(
      (item) => item.name === weather.name
    );

    if (exists) {
      alert("Ville déjà en favoris");
      return;
    }

    stored.push(weather);
    localStorage.setItem("favorites", JSON.stringify(stored));
    alert("Ville ajoutée aux favoris ⭐");
  };

  return (
    <div>
      <h1>Recherche météo</h1>

      <SearchBar city={city} setCity={setCity} onSearch={handleSearch} />

      {loading && <p>Chargement...</p>}
      {error && <p>{error}</p>}

      {weather && (
        <div>
          <h2>
            {weather.name} {getCountryName(weather.sys.country)}
          </h2>

          <p>
            {Math.round(weather.main.temp)}°C |{" "}
            {weather.weather[0].description}
          </p>

          <p>💧 Humidité : {weather.main.humidity}%</p>
          <p>💨 Vent : {weather.wind.speed} m/s</p>

          <button onClick={addToFavorites}>
            Ajouter aux favoris ⭐
          </button>
        </div>
      )}
    </div>
  );
}

export default Search;
