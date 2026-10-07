import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { NavLink, useParams } from "react-router-dom";
import Colors from "./chapters/Colors";
import Spacing from "./chapters/Spacing";
import Tokens from "./chapters/Tokens";
import Typography from "./chapters/Typography";
import { colorAnchors, spacingAnchors, typographyAnchors } from "./sectionAnchors";
import "./StyleGuide.css";

const chapters = [
  { slug: "overview", title: "Overview", description: "A quick reference for the foundations shared across the application.", Component: Overview },
  { slug: "typography", title: "Typography", description: "Font stacks and a fluid type scale used throughout the interface.", Component: Typography },
  { slug: "colors", title: "Colors", description: "The core palette is defined as reusable theme tokens.", Component: Colors },
  { slug: "spacing", title: "Spacing", description: "A responsive spacing scale creates consistent rhythm and intentional relationships between elements, components, and layouts.", Component: Spacing },
  { slug: "tokens", title: "Design tokens", description: "Core variables that shape the interface.", Component: Tokens },
];

const sectionAnchors = {
  typography: typographyAnchors,
  colors: colorAnchors,
  spacing: spacingAnchors,
};

export default function StyleGuide() {
  const { section = "overview" } = useParams();
  const activeChapter = chapters.find((item) => item.slug === section) ?? chapters[0];

  return <main className="docs"><GuideNavigation activeChapter={activeChapter} /><div className="docs-content">
    {activeChapter.slug === "overview" && <header className="docs-header"><span className="docs-eyebrow">Foundation</span><h1 className="page-title">React Boilerplate Foundations</h1></header>}
    <section className="docs-section">
      {activeChapter.slug !== "overview" && <div className="page-header"><div><h1 className="page-title">{activeChapter.title}</h1><p>{activeChapter.description}</p></div></div>}
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
  const linksRef = useRef(null);

  useEffect(() => {
    const updateActiveAnchor = () => {
      const activationOffset = Math.min(window.innerHeight * 0.35, 320);
      const currentAnchor = [...anchors].reverse().find(({ id }) => document.getElementById(id)?.getBoundingClientRect().top <= activationOffset);
      const nextAnchor = currentAnchor?.id ?? anchors[0].id;

      setActiveAnchor((previousAnchor) => (
        previousAnchor === nextAnchor ? previousAnchor : nextAnchor
      ));
    };

    updateActiveAnchor();
    window.addEventListener("scroll", updateActiveAnchor, { passive: true });
    return () => window.removeEventListener("scroll", updateActiveAnchor);
  }, [anchors]);

  useLayoutEffect(() => {
    if (variant !== "mobile") {
      return;
    }

    const links = linksRef.current;
    const activeLink = links?.querySelector('[aria-current="location"]');

    if (!links || !activeLink) {
      return;
    }

    const linksBounds = links.getBoundingClientRect();
    const activeLinkBounds = activeLink.getBoundingClientRect();
    const targetScrollLeft =
      links.scrollLeft +
      activeLinkBounds.left -
      linksBounds.left -
      (links.clientWidth - activeLinkBounds.width) / 2;

    links.scrollTo({ left: targetScrollLeft, behavior: "smooth" });
  }, [activeAnchor, variant]);

  const scrollToSection = (event, id) => {
    event.preventDefault();
    setActiveAnchor(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return <nav ref={linksRef} className={`page-anchors page-anchors--${variant}`} aria-label={label}><div className="page-anchors__links">
    {anchors.map(({ id, label: anchorLabel }) => <a key={id} href={`#${id}`} className={activeAnchor === id ? "active" : undefined} aria-current={activeAnchor === id ? "location" : undefined} onClick={(event) => scrollToSection(event, id)}>{anchorLabel}</a>)}
  </div></nav>;
}
