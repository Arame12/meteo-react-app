import "./WeatherCard.css";
function WeatherCard({ weather, getCountryName, onAddFavorite }) {
  // Si aucune donnée météo, on n'affiche rien
  if (!weather) return null;

  return (
    <div className="weather-card">
      <h2>
        {weather.name} {getCountryName(weather.sys.country)}
      </h2>

      {/* Température + état du ciel */}
      <img
  src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
  alt="icone météo"
  className="weather-icon"
/>

      <p>
        {Math.round(weather.main.temp)}°C |{" "}
        {weather.weather[0].description}
      </p>

      {/* Humidité */}
      <p>💧 Humidité : {weather.main.humidity}%</p>

      {/* Vent */}
      <p>💨 Vent : {weather.wind.speed} m/s</p>

      {/* Bouton favoris */}
      <button
       className="favorite-add-btn"
        onClick={onAddFavorite}
   >
         Ajouter aux favoris ⭐
      </button>
    </div>
  );
}

export default WeatherCard;
