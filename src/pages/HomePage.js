import { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import { getWeatherByCity } from "../services/weatherAPI";

function HomePage() {
  // 🔹 États
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Traduire le code pays en nom complet (SN → Sénégal)
  const getCountryName = (code) => {
    const regionNames = new Intl.DisplayNames(["fr"], { type: "region" });
    return regionNames.of(code);
  };

  // 🔹 Recherche météo
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
    } catch (err) {
      setError("Ville non trouvée");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Ajouter aux favoris (max 3)
  const addToFavorites = () => {
    if (!weather) return;

    const storedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    if (storedFavorites.length >= 3) {
      alert("Maximum 3 villes favorites");
      return;
    }

    const alreadyExists = storedFavorites.find(
      (item) => item.name === weather.name
    );

    if (alreadyExists) {
      alert("Cette ville est déjà en favoris");
      return;
    }

    storedFavorites.push(weather);
    localStorage.setItem(
      "favorites",
      JSON.stringify(storedFavorites)
    );

    alert("Ville ajoutée aux favoris ⭐");
  };

  return (
    <div>
      <h1>Recherche météo</h1>

      {/* 🔹 Barre de recherche */}
      <SearchBar
        city={city}
        setCity={setCity}
        onSearch={handleSearch}
      />

      {/* 🔹 États */}
      {loading && <p>Chargement...</p>}
      {error && <p>{error}</p>}

      {/* 🔹 Affichage météo */}
      {weather && (
        <WeatherCard
          weather={weather}
          getCountryName={getCountryName}
          onAddFavorite={addToFavorites}
        />
      )}
    </div>
  );
}

export default HomePage;
