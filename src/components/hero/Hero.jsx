import "./Hero.css";

export default function Hero({
  eyebrow,
  title,
  description,
  primaryAction,
  secondaryAction,
  imageSrc,
  imageAlt = "",
  children,
}) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero__content">
        {eyebrow && <p className="hero__eyebrow">{eyebrow}</p>}
        <h1 id="hero-title" className="hero__title">
          {title}
        </h1>
        {description && <p className="hero__description">{description}</p>}
        {(primaryAction || secondaryAction) && (
          <div className="hero__actions">
            {primaryAction}
            {secondaryAction}
          </div>
        )}
      </div>
      {imageSrc && (
        <div className="hero__visual">
          <img className="hero__image" src={imageSrc} alt={imageAlt} />
        </div>
      )}
      {children && <div className="hero__supplementary">{children}</div>}
    </section>
  );
}
