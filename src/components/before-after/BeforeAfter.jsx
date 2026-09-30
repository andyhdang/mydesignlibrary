import { useId, useState } from "react";
import "./BeforeAfter.css";

export default function BeforeAfter({
  title,
  description,
  beforeSrc,
  beforeAlt = "",
  afterSrc,
  afterAlt = "",
  beforeLabel = "Before",
  afterLabel = "After",
  caption,
  initialPosition = 50,
}) {
  const [position, setPosition] = useState(initialPosition);
  const titleId = useId();
  const descriptionId = useId();
  const captionId = useId();
  const labelledBy = [title && titleId, description && descriptionId]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      className="before-after"
      aria-labelledby={labelledBy || undefined}
    >
      {(title || description) && (
        <div className="before-after__intro">
          {title && <h2 id={titleId} className="before-after__title">{title}</h2>}
          {description && (
            <p id={descriptionId} className="before-after__description">
              {description}
            </p>
          )}
        </div>
      )}
      <figure className="before-after__figure">
        <div
          className="before-after__comparison"
          style={{ "--comparison-position": `${position}%` }}
        >
          <img
            className="before-after__image"
            src={afterSrc}
            alt={afterAlt}
          />
          <div className="before-after__before" aria-hidden="true">
            <img
              className="before-after__image"
              src={beforeSrc}
              alt={beforeAlt}
            />
          </div>
          <span className="before-after__label before-after__label--before">
            {beforeLabel}
          </span>
          <span className="before-after__label before-after__label--after">
            {afterLabel}
          </span>
          <span className="before-after__divider" aria-hidden="true">
            <span className="before-after__handle" />
          </span>
          <input
            className="before-after__range"
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={(event) => setPosition(Number(event.target.value))}
            aria-label={`Compare ${beforeLabel.toLowerCase()} and ${afterLabel.toLowerCase()} designs`}
            aria-describedby={caption ? captionId : undefined}
          />
        </div>
        {caption && (
          <figcaption id={captionId} className="before-after__caption">
            {caption}
          </figcaption>
        )}
      </figure>
    </section>
  );
}
