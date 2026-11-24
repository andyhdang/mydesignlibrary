import { useEffect, useId, useState } from "react";
import { Bars3Icon, ChevronDownIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { NavLink } from "react-router-dom";
import "./SubNavigation.css";

export default function SubNavigation({ items, activeSlug, basePath, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuId = useId();
  const pages = items.flatMap((item) => (item.children ? [item, ...item.children] : [item]));
  const activeItem = pages.find((item) => item.slug === activeSlug) ?? pages[0];
  const activeGroup = items.find((item) => item.children && (item.slug === activeItem.slug || item.children.some((child) => child.slug === activeItem.slug)))?.title ?? null;
  const [openGroup, setOpenGroup] = useState(activeGroup);
  const [trackedGroup, setTrackedGroup] = useState(activeGroup);

  if (trackedGroup !== activeGroup) {
    setTrackedGroup(activeGroup);
    setOpenGroup(activeGroup);
  }

  const close = () => setIsOpen(false);

  const renderPage = ({ slug, title }) => {
    return <div key={slug} className="sub-navigation__item">
      <NavLink to={`${basePath}/${slug}`} end className={({ isActive }) => (isActive ? "active" : undefined)} onClick={close}>{title}</NavLink>
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
