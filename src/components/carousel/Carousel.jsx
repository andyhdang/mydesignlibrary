import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import "./Carousel.css";

export default function Carousel({ items, label, variant = "controls-below" }) {
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback((index) => {
    const slide = trackRef.current?.children[index];
    if (!slide) {
      return;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    trackRef.current.scrollTo({ left: slide.offsetLeft - trackRef.current.offsetLeft, behavior: reduceMotion ? "auto" : "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const updateActiveIndex = () => {
      const slideWidth = track.children[0]?.offsetWidth || 1;
      const index = Math.round(track.scrollLeft / slideWidth);
      setActiveIndex(Math.min(Math.max(index, 0), items.length - 1));
    };

    track.addEventListener("scroll", updateActiveIndex, { passive: true });
    return () => track.removeEventListener("scroll", updateActiveIndex);
  }, [items.length]);

  const handleKeyDown = (event) => {
    const offsets = { ArrowLeft: -1, ArrowRight: 1 };
    const offset = offsets[event.key];

    if (offset === undefined) {
      return;
    }

    event.preventDefault();
    scrollToIndex(Math.min(Math.max(activeIndex + offset, 0), items.length - 1));
  };

  const previousButton = (
    <button type="button" className="carousel__button carousel__button--previous" aria-label="Previous slide" disabled={activeIndex === 0} onClick={() => scrollToIndex(activeIndex - 1)}>
      <ChevronLeftIcon aria-hidden="true" />
    </button>
  );
  const nextButton = (
    <button type="button" className="carousel__button carousel__button--next" aria-label="Next slide" disabled={activeIndex === items.length - 1} onClick={() => scrollToIndex(activeIndex + 1)}>
      <ChevronRightIcon aria-hidden="true" />
    </button>
  );
  const isOverlay = variant === "controls-overlay";

  return (
    <section className={`carousel carousel--${variant}`} aria-roledescription="carousel" aria-label={label} onKeyDown={handleKeyDown}>
      <div className="carousel__stage">
      <div className="carousel__viewport">
        <div className="carousel__track" ref={trackRef} tabIndex="0" aria-live="polite">
          {items.map(({ title, content }, index) => (
            <article
              className="carousel__slide"
              key={title}
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${items.length}`}
            >
              <h3 className="carousel__title">{title}</h3>
              <p>{content}</p>
            </article>
          ))}
        </div>
      </div>
      {isOverlay && <>{previousButton}{nextButton}</>}
      </div>
      <div className="carousel__controls">
        {!isOverlay && previousButton}
        <div className="carousel__dots">
          {items.map(({ title }, index) => (
            <button
              type="button"
              className="carousel__dot"
              key={title}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
              onClick={() => scrollToIndex(index)}
            />
          ))}
        </div>
        {!isOverlay && nextButton}
      </div>
    </section>
  );
}
