import { useEffect, useState } from "react";
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
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/style-guide">Style Guide</Link>
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
