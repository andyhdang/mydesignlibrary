import "./PageTemplateSection.css";

export default function PageTemplateSection({
  title,
  children,
  imageSrc,
  imageAlt = "",
  imageCaption,
}) {
  return (
    <section className="page-template-section">
      <div className="page-template-section__content">
        <h2 className="page-template-section__title">{title}</h2>
        <div className="page-template-section__body">{children}</div>
      </div>
      <figure className="page-template-section__media">
        <img className="page-template-section__image" src={imageSrc} alt={imageAlt} />
        {imageCaption && (
          <figcaption className="page-template-section__caption">
            {imageCaption}
          </figcaption>
        )}
      </figure>
    </section>
  );
}
