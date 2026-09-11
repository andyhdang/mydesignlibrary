import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { NavLink, useParams } from "react-router-dom";
import Accessibility from "./chapters/Accessibility";
import Colors from "./chapters/Colors";
import Elevation from "./chapters/Elevation";
import Forms from "./chapters/Forms";
import Media from "./chapters/Media";
import Tokens from "./chapters/Tokens";
import Typography from "./chapters/Typography";
import { colorAnchors, typographyAnchors } from "./sectionAnchors";
import "./StyleGuide.css";

const chapters = [
  { slug: "overview", title: "Overview", description: "A quick reference for the foundations shared across the application.", Component: Overview },
  { slug: "typography", title: "Typography", description: "Font stacks and a fluid type scale used throughout the interface.", Component: Typography },
  { slug: "colors", title: "Colors", description: "The core palette is defined as reusable theme tokens.", Component: Colors },
  { slug: "forms", title: "Forms", description: "Controls inherit the body typeface and color.", Component: Forms },
  { slug: "media", title: "Media defaults", description: "Images are responsive by default and retain their aspect ratio.", Component: Media },
  { slug: "elevation", title: "Elevation", description: "A shared shadow token separates floating surfaces.", Component: Elevation },
  { slug: "accessibility", title: "Accessibility", description: "Built-in choices that make the foundation more inclusive.", Component: Accessibility },
  { slug: "tokens", title: "Design tokens", description: "Core variables that shape the interface.", Component: Tokens },
];

const sectionAnchors = { typography: typographyAnchors, colors: colorAnchors };

export default function StyleGuide() {
  const { section = "overview" } = useParams();
  const activeChapter = chapters.find((item) => item.slug === section) ?? chapters[0];

  return <main className="docs"><GuideNavigation activeChapter={activeChapter} /><div className="docs-content">
    {activeChapter.slug === "overview" && <header className="docs-header"><span className="docs-eyebrow">Foundation</span><h1>React Boilerplate Foundations</h1></header>}
    <section className="docs-section">
      {activeChapter.slug !== "overview" && <div className="section-heading"><div><h1>{activeChapter.title}</h1><p>{activeChapter.description}</p></div></div>}
      <activeChapter.Component />
    </section>
  </div></main>;
}

function Overview() {
  return null;
}

function GuideNavigation({ activeChapter }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const anchors = sectionAnchors[activeChapter.slug];

  return <div className="guide-navigation"><nav className="guide-section-nav" aria-label="Style guide chapters">
    <button className="guide-section-nav__toggle" type="button" aria-expanded={isMenuOpen} aria-controls="style-guide-chapters" onClick={() => setIsMenuOpen((isOpen) => !isOpen)}>
      {activeChapter.title}<ChevronDownIcon className="guide-section-nav__icon" aria-hidden="true" />
    </button>
    <div id="style-guide-chapters" className={`guide-section-nav__links${isMenuOpen ? " is-open" : ""}`}>
      {chapters.map(({ slug, title }) => <div key={slug}><NavLink to={`/style-guide/${slug}`} end className={({ isActive }) => (isActive ? "active" : undefined)} onClick={() => setIsMenuOpen(false)}>{title}</NavLink>{slug === activeChapter.slug && anchors && <PageAnchors variant="desktop" anchors={anchors} label={`${title} sections`} />}</div>)}
    </div>
  </nav>{anchors && <PageAnchors variant="mobile" anchors={anchors} label={`${activeChapter.title} sections`} />}</div>;
}

function PageAnchors({ variant, anchors, label }) {
  const [activeAnchor, setActiveAnchor] = useState(anchors[0].id);

  useEffect(() => {
    const updateActiveAnchor = () => {
      const navigationTop = document.querySelector(".guide-navigation")?.getBoundingClientRect().top ?? 0;
      const activationOffset = navigationTop + 10 * 16;
      const currentAnchor = [...anchors].reverse().find(({ id }) => document.getElementById(id)?.getBoundingClientRect().top <= activationOffset);
      setActiveAnchor(currentAnchor?.id ?? anchors[0].id);
    };

    updateActiveAnchor();
    window.addEventListener("scroll", updateActiveAnchor, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveAnchor);
  }, [anchors]);

  const scrollToSection = (event, id) => {
    event.preventDefault();
    setActiveAnchor(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return <nav className={`page-anchors page-anchors--${variant}`} aria-label={label}><div className="page-anchors__links">
    {anchors.map(({ id, label: anchorLabel }) => <a key={id} href={`#${id}`} className={activeAnchor === id ? "active" : undefined} aria-current={activeAnchor === id ? "location" : undefined} onClick={(event) => scrollToSection(event, id)}>{anchorLabel}</a>)}
  </div></nav>;
}
