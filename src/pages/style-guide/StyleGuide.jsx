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
    description: "Font stacks and a fluid type scale used throughout the interface.",
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
      <section className="type-group" aria-labelledby="font-families">
        <div className="type-group-heading">
          <span className="docs-eyebrow">Font families</span>
          <h2 id="font-families">Primary stacks and fallbacks</h2>
        </div>
        <div className="token-table">
          <table>
            <thead><tr><th>Use</th><th>Token</th><th>Font stack</th><th>Preview</th></tr></thead>
            <tbody>
              <FontFamily
                label="Body"
                token="--sans"
                stack={'"Geologica", system-ui, sans-serif'}
                className="font-sans"
                sample="The quick brown fox jumps over the lazy dog."
              />
              <FontFamily
                label="Headings"
                token="--heading"
                stack={'"Geologica", system-ui, sans-serif'}
                className="font-heading"
                sample="Thoughtful typography creates hierarchy."
              />
              <FontFamily
                label="Code"
                token="--mono"
                stack="ui-monospace, Consolas, monospace"
                className="font-mono"
                sample="const foundation = true;"
              />
            </tbody>
          </table>
        </div>
      </section>

      <section className="type-group" aria-labelledby="font-shorthands">
        <div className="type-group-heading">
          <span className="docs-eyebrow">Font recipes</span>
          <h2 id="font-shorthands">Font shorthands</h2>
          <p>Each token combines family, weight, size, and line height into a reusable font style.</p>
        </div>
        <div className="font-shorthand-table">
          <table>
            <thead>
              <tr>
                <th>Style</th>
                <th>Token</th>
                <th>Font shorthand</th>
                <th>Preview</th>
              </tr>
            </thead>
            <tbody>
              {fontShorthands.map(({ name, token, value, sample }) => (
                <tr key={token}>
                  <td>{name}</td>
                  <td><code>{token}</code></td>
                  <td>
                    <div className="font-shorthand-value">
                      {value.map((part) => <code key={part}>{part}</code>)}
                    </div>
                  </td>
                  <td>
                    <span className="font-shorthand-sample" style={{ font: `var(${token})` }}>{sample}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="type-group" aria-labelledby="type-scale">
        <div className="type-group-heading">
          <span className="docs-eyebrow">Responsive scale</span>
          <h2 id="type-scale">Fluid font sizes</h2>
          <p>An agnostic numeric scale keeps font sizes reusable across components. Each size grows smoothly between its minimum and maximum value without breakpoint jumps.</p>
        </div>
        <div className="font-size-table">
          <table>
            <thead>
              <tr>
                <th>Step</th>
                <th>Token</th>
                <th>Value</th>
                <th>Preview</th>
              </tr>
            </thead>
            <tbody>
              {fontSizes.map(({ name, token, value }) => (
                <TypeScaleItem key={token} name={name} token={token} clamp={value} />
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="type-group" aria-labelledby="line-heights">
        <div className="type-group-heading">
          <span className="docs-eyebrow">Vertical rhythm</span>
          <h2 id="line-heights">Line heights</h2>
          <p>Unitless values preserve the intended rhythm as text sizes respond to the viewport.</p>
        </div>
        <div className="token-table">
          <table>
            <thead><tr><th>Use</th><th>Token</th><th>Value</th><th>Preview</th></tr></thead>
            <tbody>
              {lineHeights.map(({ name, token, value, font, description }) => (
                <tr key={token}>
                  <td>{name}</td><td><code>{token}</code></td><td><code>{value}</code></td>
                  <td>
                    <span className="token-sample" style={{ font: `var(${font})` }}>
                      {description[0]}<br />{description[1]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="type-group" aria-labelledby="font-weights">
        <div className="type-group-heading">
          <span className="docs-eyebrow">Emphasis</span>
          <h2 id="font-weights">Font weights</h2>
          <p>Geologica is a variable font with a supported range from 100 to 900. These are the weights used across the interface.</p>
        </div>
        <div className="token-table">
          <table>
            <thead><tr><th>Weight</th><th>Token</th><th>Value</th><th>Preview</th></tr></thead>
            <tbody>
              {fontWeights.map(({ name, token, value }) => (
                <tr key={token}>
                  <td>{name}</td><td><code>{token}</code></td><td><code>{value}</code></td>
                  <td><span className="token-sample" style={{ fontWeight: `var(${token})` }}>The quick brown fox</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="type-group" aria-labelledby="inline-styles">
        <div className="type-group-heading">
          <span className="docs-eyebrow">Inline styles</span>
          <h2 id="inline-styles">Monospace treatments</h2>
        </div>
        <div className="preview stack-preview">
          <p>Keyboard shortcut: <kbd>⌘</kbd> + <kbd>K</kbd></p>
          <p>Terminal output: <samp>npm run dev</samp></p>
          <pre><code>{`npm create vite@latest my-app -- --template react
cd my-app
npm install
npm run dev`}</code></pre>
        </div>
      </section>
    </>
  );
}

const fontShorthands = [
  { name: "Body small", token: "--font-body-small", value: ["var(--font-weight-regular)", "var(--font-size-200)", "/ var(--line-height-body)", "var(--sans)"], sample: "Reading copy" },
  { name: "Body medium", token: "--font-body-medium", value: ["var(--font-weight-regular)", "var(--font-size-300)", "/ var(--line-height-body)", "var(--sans)"], sample: "Reading copy" },
  { name: "Body large", token: "--font-body-large", value: ["var(--font-weight-regular)", "var(--font-size-400)", "/ var(--line-height-body)", "var(--sans)"], sample: "Reading copy" },
  { name: "Title small", token: "--font-title-small", value: ["var(--font-weight-medium)", "var(--font-size-500)", "/ var(--line-height-heading)", "var(--heading)"], sample: "Section title" },
  { name: "Title medium", token: "--font-title-medium", value: ["var(--font-weight-medium)", "var(--font-size-600)", "/ var(--line-height-heading)", "var(--heading)"], sample: "Section title" },
  { name: "Title large", token: "--font-title-large", value: ["var(--font-weight-bold)", "var(--font-size-700)", "/ var(--line-height-heading)", "var(--heading)"], sample: "Page title" },
  { name: "Caption", token: "--font-caption", value: ["var(--font-weight-regular)", "var(--font-size-100)", "/ var(--line-height-caption)", "var(--sans)"], sample: "Supporting detail" },
  { name: "Subtitle", token: "--font-subtitle", value: ["var(--font-weight-medium)", "var(--font-size-300)", "/ var(--line-height-subtitle)", "var(--sans)"], sample: "Supporting copy" },
  { name: "Display", token: "--font-display", value: ["var(--font-weight-bold)", "var(--font-size-800)", "/ var(--line-height-display)", "var(--heading)"], sample: "Make impact" },
  { name: "Code block", token: "--font-code-block", value: ["var(--font-weight-regular)", "var(--font-size-200)", "/ var(--line-height-body)", "var(--mono)"], sample: "npm run dev" },
  { name: "Label", token: "--font-label", value: ["var(--font-weight-bold)", "var(--font-size-100)", "/ var(--line-height-label)", "var(--mono)"], sample: "STATUS" },
];

function FontFamily({ label, token, stack, className, sample }) {
  return (
    <tr>
      <td>{label}</td>
      <td><code>{token}</code></td>
      <td><code>{stack}</code></td>
      <td><span className={`font-family-sample ${className}`}>{sample}</span></td>
    </tr>
  );
}

const fontSizes = [
  { name: "100", token: "--font-size-100", value: "0.75rem" },
  { name: "200", token: "--font-size-200", value: "clamp(0.875rem, 0.85rem + 0.125vw, 1rem)" },
  { name: "300", token: "--font-size-300", value: "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)" },
  { name: "400", token: "--font-size-400", value: "clamp(1.125rem, 1rem + 0.5vw, 1.375rem)" },
  { name: "500", token: "--font-size-500", value: "clamp(1.25rem, 1.15rem + 0.5vw, 1.5rem)" },
  { name: "600", token: "--font-size-600", value: "clamp(1.5rem, 1.3rem + 1vw, 2rem)" },
  { name: "700", token: "--font-size-700", value: "clamp(2.25rem, 1.85rem + 2vw, 3.5rem)" },
  { name: "800", token: "--font-size-800", value: "clamp(3rem, 2rem + 4vw, 5rem)" },
];

function TypeScaleItem({ name, token, clamp }) {
  return (
    <tr>
      <td>{name}</td>
      <td><code>{token}</code></td>
      <td><code>{clamp}</code></td>
      <td><span className="font-size-sample" style={{ fontSize: `var(${token})` }}>The quick brown fox</span></td>
    </tr>
  );
}

const lineHeights = [
  { name: "Display", token: "--line-height-display", value: "1", font: "--font-display", description: ["Use for oversized", "display text."] },
  { name: "Heading", token: "--line-height-heading", value: "1.18", font: "--font-title-medium", description: ["Use for multi-line", "headings."] },
  { name: "Label", token: "--line-height-label", value: "1.2", font: "--font-label", description: ["Use for compact", "UI labels."] },
  { name: "Subtitle", token: "--line-height-subtitle", value: "1.35", font: "--font-subtitle", description: ["Use for supporting", "title copy."] },
  { name: "Caption", token: "--line-height-caption", value: "1.4", font: "--font-caption", description: ["Use for concise", "captions."] },
  { name: "Body", token: "--line-height-body", value: "1.5", font: "--font-body-medium", description: ["Use for readable", "body text."] },
];

const fontWeights = [
  { name: "Light", token: "--font-weight-light", value: "300" },
  { name: "Regular", token: "--font-weight-regular", value: "400" },
  { name: "Medium", token: "--font-weight-medium", value: "500" },
  { name: "Bold", token: "--font-weight-bold", value: "700" },
];

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
