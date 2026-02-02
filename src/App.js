import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import ComparePage from "./pages/ComparePage";



function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <Link to="/">Recherche</Link> |{" "}
          <Link to="/favorites">Favoris</Link>
          <Link to="/compare">Comparer</Link>

        </nav>

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/compare" element={<ComparePage />} />

        </Routes>

      </div>
    </BrowserRouter>
  );
}

export default App;
