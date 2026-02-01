function SearchBar({ city, setCity, onSearch }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Entrer une ville"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={onSearch}>Rechercher</button>
    </div>
  );
}

export default SearchBar;
