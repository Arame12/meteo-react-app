import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">

      <p className="footer-text">
        © {new Date().getFullYear()} Application météo 🌍
      </p>

      <p className="footer-sub">
        Arame Cissé -projet react
      </p>

    </footer>
  );
}

export default Footer;
