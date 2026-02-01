import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/">Recherche</Link> |{" "}
          <Link to="/favorites">Favoris</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Search />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
