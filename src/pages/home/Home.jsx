import Hero from "../../components/hero/Hero";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <Hero
        title="A library of things I’ve made, learned, and thought about."
        description={
          <>
            <p>This is my little corner of the internet for design.</p>
            <p>
              A place to collect the work I’ve made, the systems I’ve built,
              the ideas I’ve chased, and the things I’m still figuring out.
              Some of it is polished. Some of it is messy. Some of it probably
              started as a Figma file with way too many frames.
            </p>
            <p>
              I’m a product designer who likes making complicated things feel
              a little more obvious. I’m especially interested in design
              systems, thoughtful details, and finding the simplest solution
              hiding underneath a complicated problem.
            </p>
          </>
        }
      />
    </div>
  );
}
