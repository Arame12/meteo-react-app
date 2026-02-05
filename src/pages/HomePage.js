import { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import { getWeatherByCity } from "../services/weatherAPI";
import "./HomePage.css";
import { getForecastByCity } from "../services/weatherAPI";


function HomePage() {
  // 🔹 États
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [forecast, setForecast] = useState(null);



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

  const forecastData = await getForecastByCity(city);
  setForecast(forecastData);

} catch (err) {
  setError("Ville non trouvée");
  setWeather(null);
  setForecast(null);
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
    <div className="home-container">
      <h1 className="page-title">Recherche météo</h1>

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
      {forecast && (
  <div className="forecast-card">

    <h3>Prévision pour demain</h3>

    <img
      src={`https://openweathermap.org/img/wn/${forecast.list[8].weather[0].icon}@2x.png`}
      alt="icone météo"
    />

    <p>
      {Math.round(forecast.list[8].main.temp)}°
      {" | "}
      {forecast.list[8].weather[0].description}
    </p>

    <p>💧 Humidité : {forecast.list[8].main.humidity}%</p>
    <p>💨 Vent : {forecast.list[8].wind.speed} m/s</p>

  </div>
)}

    </div>
  );
}

export default HomePage;
