import { Link } from "react-router-dom";

const previews = {
  typography: () => <div className="chapter-preview__type">
    <span className="chapter-preview__type-sample">Aa</span>
    <span className="chapter-preview__bar" />
    <span className="chapter-preview__bar chapter-preview__bar--short" />
  </div>,
  colors: () => <div className="chapter-preview__swatches">
    <span style={{ background: "var(--fg)" }} />
    <span style={{ background: "var(--fg-accent)" }} />
    <span style={{ background: "var(--bg-surface-accent)" }} />
    <span style={{ background: "var(--bg-code)" }} />
    <span style={{ background: "var(--border)" }} />
  </div>,
  spacing: () => <div className="chapter-preview__spacing">
    {["var(--space-02)", "var(--space-04)", "var(--space-06)", "var(--space-08)", "var(--space-10)"].map((size) => <span key={size} style={{ width: size, height: size }} />)}
  </div>,
  tokens: () => <div className="chapter-preview__code">
    <span><i>--fg-accent</i></span>
    <span><i>--space-04</i></span>
    <span><i>--radius-m</i></span>
  </div>,
  carousel: () => <div className="chapter-preview__carousel">
    <span className="chapter-preview__slide" />
    <span className="chapter-preview__dots"><i className="is-active" /><i /><i /></span>
  </div>,
};

export default function ChapterCards({ pages }) {
  return <ul className="chapter-cards">
    {pages.map(({ slug, title, description }) => {
      const Preview = previews[slug];

      return <li key={slug}>
        <Link className="chapter-card" to={`/style-guide/${slug}`}>
          {Preview && <div className="chapter-preview" aria-hidden="true"><Preview /></div>}
          <h2 className="chapter-card__title">{title}</h2>
          <p>{description}</p>
        </Link>
      </li>;
    })}
  </ul>;
}
