import { useState, useEffect } from "react";
import { getWeatherByCity } from "../services/weatherAPI";
import "./FavoritesPage.css";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  // Charger les favoris depuis le localStorage
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  // Convertir le code pays en nom complet
  const getCountryName = (code) => {
    const regionNames = new Intl.DisplayNames(["fr"], {
      type: "region",
    });
    return regionNames.of(code);
  };

  // Ajouter une ville depuis la page Favoris
  const addFavorite = async () => {
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

  // Supprimer une ville
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
      <h1>Villes favorites</h1>

      {/* Ajouter une ville */}
      <div className="add-favorite-box">
        <input
          className="add-input"
          type="text"
          placeholder="Ajouter une ville"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <button
          className="add-button"
          onClick={addFavorite}
        >
          Ajouter ⭐
        </button>
      </div>

      {error && <p className="error-text">{error}</p>}

      {/* Liste des favoris */}
      {favorites.length === 0 && (
        <p>Aucune ville favorite</p>
      )}

      {favorites.map((city, index) => (
        <div className="favorite-card" key={index}>
          <h2 className="favorite-title">
            {city.name} {getCountryName(city.sys.country)}
          </h2>

          <p>
            {Math.round(city.main.temp)}°C |{" "}
            {city.weather[0].description}
          </p>

          <p>💧 Humidité : {city.main.humidity}%</p>
          <p>💨 Vent : {city.wind.speed} m/s</p>

          <button
            className="remove-button"
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
