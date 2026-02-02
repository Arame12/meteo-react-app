import "./SearchBar.css";

function SearchBar({ city, setCity, onSearch }) {
  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Entrer une ville"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button
        className="search-button"
        onClick={onSearch}
      >
        Rechercher
      </button>
    </div>
  );
}

export default SearchBar;
