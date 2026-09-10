import ExperienceTimeline from "../../components/experience-timeline/ExperienceTimeline";
import Hero from "../../components/hero/Hero";
import QuickFacts from "../../components/quick-facts/QuickFacts";
import "./Home.css";

const quickFacts = [
  {
    label: "Based in",
    description: "Los Angeles, California",
  },
  {
    label: "Focused on",
    description: "Making complex products feel simple and useful",
  },
  {
    label: "Outside work",
    description: "Trying new restaurants, taking photos, and making things",
  },
];

const experience = [
  {
    company: "Company One",
    role: "Design Systems Designer",
    period: "2024 - Present",
  },
  {
    company: "Company Two",
    role: "Product Designer",
    period: "2021 - 2024",
  },
  {
    company: "Company Three",
    role: "Visual Designer",
    period: "2019 - 2021",
  },
];

export default function Home() {
  return (
    <div className="home">
      <Hero
        title="I’m a product designer who likes figuring things out. The messy problems, the weird edge cases, the tiny details that nobody asked about but somehow make everything better. I design products and systems that make complexity feel a little less complicated—and hopefully a lot more fun.
"
      >
        <QuickFacts items={quickFacts} />
      </Hero>
      <ExperienceTimeline items={experience} />
    </div>
  );
}
