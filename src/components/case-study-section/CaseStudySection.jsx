import "./CaseStudySection.css";

export default function CaseStudySection({ title, children, imageSrc, imageAlt = "" }) {
  return (
    <section className="case-study-section">
      <div className="case-study-section__content">
        <h2 className="case-study-section__title">{title}</h2>
        <div className="case-study-section__body">{children}</div>
      </div>
      <img className="case-study-section__image" src={imageSrc} alt={imageAlt} />
    </section>
  );
}
