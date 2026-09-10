import { useState } from "react";
import "./Accordion.css";

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="accordion">
      {items.map(({ title, content }, index) => {
        const isOpen = openIndex === index;
        const contentId = `accordion-content-${index}`;

        return (
          <section className="accordion__item" key={title}>
            <h2 className="accordion__heading">
              <button
                type="button"
                className="accordion__trigger"
                aria-expanded={isOpen}
                aria-controls={contentId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                {title}
                <span className="accordion__icon" aria-hidden="true" />
              </button>
            </h2>
            <div
              id={contentId}
              className="accordion__panel"
              hidden={!isOpen}
            >
              <p>{content}</p>
            </div>
          </section>
        );
      })}
    </div>
  );
}
