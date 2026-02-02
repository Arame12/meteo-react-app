import "./WeatherCard.css";

function WeatherCard({ weather, getCountryName, onAddFavorite }) {
  if (!weather) return null;

  return (
    <div className="weather-card">
      <h2 className="weather-title">
        {weather.name} {getCountryName(weather.sys.country)}
      </h2>

      <p>
        {Math.round(weather.main.temp)}°C |{" "}
        {weather.weather[0].description}
      </p>

      <p>💧 Humidité : {weather.main.humidity}%</p>
      <p>💨 Vent : {weather.wind.speed} m/s</p>

      <button
        className="favorite-button"
        onClick={onAddFavorite}
      >
        Ajouter aux favoris ⭐
      </button>
    </div>
  );
}

export default WeatherCard;
