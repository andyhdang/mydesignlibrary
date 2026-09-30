import "./CaseStudyHeader.css";

export default function CaseStudyHeader({
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
    <header className="case-study-header">
      <div className="case-study-header__intro">
        <p className="case-study-header__label">{label}</p>
        <h1 className="case-study-header__title">{title}</h1>
        <p className="case-study-header__subhead">{subhead}</p>
      </div>
      <div className="case-study-header__byline">
        <img
          className="case-study-header__author-image"
          src={authorImageSrc}
          alt={authorImageAlt}
        />
        <div className="case-study-header__metadata">
          <p className="case-study-header__author">By {authorName}</p>
          <p className="case-study-header__details">
            <time dateTime={publishedAt}>{monthYear}</time>
            <span aria-hidden="true"> · </span>
            {readDuration}
          </p>
        </div>
      </div>
    </header>
  );
}
