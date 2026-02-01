import { useState, useEffect } from "react";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  // Charger les favoris au chargement de la page
  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  // Traduire le code pays en nom complet
  const getCountryName = (code) => {
    const regionNames = new Intl.DisplayNames(["fr"], { type: "region" });
    return regionNames.of(code);
  };

  // Supprimer une ville
  const removeFavorite = (cityName) => {
    const updatedFavorites = favorites.filter(
      (city) => city.name !== cityName
    );

    setFavorites(updatedFavorites);
    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );
  };

  return (
    <div>
      <h1>Villes favorites</h1>

      {favorites.length === 0 && (
        <p>Aucune ville favorite enregistrée</p>
      )}

      {favorites.map((city, index) => (
        <div key={index}>
          <h2>
            {city.name} {getCountryName(city.sys.country)}
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

export default Favorites;
