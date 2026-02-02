function WeatherCard({ weather, getCountryName, onAddFavorite }) {
  // Si aucune donnée météo, on n'affiche rien
  if (!weather) return null;

  return (
    <div>
      <h2>
        {weather.name} {getCountryName(weather.sys.country)}
      </h2>

      {/* Température + état du ciel */}
      <p>
        {Math.round(weather.main.temp)}°C |{" "}
        {weather.weather[0].description}
      </p>

      {/* Humidité */}
      <p>💧 Humidité : {weather.main.humidity}%</p>

      {/* Vent */}
      <p>💨 Vent : {weather.wind.speed} m/s</p>

      {/* Bouton favoris */}
      <button onClick={onAddFavorite}>
        Ajouter aux favoris ⭐
      </button>
    </div>
  );
}

export default WeatherCard;
