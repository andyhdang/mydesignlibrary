import "./PageTemplateHeader.css";

export default function PageTemplateHeader({
  label,
  title,
  subhead,
  authorName,
  authorImageSrc,
  authorImageAlt = "",
  publishedAt,
  monthYear,
  readDuration,
}) {
  return (
    <header className="page-template-header">
      <div className="page-template-header__intro">
        <p className="page-template-header__label">{label}</p>
        <h1 className="page-template-header__title">{title}</h1>
        <p className="page-template-header__subhead">{subhead}</p>
      </div>
      <div className="page-template-header__byline">
        <img
          className="page-template-header__author-image"
          src={authorImageSrc}
          alt={authorImageAlt}
        />
        <div className="page-template-header__metadata">
          <p className="page-template-header__author">By {authorName}</p>
          <p className="page-template-header__details">
            <time dateTime={publishedAt}>{monthYear}</time>
            <span aria-hidden="true"> · </span>
            {readDuration}
          </p>
        </div>
      </div>
    </header>
  );
}
