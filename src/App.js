import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import FavoritesPage from "./pages/FavoritesPage";
import ComparePage from "./pages/ComparePage";
import "./App.css";
import "./Navbar.css";
import Footer from "./components/Footer";





function App() {
  return (
    <BrowserRouter>
      <div className="app-background" >
       <nav className="navbar">
          <Link className="nav-link" to="/">Recherche</Link>
          <Link className="nav-link" to="/favorites">Favoris</Link>
          <Link className="nav-link" to="/compare">Comparer</Link>
</nav>




        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/compare" element={<ComparePage />} />

        </Routes>
        <Footer />

      </div>
    </BrowserRouter>
  );
}

export default App;
