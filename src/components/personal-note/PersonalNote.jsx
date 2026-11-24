import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import "./PersonalNote.css";

const viewportInset = 12;
const gap = 8;

export default function PersonalNote({ title, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  const id = useId();
  const popoverId = `personal-note-${id}`;
  const titleId = `${popoverId}-title`;

  useLayoutEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const positionPopover = () => {
      const trigger = triggerRef.current;
      const popover = popoverRef.current;

      if (!trigger || !popover) {
        return;
      }

      const triggerBounds = trigger.getBoundingClientRect();
      const popoverBounds = popover.getBoundingClientRect();
      const left = Math.min(
        Math.max(triggerBounds.left, viewportInset),
        window.innerWidth - popoverBounds.width - viewportInset,
      );
      const spaceBelow = window.innerHeight - triggerBounds.bottom - gap - viewportInset;
      const top = spaceBelow >= popoverBounds.height
        ? triggerBounds.bottom + gap
        : Math.max(viewportInset, triggerBounds.top - popoverBounds.height - gap);

      popover.style.left = `${left}px`;
      popover.style.top = `${top}px`;
      popover.style.visibility = "visible";
    };

    positionPopover();
    window.addEventListener("resize", positionPopover);
    window.addEventListener("scroll", positionPopover, true);
    return () => {
      window.removeEventListener("resize", positionPopover);
      window.removeEventListener("scroll", positionPopover, true);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const closeOnPointerDown = (event) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("pointerdown", closeOnPointerDown);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnPointerDown);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <span ref={rootRef} className="personal-note">
      <button
        ref={triggerRef}
        className="personal-note__trigger"
        type="button"
        aria-label={`Andy’s Notes: ${title}`}
        aria-expanded={isOpen}
        aria-controls={isOpen ? popoverId : undefined}
        onClick={() => setIsOpen((current) => !current)}
      >
        <LightBulbIcon aria-hidden="true" />
      </button>
      {isOpen && (
        <span ref={popoverRef} id={popoverId} className="personal-note__popover" role="dialog" aria-labelledby={titleId}>
          <span className="personal-note__eyebrow">Andy’s Notes</span>
          <strong id={titleId}>{title}</strong>
          <span>{children}</span>
        </span>
      )}
    </span>
  );
}
