import { useState, useEffect } from "react";
import { getWeatherByCity } from "../services/weatherAPI";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [city, setCity] = useState("");
  const [error, setError] = useState("");

  // Charger les favoris au démarrage
  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(stored);
  }, []);

  // Traduire le code pays → nom complet
  const getCountryName = (code) => {
    const regionNames = new Intl.DisplayNames(["fr"], { type: "region" });
    return regionNames.of(code);
  };

  // Ajouter une ville depuis la page Favoris
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
    <div>
      <h1>Villes favorites</h1>

      {/* 🔹 Ajouter une ville */}
      <div>
        <input
          type="text"
          placeholder="Ajouter une ville"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={addFavoriteFromPage}>
          Ajouter ⭐
        </button>
        {error && <p>{error}</p>}
      </div>

      <hr />

      {/* 🔹 Liste des favoris */}
      {favorites.length === 0 && (
        <p>Aucune ville favorite</p>
      )}

      {favorites.map((city, index) => (
        <div key={index}>
          <h2>
            {city.name}{" "}
            {getCountryName(city.sys.country)}
          </h2>

          <p>
            {Math.round(city.main.temp)}°C |{" "}
            {city.weather[0].description}
          </p>

          <p>💧 Humidité : {city.main.humidity}%</p>
          <p>💨 Vent : {city.wind.speed} m/s</p>

          <button onClick={() => removeFavorite(city.name)}>
            Supprimer ❌
          </button>
        </div>
      ))}
    </div>
  );
}

export default FavoritesPage;
