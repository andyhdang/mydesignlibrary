import { useId } from "react";
import "./PageTemplateNumbers.css";

export default function PageTemplateNumbers({ title, description, items }) {
  const titleId = useId();

  return (
    <section
      className="page-template-numbers"
      aria-labelledby={title ? titleId : undefined}
    >
      {(title || description) && (
        <div className="page-template-numbers__intro">
          {title && (
            <h2 id={titleId} className="page-template-numbers__title">
              {title}
            </h2>
          )}
          {description && (
            <p className="page-template-numbers__description">{description}</p>
          )}
        </div>
      )}
      <dl className="page-template-numbers__list">
        {items.map(({ value, label, description: itemDescription }) => (
          <div className="page-template-numbers__item" key={`${value}-${label}`}>
            <dt className="page-template-numbers__value">{value}</dt>
            <dd className="page-template-numbers__label">{label}</dd>
            {itemDescription && (
              <dd className="page-template-numbers__item-description">
                {itemDescription}
              </dd>
            )}
          </div>
        ))}
      </dl>
    </section>
  );
}
