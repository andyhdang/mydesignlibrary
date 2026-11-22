import { useState } from "react";
import CarouselComponent from "../../../components/carousel/Carousel";

const exampleItems = [
  { title: "Slide 1", content: "Content slot" },
  { title: "Slide 2", content: "Content slot" },
  { title: "Slide 3", content: "Content slot" },
];

const anatomyParts = [
  { id: "slot", name: "Content slot", description: "The area that holds one slide of content at a time." },
  { id: "previous", name: "Previous button", description: "Moves back one slide. Disabled on the first slide." },
  { id: "indicators", name: "Pagination indicators", description: "Show the current slide and jump directly to any slide." },
  { id: "next", name: "Next button", description: "Moves forward one slide. Disabled on the last slide." },
];

export default function Carousel() {
  const [activePart, setActivePart] = useState(anatomyParts[0].id);

  return (
    <div className="carousel-variants">
      <div className="preview">
        <CarouselComponent label="Carousel preview" items={exampleItems} />
      </div>
      <section className="type-group" aria-labelledby="carousel-anatomy">
        <div className="section-header">
          <h2 id="carousel-anatomy" className="section-title">Anatomy</h2>
          <p>Select an element to highlight it in the carousel.</p>
        </div>
        <div className="carousel-anatomy" data-part={activePart}>
          <div className="preview">
            <CarouselComponent label="Anatomy example" items={exampleItems} />
          </div>
          <div className="carousel-anatomy__parts" role="group" aria-label="Carousel elements">
            {anatomyParts.map(({ id, name, description }) => (
              <button
                key={id}
                type="button"
                className="carousel-anatomy__part"
                aria-pressed={activePart === id}
                onClick={() => setActivePart(id)}
              >
                <span className="carousel-anatomy__name">{name}</span>
                <span className="carousel-anatomy__description">{description}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="type-group" aria-labelledby="carousel-variants">
        <div className="section-header">
          <h2 id="carousel-variants" className="section-title">Variants</h2>
        </div>
        <div className="carousel-variant-list">
          <section aria-labelledby="carousel-controls-below">
            <h3 id="carousel-controls-below" className="carousel-variant-title">Controls below</h3>
            <p>The previous and next buttons sit under the content, on either side of the pagination indicators.</p>
            <div className="preview">
              <CarouselComponent label="Controls below example" items={exampleItems} />
            </div>
          </section>
          <section aria-labelledby="carousel-controls-overlay">
            <h3 id="carousel-controls-overlay" className="carousel-variant-title">Controls over content</h3>
            <p>The previous and next buttons sit on top of the content area, and the pagination indicators sit under it.</p>
            <div className="preview">
              <CarouselComponent label="Controls over content example" items={exampleItems} variant="controls-overlay" />
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
