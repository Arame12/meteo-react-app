import { useState, useEffect } from "react";
import { getWeatherByCity } from "../services/weatherAPI";
import "./FavoritesPage.css";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  const getCountryName = (code) => {
    const regionNames = new Intl.DisplayNames(["fr"], { type: "region" });
    return regionNames.of(code);
  };

  const addFavoriteFromPage = async () => {
    if (!city) {
      setError("Veuillez entrer une ville");
      return;
    }

    if (favorites.length >= 3) {
      setError("Maximum 3 villes favorites");
      return;
    }

    try {
      const data = await getWeatherByCity(city);

      const exists = favorites.find(
        (item) => item.name === data.name
      );

      if (exists) {
        setError("Ville déjà en favoris");
        return;
      }

      const updated = [...favorites, data];
      setFavorites(updated);
      localStorage.setItem(
        "favorites",
        JSON.stringify(updated)
      );

      setCity("");
      setError("");
    } catch {
      setError("Ville non trouvée");
    }
  };

  const removeFavorite = (cityName) => {
    const updated = favorites.filter(
      (item) => item.name !== cityName
    );
    setFavorites(updated);
    localStorage.setItem(
      "favorites",
      JSON.stringify(updated)
    );
  };

  return (
    <div className="favorites-container">

      <h1 className="favorites-title">
        Villes favorites
      </h1>

      {/* 🔹 Ajouter une ville */}
      <div className="favorites-add-container">

        <input
          className="search-input"
          type="text"
          placeholder="Ajouter une ville"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button
          className="search-button"
          onClick={addFavoriteFromPage}
        >
          Ajouter ⭐
        </button>

        {error && <p className="favorites-error">{error}</p>}

      </div>

      <hr className="favorites-divider" />

      {/* 🔹 Liste des favoris */}
      {favorites.length === 0 && (
        <p className="favorites-empty">
          Aucune ville favorite
        </p>
      )}

      {favorites.map((city, index) => (
        <div key={index} className="favorite-card">

          <h2 className="favorite-city">
            {city.name} {getCountryName(city.sys.country)}
          </h2>

          <p className="favorite-weather">
            {Math.round(city.main.temp)}°C |{" "}
            {city.weather[0].description}
          </p>

          <p>💧 Humidité : {city.main.humidity}%</p>
          <p>💨 Vent : {city.wind.speed} m/s</p>

          <button
            className="favorite-delete-btn"
            onClick={() => removeFavorite(city.name)}
          >
            Supprimer ❌
          </button>

        </div>
      ))}
    </div>
  );
}

export default FavoritesPage;
