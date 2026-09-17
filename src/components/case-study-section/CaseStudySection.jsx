import "./CaseStudySection.css";

export default function CaseStudySection({
  title,
  children,
  imageSrc,
  imageAlt = "",
  imageCaption,
}) {
  return (
    <section className="case-study-section">
      <div className="case-study-section__content">
        <h2 className="case-study-section__title">{title}</h2>
        <div className="case-study-section__body">{children}</div>
      </div>
      <figure className="case-study-section__media">
        <img className="case-study-section__image" src={imageSrc} alt={imageAlt} />
        {imageCaption && (
          <figcaption className="case-study-section__caption">
            {imageCaption}
          </figcaption>
        )}
      </figure>
    </section>
  );
}
