import { useEffect, useState } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import "./Navigation.css";

export default function Navigation() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const isDark = theme === "dark";

  return (
    <nav className="navigation" aria-label="Main navigation">
      <Link className="navigation__brand" to="/">
        <span>Andy Dang</span>
        <span className="navigation__role">Digital Product Designer</span>
      </Link>
      <button
        className="navigation__menu-toggle"
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="main-navigation-links"
        onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
      >
        <Bars3Icon className="navigation__menu-icon" aria-hidden="true" />
        <span className="sr-only">Menu</span>
      </button>
      <ul id="main-navigation-links" className={isMenuOpen ? "is-open" : undefined}>
        <li>
          <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
        </li>
        <li>
          <Link to="/style-guide" onClick={() => setIsMenuOpen(false)}>Style Guide</Link>
        </li>
      </ul>
      <button
        className="navigation__theme-toggle"
        type="button"
        aria-pressed={isDark}
        onClick={() => setTheme(isDark ? "light" : "dark")}
      >
        {isDark ? "Light" : "Dark"} mode
      </button>
    </nav>
  );
}
