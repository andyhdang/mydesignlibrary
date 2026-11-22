import { useParams } from "react-router-dom";
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
  { slug: "overview", title: "Overview", description: "A quick reference for the foundations shared across the application.", Component: Overview },
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
  return { slug, title, anchors: sectionAnchors[slug] };
};

const navItems = [
  navPage("overview"),
  { ...navPage("foundations"), children: foundationSlugs.map(navPage) },
  { ...navPage("components"), children: componentSlugs.map(navPage) },
];

export default function StyleGuide() {
  const { section = "overview" } = useParams();
  const activeChapter = chapters.find((item) => item.slug === section) ?? chapters[0];

  return <main className="docs"><SubNavigation label="Style guide chapters" items={navItems} activeSlug={activeChapter.slug} basePath="/style-guide" /><div className="docs-content">
    {activeChapter.slug === "overview" && <header className="docs-header"><span className="docs-eyebrow">Foundation</span><h1 className="page-title">React Boilerplate Foundations</h1></header>}
    <section className="docs-section">
      {activeChapter.slug !== "overview" && <div className="page-header"><div><h1 className="page-title">{activeChapter.title}</h1><p>{activeChapter.description}</p></div></div>}
      <activeChapter.Component pages={indexPages[activeChapter.slug]} />
    </section>
  </div></main>;
}

function Overview() {
  return null;
}
