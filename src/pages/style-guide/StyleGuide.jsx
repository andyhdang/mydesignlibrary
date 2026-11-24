import { useParams } from "react-router-dom";
import PageAnchorTabs from "../../components/page-anchor-tabs/PageAnchorTabs";
import SubNavigation from "../../components/sub-navigation/SubNavigation";
import Carousel from "./chapters/Carousel";
import Colors from "./chapters/Colors";
import ChapterCards from "./chapters/ChapterCards";
import Spacing from "./chapters/Spacing";
import Tokens from "./chapters/Tokens";
import Typography from "./chapters/Typography";
import { carouselAnchors, colorAnchors, spacingAnchors, typographyAnchors } from "./sectionAnchors";
import "./StyleGuide.css";

const chapters = [
  { slug: "overview", title: "Overview", description: "A quick reference for the foundations shared across the application.", Component: WorkInProgress },
  { slug: "change-log", title: "Change Log", description: "Updates and changes to the design library.", Component: ChangeLog },
  { slug: "foundations", title: "Foundations", description: "The core styles and tokens that every component is built from.", Component: ChapterCards },
  { slug: "typography", title: "Typography", description: "Font stacks and a fluid type scale used throughout the interface.", Component: Typography },
  { slug: "colors", title: "Colors", description: "The core palette is defined as reusable theme tokens.", Component: Colors },
  { slug: "spacing", title: "Spacing", description: "A responsive spacing scale creates consistent rhythm and intentional relationships between elements, components, and layouts.", Component: Spacing },
  { slug: "components", title: "Components", description: "Reusable interface components built from the foundations.", Component: ChapterCards },
  { slug: "carousel", title: "Carousel", description: "The Carousel shows a set of related items one at a time in a single area, so people can browse them at their own pace.", Component: Carousel },
  { slug: "tokens", title: "Design tokens", description: "Core variables that shape the interface.", Component: Tokens },
];

const sectionAnchors = {
  typography: typographyAnchors,
  colors: colorAnchors,
  spacing: spacingAnchors,
  carousel: carouselAnchors,
};

const foundationSlugs = ["typography", "colors", "spacing", "tokens"];
const foundationPages = foundationSlugs.map((slug) => chapters.find((chapter) => chapter.slug === slug));

const componentSlugs = ["carousel"];
const componentPages = componentSlugs.map((slug) => chapters.find((chapter) => chapter.slug === slug));
const indexPages = { foundations: foundationPages, components: componentPages };

const navPage = (slug) => {
  const { title } = chapters.find((chapter) => chapter.slug === slug);
  return { slug, title };
};

const navItems = [
  { ...navPage("overview"), children: [navPage("change-log")] },
  { ...navPage("foundations"), children: foundationSlugs.map(navPage) },
  { ...navPage("components"), children: componentSlugs.map(navPage) },
];

export default function StyleGuide() {
  const { section = "overview" } = useParams();
  const activeChapter = chapters.find((item) => item.slug === section) ?? chapters[0];
  const activeAnchors = sectionAnchors[activeChapter.slug];

  return <main className="docs"><SubNavigation label="Style guide chapters" items={navItems} activeSlug={activeChapter.slug} basePath="/style-guide" /><div className="docs-content">
    {activeChapter.slug === "overview" && <header className="docs-header"><h1 className="page-title">Overview</h1></header>}
    {activeChapter.slug !== "overview" && <div className="page-header"><div><h1 className="page-title">{activeChapter.title}</h1><p>{activeChapter.description}</p></div></div>}
    {activeAnchors && <PageAnchorTabs key={activeChapter.slug} anchors={activeAnchors} label={`${activeChapter.title} sections`} />}
    <section className="docs-section">
      <activeChapter.Component pages={indexPages[activeChapter.slug]} />
    </section>
  </div></main>;
}

function WorkInProgress() {
  return <p>WIP</p>;
}

function ChangeLog() {
  const entries = [
    {
      date: "November 2026",
      dateTime: "2026-11",
      topics: [
        {
          name: "Style Guide",
          changes: ["Refined typography, corner radii, and responsive chapter navigation."],
        },
        {
          name: "Components",
          changes: ["Added an accessible Carousel with documented anatomy and variants."],
        },
      ],
    },
    {
      date: "October 2026",
      dateTime: "2026-10",
      topics: [
        {
          name: "Typography",
          changes: [
            "Clarified the relationship between fixed font sizes, responsive type, and semantic font roles.",
            "Added fluid editorial typography while keeping compact interface text fixed.",
          ],
        },
        {
          name: "Spacing and tokens",
          changes: ["Added responsive spacing tokens and complete design-token documentation."],
        },
        {
          name: "Page Template",
          changes: ["Introduced a reusable documentation template with clear content sections."],
        },
      ],
    },
    {
      date: "September 2026",
      dateTime: "2026-09",
      topics: [
        {
          name: "Page Template",
          changes: [
            "Created the original case-study structure for documenting product work.",
            "Added an editorial header, author details, publication date, and reading time.",
          ],
        },
        {
          name: "Components",
          changes: [
            "Added reusable pull-quote and project-metrics modules.",
            "Added an accessible before-and-after image comparison.",
          ],
        },
        {
          name: "Home",
          changes: ["Reframed the homepage around the Andy Dang Design Library."],
        },
        {
          name: "Style Guide",
          changes: [
            "Expanded semantic color, typography, and interaction-state foundations.",
            "Improved small-screen navigation and active-section tracking.",
          ],
        },
        {
          name: "Site-wide",
          changes: [
            "Updated the site identity and browser title.",
            "Automated production deployment through GitHub Pages.",
          ],
        },
      ],
    },
    {
      date: "August 2026",
      dateTime: "2026-08",
      topics: [
        {
          name: "Home",
          changes: ["Launched the initial site and responsive hero."],
        },
      ],
    },
  ];

  return <div className="change-log">
    {entries.map(({ date, dateTime, topics }) => <section className="change-log__entry" key={dateTime}>
      <h2><time dateTime={dateTime}>{date}</time></h2>
      <div className="change-log__topics">
        {topics.map(({ name, changes }) => <section className="change-log__topic" key={name}>
          <h3>{name}</h3>
          <ul>
            {changes.map((change) => <li key={change}>{change}</li>)}
          </ul>
        </section>)}
      </div>
    </section>)}
  </div>;
}
