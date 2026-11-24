import { useEffect, useLayoutEffect, useRef, useState } from "react";
import "./PageAnchorTabs.css";

export default function PageAnchorTabs({ anchors, label }) {
  const [activeAnchor, setActiveAnchor] = useState(anchors[0].id);
  const [isStuck, setIsStuck] = useState(false);
  const tabsRef = useRef(null);
  const trackRef = useRef(null);
  const scrollTargetRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const updateActiveAnchor = () => {
      const tabs = tabsRef.current;

      if (tabs) {
        const tabsBounds = tabs.getBoundingClientRect();
        const canDock = window.matchMedia("(max-width: 64rem)").matches;
        const nextIsStuck = canDock && tabsBounds.top <= 0;

        if (nextIsStuck && !tabs.classList.contains("is-stuck")) {
          tabs.style.setProperty("--dock-offset-x", `${-tabsBounds.left}px`);
        }

        setIsStuck((previous) => previous === nextIsStuck ? previous : nextIsStuck);
      }

      if (scrollTargetRef.current) {
        return;
      }

      const tabsBottom = tabsRef.current?.getBoundingClientRect().bottom ?? 0;
      const activationOffset = Math.max(tabsBottom + 16, 96);
      const currentAnchor = [...anchors].reverse().find(({ id }) => (
        document.getElementById(id)?.getBoundingClientRect().top <= activationOffset
      ));
      const nextAnchor = currentAnchor?.id ?? anchors[0].id;

      setActiveAnchor((previousAnchor) => (
        previousAnchor === nextAnchor ? previousAnchor : nextAnchor
      ));
    };
    const finishProgrammaticScroll = () => {
      const target = scrollTargetRef.current;

      if (!target) {
        return;
      }

      scrollTargetRef.current = null;
      window.clearTimeout(scrollTimeoutRef.current);
      setActiveAnchor(target);
    };

    updateActiveAnchor();
    window.addEventListener("scroll", updateActiveAnchor, { passive: true });
    window.addEventListener("scrollend", finishProgrammaticScroll);
    window.addEventListener("resize", updateActiveAnchor);
    return () => {
      window.clearTimeout(scrollTimeoutRef.current);
      window.removeEventListener("scroll", updateActiveAnchor);
      window.removeEventListener("scrollend", finishProgrammaticScroll);
      window.removeEventListener("resize", updateActiveAnchor);
    };
  }, [anchors]);

  useLayoutEffect(() => {
    const track = trackRef.current;
    const activeTab = track?.querySelector(`[data-anchor-id="${activeAnchor}"]`);

    if (!track || !activeTab) {
      return undefined;
    }

    const updateIndicator = () => {
      track.style.setProperty("--active-tab-x", `${activeTab.offsetLeft}px`);
      track.style.setProperty("--active-tab-width", `${activeTab.offsetWidth}px`);
    };
    const revealActiveTab = () => {
      const edgePadding = Number.parseFloat(getComputedStyle(activeTab).paddingInlineStart) || 0;
      const tabLeft = activeTab.offsetLeft;
      const tabRight = tabLeft + activeTab.offsetWidth;
      const visibleLeft = track.scrollLeft;
      const visibleRight = visibleLeft + track.clientWidth;
      let nextScrollLeft;

      if (tabLeft < visibleLeft + edgePadding) {
        nextScrollLeft = Math.max(0, tabLeft - edgePadding);
      } else if (tabRight > visibleRight - edgePadding) {
        nextScrollLeft = Math.min(
          track.scrollWidth - track.clientWidth,
          tabRight - track.clientWidth + edgePadding,
        );
      }

      if (nextScrollLeft !== undefined) {
        track.scrollTo({
          left: nextScrollLeft,
          behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
        });
      }
    };
    const updateTabLayout = () => {
      updateIndicator();
      revealActiveTab();
    };
    const resizeObserver = new ResizeObserver(updateTabLayout);

    updateTabLayout();
    resizeObserver.observe(track);
    resizeObserver.observe(activeTab);
    return () => resizeObserver.disconnect();
  }, [activeAnchor]);

  const scrollToSection = (event, id) => {
    event.preventDefault();
    scrollTargetRef.current = id;
    window.clearTimeout(scrollTimeoutRef.current);
    setActiveAnchor(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    scrollTimeoutRef.current = window.setTimeout(() => {
      const target = scrollTargetRef.current;
      scrollTargetRef.current = null;
      if (target) {
        setActiveAnchor(target);
      }
    }, 1000);
  };

  return (
    <nav ref={tabsRef} className={`page-anchor-tabs${isStuck ? " is-stuck" : ""}`} aria-label={label}>
      <div ref={trackRef} className="page-anchor-tabs__track">
        <span className="page-anchor-tabs__indicator" aria-hidden="true" />
        {anchors.map(({ id, label: anchorLabel }) => (
          <a
            key={id}
            data-anchor-id={id}
            href={`#${id}`}
            className={activeAnchor === id ? "active" : undefined}
            aria-current={activeAnchor === id ? "location" : undefined}
            onClick={(event) => scrollToSection(event, id)}
          >
            {anchorLabel}
          </a>
        ))}
      </div>
    </nav>
  );
}
