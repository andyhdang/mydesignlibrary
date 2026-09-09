import { NavLink, useParams } from "react-router-dom";
import "./StyleGuide.css";

export default function StyleGuide() {
  const { section = "overview" } = useParams();
  const activeSection = sections.find((item) => item.slug === section) ?? sections[0];

  return (
    <main className="docs">
      <aside className="docs-sidebar" aria-label="Style guide sections">
        <p>On this page</p>
        <nav>
          {sections.map(({ slug, title }) => (
            <NavLink
              key={slug}
              to={`/style-guide/${slug}`}
              end
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              {title}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="docs-content">
        {activeSection.slug === "overview" && (
          <header className="docs-header">
            <span className="docs-eyebrow">Foundation</span>
            <h1>React Boilerplate Foundations</h1>
          </header>
        )}

        <section className="docs-section">
          {activeSection.slug !== "overview" && (
            <div className="section-heading">
              <div>
                <h1>{activeSection.title}</h1>
                <p>{activeSection.description}</p>
              </div>
            </div>
          )}
          <activeSection.Component />
        </section>
      </div>
    </main>
  );
}

const sections = [
  {
    slug: "overview",
    title: "Overview",
    description: "A quick reference for the foundations shared across the application.",
    Component: Overview,
  },
  {
    slug: "typography",
    title: "Typography",
    description: "The default type scale and inline text treatments.",
    Component: Typography,
  },
  {
    slug: "forms",
    title: "Forms",
    description: "Controls inherit the body typeface and color.",
    Component: Forms,
  },
  {
    slug: "media",
    title: "Media defaults",
    description: "Images are responsive by default and retain their aspect ratio.",
    Component: Media,
  },
  {
    slug: "colors",
    title: "Colors",
    description: "The core palette is defined as reusable theme tokens.",
    Component: Colors,
  },
  {
    slug: "elevation",
    title: "Elevation",
    description: "A shared shadow token separates floating surfaces.",
    Component: Elevation,
  },
  {
    slug: "accessibility",
    title: "Accessibility features",
    description: "Built-in choices that make the foundation more inclusive.",
    Component: Accessibility,
  },
  {
    slug: "tokens",
    title: "Design tokens",
    description: "Core variables that shape the interface.",
    Component: Tokens,
  },
];

function Overview() {
  return null;
}

function Typography() {
  return (
    <>
      <p className="font-family">
        <strong>Font family:</strong> Geologica <span>/</span> system-ui
      </p>
      <div className="preview type-preview">
        <h1>Heading 1 Example</h1><h2>Heading 2 Example</h2><h3>Heading 3 Example</h3>
        <h4>Heading 4 Example</h4><h5>Heading 5 Example</h5><h6>Heading 6 Example</h6>
        <p>This is the body copy.</p><p>This is the inline <code>code</code> style.</p>
      </div>
      <h2 className="specimen-heading">Monospace styles</h2>
      <div className="preview stack-preview">
        <p>Keyboard shortcut: <kbd>⌘</kbd> + <kbd>K</kbd></p>
        <p>Terminal output: <samp>npm run dev</samp></p>
        <pre><code>{`npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev`}</code></pre>
      </div>
    </>
  );
}

function Forms() {
  return <div className="preview form-preview"><input placeholder="Input inherits body typography" aria-label="Example input" /><select aria-label="Example select"><option>Option One</option><option>Option Two</option></select><button type="button">Button inherits body typography</button></div>;
}

function Media() {
  return <div className="preview media-preview"><img src="https://picsum.photos/600/300" alt="A random landscape placeholder" /></div>;
}

function Colors() {
  return <div className="color-grid"><ColorSwatch name="Background" variable="--bg" /><ColorSwatch name="Text" variable="--text" /><ColorSwatch name="Border" variable="--border" /><ColorSwatch name="Code background" variable="--code-bg" /><ColorSwatch name="Accent" variable="--accent" /><ColorSwatch name="Accent background" variable="--accent-bg" /></div>;
}

function Elevation() {
  return <div className="preview elevation-preview"><div className="elevation-card">Shadow token example</div></div>;
}

function Accessibility() {
  return <ul className="feature-list"><li>Supports system dark mode</li><li>Supports manual theme overrides</li><li>Respects reduced motion preferences</li><li>Uses rem-based typography scaling</li><li>Uses border-box sizing globally</li><li>Provides responsive typography</li></ul>;
}

function Tokens() {
  return <table><thead><tr><th>Token</th><th>Purpose</th></tr></thead><tbody>{[
    ["--text", "Primary text color"], ["--bg", "Page background color"],
    ["--accent", "Primary accent color"], ["--shadow", "Elevation token"],
    ["--sans", "Body font family"], ["--heading", "Heading font family"],
    ["--mono", "Code font family"],
  ].map(([token, purpose]) => <tr key={token}><td><code>{token}</code></td><td>{purpose}</td></tr>)}</tbody></table>;
}

function ColorSwatch({ name, variable }) {
  return (
    <div className="color-card">
      <div
        className="color-swatch"
        style={{ backgroundColor: `var(${variable})` }}
      />
      <div>
        <strong>{name}</strong>
        <code>{variable}</code>
      </div>
    </div>
  );
}
