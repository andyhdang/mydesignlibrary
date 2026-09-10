import "./QuickFacts.css";

export default function QuickFacts({ items }) {
  return (
    <dl className="quick-facts">
      {items.map(({ label, description }) => (
        <div className="quick-facts__item" key={label}>
          <dt>{label}</dt>
          <dd>{description}</dd>
        </div>
      ))}
    </dl>
  );
}
