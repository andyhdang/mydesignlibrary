import { useEffect, useId, useState } from "react";
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import "./SubNavigation.css";

export default function SubNavigation({ items, activeSlug, basePath, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const pages = items.flatMap((item) => (item.children ? [item, ...item.children] : [item]));
  const activeItem = pages.find((item) => item.slug === activeSlug) ?? pages[0];
  const anchors = activeItem.anchors;
  const activeGroup = items.find((item) => item.children && (item.slug === activeItem.slug || item.children.some((child) => child.slug === activeItem.slug)))?.title ?? null;
  const [openGroup, setOpenGroup] = useState(activeGroup);
  const [trackedGroup, setTrackedGroup] = useState(activeGroup);
  const [collapsed, setCollapsed] = useState(() => new Set());

  if (trackedGroup !== activeGroup) {
    setTrackedGroup(activeGroup);
    setOpenGroup(activeGroup);
  }

  const close = () => setIsOpen(false);
  const toggleKey = (key) => setCollapsed((previous) => {
    const next = new Set(previous);
    if (!next.delete(key)) {
      next.add(key);
    }
    return next;
  });

  const selectPage = (event, slug, canToggle) => {
    if (canToggle) {
      event.preventDefault();
      toggleKey(slug);
      return;
    }

    setCollapsed((previous) => {
      const next = new Set(previous);
      next.delete(slug);
      return next;
    });
  };

  const renderPage = ({ slug, title }) => {
    const isActive = slug === activeItem.slug;
    const hasAnchors = isActive && anchors;
    const isExpanded = hasAnchors && !collapsed.has(slug);
    const anchorsId = `${menuId}-${slug}`;

    return <div key={slug} className="sub-navigation__item">
      <NavLink to={`${basePath}/${slug}`} end className={({ isActive: linkActive }) => (linkActive ? "active" : undefined)} aria-expanded={hasAnchors ? isExpanded : undefined} aria-controls={hasAnchors ? anchorsId : undefined} onClick={(event) => selectPage(event, slug, hasAnchors)}>{title}{hasAnchors && <ChevronDownIcon className="sub-navigation__chevron" aria-hidden="true" />}</NavLink>
      {hasAnchors && <Collapse id={anchorsId} isOpen={isExpanded}><PageAnchors anchors={anchors} label={`${title} sections`} /></Collapse>}
    </div>;
  };

  const renderGroup = ({ title, slug, children }) => {
    const isExpanded = openGroup === title;
    const groupId = `${menuId}-${title.replace(/\s+/g, "-").toLowerCase()}`;
    const toggleGroup = () => setOpenGroup(isExpanded ? null : title);
    const header = slug
      ? <NavLink to={`${basePath}/${slug}`} end className={({ isActive }) => `sub-navigation__group-toggle${isActive ? " active" : ""}`} aria-expanded={isExpanded} aria-controls={groupId} onClick={(event) => {
        if (slug === activeItem.slug) {
          event.preventDefault();
          toggleGroup();
        }
      }}>{title}<ChevronDownIcon className="sub-navigation__chevron" aria-hidden="true" /></NavLink>
      : <button className="sub-navigation__group-toggle" type="button" aria-expanded={isExpanded} aria-controls={groupId} onClick={toggleGroup}>{title}<ChevronDownIcon className="sub-navigation__chevron" aria-hidden="true" /></button>;

    return <div key={`group:${title}`} className="sub-navigation__group">
      {header}
      <Collapse id={groupId} isOpen={isExpanded} className="sub-navigation__group-items">{children.map(renderPage)}</Collapse>
    </div>;
  };

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const closeOnEscape = (event) => event.key === "Escape" && setIsOpen(false);
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [isOpen]);

  return <div className={`sub-navigation${isOpen ? " is-open" : ""}`}>
    <button className="sub-navigation__toggle" type="button" aria-label={isOpen ? `Close ${label}` : `Open ${label}`} aria-expanded={isOpen} aria-controls={menuId} onClick={() => setIsOpen((open) => !open)}>
      {isOpen ? <XMarkIcon className="sub-navigation__icon" aria-hidden="true" /> : <Bars3Icon className="sub-navigation__icon" aria-hidden="true" />}
    </button>
    <div className="sub-navigation__backdrop" onClick={close} aria-hidden="true" />
    <nav id={menuId} className="sub-navigation__nav" aria-label={label}>
      <div className="sub-navigation__links">
        {items.map((item) => (item.children ? renderGroup(item) : renderPage(item)))}
      </div>
    </nav>
  </div>;
}

function Collapse({ id, isOpen, className, children }) {
  return <div id={id} className={`sub-navigation__collapse${isOpen ? " is-open" : ""}${className ? ` ${className}` : ""}`} inert={!isOpen}>
    <div className="sub-navigation__collapse-inner">{children}</div>
  </div>;
}

function PageAnchors({ anchors, label }) {
  const [activeAnchor, setActiveAnchor] = useState(anchors[0].id);

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

  const scrollToSection = (event, id) => {
    event.preventDefault();
    setActiveAnchor(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return <nav className="page-anchors" aria-label={label}><div className="page-anchors__links">
    {anchors.map(({ id, label: anchorLabel }) => <a key={id} href={`#${id}`} className={activeAnchor === id ? "active" : undefined} aria-current={activeAnchor === id ? "location" : undefined} onClick={(event) => scrollToSection(event, id)}>{anchorLabel}</a>)}
  </div></nav>;
}
