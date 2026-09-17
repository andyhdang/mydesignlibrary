import CaseStudyHeader from "../../components/case-study-header/CaseStudyHeader";
import CaseStudySection from "../../components/case-study-section/CaseStudySection";
import PullQuote from "../../components/pull-quote/PullQuote";
import "./CaseStudy.css";

const facts = [
  { label: "Client", value: "Company name" },
  { label: "Role", value: "Product Designer" },
  { label: "Timeline", value: "2025" },
  { label: "Focus", value: "Product strategy and experience design" },
];

const placeholderImage = `${import.meta.env.BASE_URL}images/case-study-placeholder.png`;
const pullQuotePersonImage = `${import.meta.env.BASE_URL}images/pull-quote-person-placeholder.png`;

const sections = [
  {
    title: "Context and scope",
    body: [
      "Introduce the context behind the work here. Explain the customer need, the business opportunity, and the constraints that shaped the approach.",
      "Define the project's scope so readers understand what the team set out to change and where the work began.",
    ],
    imageCaption: "A visual that introduces the project context.",
  },
  {
    title: "My role",
    body: [
      "Describe your responsibilities, the partners you worked with, and the decisions you owned throughout the project.",
      "Be specific about how you contributed while recognizing the work that was shared across the team.",
    ],
    imageCaption: "A visual that shows the people and work involved.",
  },
  {
    title: "The problem",
    body: [
      "Frame the central challenge with the research, signals, and constraints that made it worth solving.",
      "Help readers see the experience through the customer's eyes before introducing the direction you took.",
    ],
    imageCaption: "A visual that illustrates the problem to solve.",
  },
  {
    title: "The solution",
    body: [
      "Walk through the product direction and the key design decisions that turned insight into a clear experience.",
      "Use the visual to show the work in context and explain why the choices support the original goal.",
    ],
    imageCaption: "A visual that highlights the proposed solution.",
  },
  {
    title: "Impact and metrics",
    body: [
      "Close with the outcome: what changed for customers, the business, or the team after the work shipped.",
      "Pair the story with meaningful metrics and learnings to make the impact concrete.",
    ],
    imageCaption: "A visual that communicates the resulting impact.",
  },
];

export default function CaseStudy() {
  return (
    <div className="case-study">
      <CaseStudyHeader
        eyebrow="Case study"
        title="A project title that earns the next scroll."
        summary="Use this space to make the case for the work: the problem worth solving, the change you drove, and why it mattered."
        facts={facts}
      />
      <figure className="case-study__hero-image">
        <img
          src={placeholderImage}
          alt="A collage of Dictionary.com product experiences"
        />
      </figure>
      <div className="case-study__pull-quote">
        <PullQuote
          quote="The team made a complex experience feel clear, useful, and easy to trust."
          imageSrc={pullQuotePersonImage}
          imageAlt="Illustrated portrait placeholder for a research participant"
          attribution="Research participant"
        />
      </div>
      {sections.map(({ title, body, imageCaption }) => (
        <CaseStudySection
          key={title}
          title={title}
          imageSrc={placeholderImage}
          imageAlt="A collage of Dictionary.com product experiences"
          imageCaption={imageCaption}
        >
          {body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </CaseStudySection>
      ))}
    </div>
  );
}
