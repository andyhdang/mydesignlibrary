import "./ExperienceTimeline.css";

export default function ExperienceTimeline({ items }) {
  return (
    <section className="experience-timeline" aria-labelledby="experience-heading">
      <p className="experience-timeline__eyebrow">02 / Experience</p>
      <div className="experience-timeline__content">
        <h2 id="experience-heading" className="section-title">Selected experience</h2>
        <ol className="experience-timeline__list">
          {items.map(({ company, role, period }) => (
            <li className="experience-timeline__item" key={`${company}-${role}`}>
              <div>
                <h3>{company}</h3>
                <p>{role}</p>
              </div>
              <time>{period}</time>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
