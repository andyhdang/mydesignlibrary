import "./CaseStudyHeader.css";

export default function CaseStudyHeader({ eyebrow, title, summary, facts }) {
  return (
    <header className="case-study-header">
      <div className="case-study-header__intro">
        <p className="case-study-header__eyebrow">{eyebrow}</p>
        <h1 className="case-study-header__title">{title}</h1>
        <p className="case-study-header__summary">{summary}</p>
      </div>
      <dl className="case-study-header__facts">
        {facts.map(({ label, value }) => (
          <div className="case-study-header__fact" key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}
