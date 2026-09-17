import { useId } from "react";
import "./CaseStudyNumbers.css";

export default function CaseStudyNumbers({ title, description, items }) {
  const titleId = useId();

  return (
    <section
      className="case-study-numbers"
      aria-labelledby={title ? titleId : undefined}
    >
      {(title || description) && (
        <div className="case-study-numbers__intro">
          {title && (
            <h2 id={titleId} className="case-study-numbers__title">
              {title}
            </h2>
          )}
          {description && (
            <p className="case-study-numbers__description">{description}</p>
          )}
        </div>
      )}
      <dl className="case-study-numbers__list">
        {items.map(({ value, label, description: itemDescription }) => (
          <div className="case-study-numbers__item" key={`${value}-${label}`}>
            <dt className="case-study-numbers__value">{value}</dt>
            <dd className="case-study-numbers__label">{label}</dd>
            {itemDescription && (
              <dd className="case-study-numbers__item-description">
                {itemDescription}
              </dd>
            )}
          </div>
        ))}
      </dl>
    </section>
  );
}
