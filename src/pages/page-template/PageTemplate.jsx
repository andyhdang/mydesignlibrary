import { Fragment } from "react";
import PageTemplateHeader from "../../components/page-template-header/PageTemplateHeader";
import BeforeAfter from "../../components/before-after/BeforeAfter";
import PageTemplateSection from "../../components/page-template-section/PageTemplateSection";
import PullQuote from "../../components/pull-quote/PullQuote";
import "./PageTemplate.css";

const placeholderImage = `${import.meta.env.BASE_URL}images/page-template-placeholder.png`;
const pullQuotePersonImage = `${import.meta.env.BASE_URL}images/pull-quote-person-placeholder.png`;
const advanceLocalBeforeImage = `${import.meta.env.BASE_URL}images/advance-local-before.png`;
const advanceLocalAfterImage = `${import.meta.env.BASE_URL}images/advance-local-after.png`;

const sections = [
  {
    title: "Overview",
    body: [
      "Introduce this page and explain what readers can accomplish here. Lead with the most important context, guidance, or decision.",
      "State who this documentation is for and when they should use it.",
    ],
    imageCaption: "A visual that orients readers to the page.",
  },
  {
    title: "Purpose and scope",
    body: [
      "Define the problem this page helps solve, the topics it covers, and any important boundaries.",
      "Call out prerequisites, intended audiences, or situations that require a different resource.",
    ],
    imageCaption: "A visual that clarifies the page's scope.",
  },
  {
    title: "Key guidance",
    body: [
      "Explain the core information in a clear, scannable sequence. Use headings, examples, and visuals to make the guidance easy to apply.",
      "Prioritize what readers need to know first, then add supporting detail where it is useful.",
    ],
    imageCaption: "A visual that supports the key guidance.",
  },
  {
    title: "How to use this",
    body: [
      "Provide the steps, patterns, or recommendations readers need to put this information into practice.",
      "Use the visual to demonstrate the expected result or highlight an important interaction.",
    ],
    imageCaption: "A visual that demonstrates how to apply the guidance.",
  },
  {
    title: "Related resources",
    body: [
      "Link to the pages, references, or tools that help readers go deeper or complete the next step.",
      "Keep these resources current and make ownership or update expectations clear.",
    ],
    imageCaption: "A visual that connects readers to related resources.",
  },
];

export default function PageTemplate() {
  return (
    <div className="page-template">
      <PageTemplateHeader
        label="Page documentation"
        title="A clear title that tells readers what this page covers."
        subhead="Use this space to explain the purpose of the page, who it is for, and the information readers will find."
        authorName="Your name"
        authorImageSrc={pullQuotePersonImage}
        authorImageAlt="Illustrated profile placeholder for the page author"
        publishedAt="2025-01"
        monthYear="January 2025"
        readDuration="6 min read"
      />
      <figure className="page-template__hero-image">
        <img
          src={placeholderImage}
          alt="A collage of Dictionary.com product experiences"
        />
      </figure>
      <div className="page-template__pull-quote">
        <PullQuote
          quote="Clear documentation helps people find the right answer and act with confidence."
          imageSrc={pullQuotePersonImage}
          imageAlt="Illustrated portrait placeholder for a documentation contributor"
          attribution="Documentation contributor"
        />
      </div>
      <BeforeAfter
        title="Show the change or compare approaches"
        description="Use this comparison to clarify an update, demonstrate a pattern, or contrast the recommended approach with an alternative. Drag the handle to reveal each view."
        beforeSrc={advanceLocalBeforeImage}
        beforeAlt="Advance Local's original subscription management screen with navigation tabs and a contextual action menu"
        afterSrc={advanceLocalAfterImage}
        afterAlt="Advance Local's redesigned subscription screen showing account status and subscription management options"
        caption="An example interface shown before and after an update."
      />
      {sections.map(({ title, body, imageCaption }) => (
        <Fragment key={title}>
          <PageTemplateSection
            title={title}
            imageSrc={placeholderImage}
            imageAlt="A collage of Dictionary.com product experiences"
            imageCaption={imageCaption}
          >
            {body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </PageTemplateSection>
        </Fragment>
      ))}
    </div>
  );
}
