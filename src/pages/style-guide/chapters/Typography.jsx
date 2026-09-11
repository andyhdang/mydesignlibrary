import Table from "../../../components/table/Table";

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
  { name: "Label small", token: "--font-label-small", value: ["var(--font-weight-medium)", "var(--font-size-100)", "/ var(--line-height-label)", "var(--sans)"], sample: "Status" },
  { name: "Label medium", token: "--font-label-medium", value: ["var(--font-weight-medium)", "var(--font-size-200)", "/ var(--line-height-label)", "var(--sans)"], sample: "Status" },
  { name: "Label large", token: "--font-label-large", value: ["var(--font-weight-medium)", "var(--font-size-300)", "/ var(--line-height-label)", "var(--sans)"], sample: "Status" },
  { name: "Label eyebrow", token: "--font-label-eyebrow", value: ["var(--font-weight-medium)", "var(--font-size-100)", "/ var(--line-height-label)", "var(--mono)"], sample: "FOUNDATION" },
];

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

const lineHeights = [
  { name: "Display", token: "--line-height-display", value: "1", font: "--font-display", description: ["Use for oversized", "display text."] },
  { name: "Heading", token: "--line-height-heading", value: "1.18", font: "--font-title-medium", description: ["Use for multi-line", "headings."] },
  { name: "Label", token: "--line-height-label", value: "1.2", font: "--font-label-medium", description: ["Use for compact", "UI labels."] },
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

export default function Typography() {
  return (
    <>
      <section className="type-group" aria-labelledby="font-families">
        <div className="type-group-heading"><span className="docs-eyebrow">Font families</span><h2 id="font-families">Primary stacks and fallbacks</h2></div>
        <div className="token-table"><Table stickyFirstColumn><thead><tr><th>Use</th><th>Token</th><th>Font stack</th><th>Preview</th></tr></thead><tbody>
          <FontFamily label="Body" token="--sans" stack={'"Geologica", system-ui, sans-serif'} className="font-sans" sample="The quick brown fox jumps over the lazy dog." />
          <FontFamily label="Headings" token="--heading" stack={'"Geologica", system-ui, sans-serif'} className="font-heading" sample="Thoughtful typography creates hierarchy." />
          <FontFamily label="Code" token="--mono" stack="ui-monospace, Consolas, monospace" className="font-mono" sample="const foundation = true;" />
        </tbody></Table></div>
      </section>
      <section className="type-group" aria-labelledby="font-shorthands">
        <div className="type-group-heading"><span className="docs-eyebrow">Font recipes</span><h2 id="font-shorthands">Font shorthands</h2><p>Each token combines family, weight, size, and line height into a reusable font style.</p></div>
        <div className="font-shorthand-table"><Table stickyFirstColumn><thead><tr><th>Style</th><th>Token</th><th>Font shorthand</th><th>Preview</th></tr></thead><tbody>
          {fontShorthands.map(({ name, token, value, sample }) => <tr key={token}><td>{name}</td><td><code>{token}</code></td><td><div className="font-shorthand-value">{value.map((part) => <code key={part}>{part}</code>)}</div></td><td><span className="font-shorthand-sample" style={{ font: `var(${token})` }}>{sample}</span></td></tr>)}
        </tbody></Table></div>
      </section>
      <section className="type-group" aria-labelledby="type-scale">
        <div className="type-group-heading"><span className="docs-eyebrow">Responsive scale</span><h2 id="type-scale">Fluid font sizes</h2><p>An agnostic numeric scale keeps font sizes reusable across components. Each size grows smoothly between its minimum and maximum value without breakpoint jumps.</p></div>
        <div className="font-size-table"><Table stickyFirstColumn><thead><tr><th>Step</th><th>Token</th><th>Value</th><th>Preview</th></tr></thead><tbody>
          {fontSizes.map(({ name, token, value }) => <tr key={token}><td>{name}</td><td><code>{token}</code></td><td><code>{value}</code></td><td><span className="font-size-sample" style={{ fontSize: `var(${token})` }}>The quick brown fox</span></td></tr>)}
        </tbody></Table></div>
      </section>
      <section className="type-group" aria-labelledby="line-heights">
        <div className="type-group-heading"><span className="docs-eyebrow">Vertical rhythm</span><h2 id="line-heights">Line heights</h2><p>Unitless values preserve the intended rhythm as text sizes respond to the viewport.</p></div>
        <div className="token-table"><Table stickyFirstColumn><thead><tr><th>Use</th><th>Token</th><th>Value</th><th>Preview</th></tr></thead><tbody>
          {lineHeights.map(({ name, token, value, font, description }) => <tr key={token}><td>{name}</td><td><code>{token}</code></td><td><code>{value}</code></td><td><span className="token-sample" style={{ font: `var(${font})` }}>{description[0]}<br />{description[1]}</span></td></tr>)}
        </tbody></Table></div>
      </section>
      <section className="type-group" aria-labelledby="font-weights">
        <div className="type-group-heading"><span className="docs-eyebrow">Emphasis</span><h2 id="font-weights">Font weights</h2><p>Geologica is a variable font with a supported range from 100 to 900. These are the weights used across the interface.</p></div>
        <div className="token-table"><Table stickyFirstColumn><thead><tr><th>Weight</th><th>Token</th><th>Value</th><th>Preview</th></tr></thead><tbody>
          {fontWeights.map(({ name, token, value }) => <tr key={token}><td>{name}</td><td><code>{token}</code></td><td><code>{value}</code></td><td><span className="token-sample" style={{ fontWeight: `var(${token})` }}>The quick brown fox</span></td></tr>)}
        </tbody></Table></div>
      </section>
    </>
  );
}

function FontFamily({ label, token, stack, className, sample }) {
  return <tr><td>{label}</td><td><code>{token}</code></td><td><code>{stack}</code></td><td><span className={`font-family-sample ${className}`}>{sample}</span></td></tr>;
}
