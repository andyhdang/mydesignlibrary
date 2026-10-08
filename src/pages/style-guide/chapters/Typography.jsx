import { useState } from "react";
import Table from "../../../components/table/Table";
import formatTokenName from "../formatTokenName";

const fontShorthands = [
  { name: "Body small", token: "--font-body-small", value: ["var(--font-weight-regular)", "var(--font-size-fluid-200)", "/ var(--font-line-height-body)", "var(--font-sans)"], sample: "Reading copy" },
  { name: "Body medium", token: "--font-body-medium", value: ["var(--font-weight-regular)", "var(--font-size-fluid-300)", "/ var(--font-line-height-body)", "var(--font-sans)"], sample: "Reading copy" },
  { name: "Body large", token: "--font-body-large", value: ["var(--font-weight-regular)", "var(--font-size-fluid-400)", "/ var(--font-line-height-body)", "var(--font-sans)"], sample: "Reading copy" },
  { name: "Title small", token: "--font-title-small", value: ["var(--font-weight-medium)", "var(--font-size-fluid-400)", "/ var(--font-line-height-heading)", "var(--font-heading)"], sample: "Section title" },
  { name: "Title medium", token: "--font-title-medium", value: ["var(--font-weight-medium)", "var(--font-size-fluid-500)", "/ var(--font-line-height-heading)", "var(--font-heading)"], sample: "Section title" },
  { name: "Title large", token: "--font-title-large", value: ["var(--font-weight-medium)", "var(--font-size-fluid-700)", "/ var(--font-line-height-heading)", "var(--font-heading)"], sample: "Page title" },
  { name: "Caption", token: "--font-caption", value: ["var(--font-weight-regular)", "var(--font-size-fixed-050)", "/ var(--font-line-height-caption)", "var(--font-sans)"], sample: "Supporting detail" },
  { name: "Subtitle", token: "--font-subtitle", value: ["var(--font-weight-medium)", "var(--font-size-fluid-300)", "/ var(--font-line-height-subtitle)", "var(--font-sans)"], sample: "Supporting copy" },
  { name: "Display", token: "--font-display", value: ["var(--font-weight-bold)", "var(--font-size-fluid-800)", "/ var(--font-line-height-display)", "var(--font-heading)"], sample: "Make impact" },
  { name: "Code block", token: "--font-code-block", value: ["var(--font-weight-regular)", "var(--font-size-fixed-200)", "/ var(--font-line-height-body)", "var(--font-mono)"], sample: "npm run dev" },
  { name: "Label small", token: "--font-label-small", value: ["var(--font-weight-medium)", "var(--font-size-fixed-100)", "/ var(--font-line-height-label)", "var(--font-sans)"], sample: "Status" },
  { name: "Label medium", token: "--font-label-medium", value: ["var(--font-weight-medium)", "var(--font-size-fixed-200)", "/ var(--font-line-height-label)", "var(--font-sans)"], sample: "Status" },
  { name: "Label large", token: "--font-label-large", value: ["var(--font-weight-medium)", "var(--font-size-fixed-300)", "/ var(--font-line-height-label)", "var(--font-sans)"], sample: "Status" },
  { name: "Label eyebrow", token: "--font-label-eyebrow", value: ["var(--font-weight-medium)", "var(--font-size-fixed-100)", "/ var(--font-line-height-label)", "var(--font-mono)"], sample: "FOUNDATION" },
];

const secondMajorRatio = 1.125;

const fontSizeSteps = [
  { token: "--font-size-fluid-025", multiplier: 0.75 },
  { token: "--font-size-fluid-050", multiplier: secondMajorRatio ** -1 },
  { token: "--font-size-fluid-100", multiplier: 1 },
  { token: "--font-size-fluid-200", multiplier: secondMajorRatio },
  { token: "--font-size-fluid-300", multiplier: secondMajorRatio ** 2 },
  { token: "--font-size-fluid-400", multiplier: secondMajorRatio ** 3 },
  { token: "--font-size-fluid-500", multiplier: secondMajorRatio ** 4 },
  { token: "--font-size-fluid-600", multiplier: secondMajorRatio ** 5 },
  { token: "--font-size-fluid-700", multiplier: secondMajorRatio ** 6 },
  { token: "--font-size-fluid-800", multiplier: secondMajorRatio ** 7 },
];

const viewportScales = [
  { id: "mobile", label: "Mobile", basePixels: 14, maximumBasePixels: 16, minimumViewport: 768, maximumViewport: 1024 },
  { id: "tablet", label: "Tablet", basePixels: 14, maximumBasePixels: 16, minimumViewport: 768, maximumViewport: 1024 },
  { id: "desktop-small", label: "Desktop small", basePixels: 16, maximumBasePixels: 18, minimumViewport: 1024, maximumViewport: 1536 },
  { id: "desktop-medium", label: "Desktop medium", basePixels: 16, maximumBasePixels: 18, minimumViewport: 1024, maximumViewport: 1536 },
  { id: "desktop-large", label: "Desktop large", basePixels: 18, maximumBasePixels: 20, minimumViewport: 1536, maximumViewport: 1920 },
];

function formatRem(pixels) {
  return `${Number((pixels / 16).toFixed(4))}rem`;
}

function getFluidValue(minimum, maximum, minimumViewport, maximumViewport) {
  if (minimum === maximum) {
    return formatRem(minimum);
  }

  const viewportCoefficient = ((maximum - minimum) / (maximumViewport - minimumViewport)) * 100;
  const intercept = minimum - (viewportCoefficient / 100) * minimumViewport;

  return `clamp(${formatRem(minimum)}, ${formatRem(intercept)} + ${Number(viewportCoefficient.toFixed(6))}vw, ${formatRem(maximum)})`;
}

const lineHeights = [
  { name: "Display", token: "--font-line-height-display", value: "1", font: "--font-display", description: ["Use for oversized", "display text."] },
  { name: "Heading", token: "--font-line-height-heading", value: "1.18", font: "--font-title-medium", description: ["Use for multi-line", "headings."] },
  { name: "Label", token: "--font-line-height-label", value: "1.2", font: "--font-label-medium", description: ["Use for compact", "UI labels."] },
  { name: "Subtitle", token: "--font-line-height-subtitle", value: "1.35", font: "--font-subtitle", description: ["Use for supporting", "title copy."] },
  { name: "Caption", token: "--font-line-height-caption", value: "1.4", font: "--font-caption", description: ["Use for concise", "captions."] },
  { name: "Body", token: "--font-line-height-body", value: "1.5", font: "--font-body-medium", description: ["Use for readable", "body text."] },
];

const fontWeights = [
  { name: "Light", token: "--font-weight-light", value: "300" },
  { name: "Regular", token: "--font-weight-regular", value: "400" },
  { name: "Medium", token: "--font-weight-medium", value: "500" },
  { name: "Bold", token: "--font-weight-bold", value: "700" },
];

export default function Typography() {
  const [selectedScaleId, setSelectedScaleId] = useState("mobile");
  const selectedScale = viewportScales.find(({ id }) => id === selectedScaleId);
  const fontSizes = fontSizeSteps.map(({ token, multiplier }) => {
    const pixels = Math.round((selectedScale.basePixels * multiplier) / 2) * 2;
    const maximumPixels = Math.round((selectedScale.maximumBasePixels * multiplier) / 2) * 2;

    return {
      name: token.slice(-3),
      token,
      multiplier,
      value: getFluidValue(
        pixels,
        maximumPixels,
        selectedScale.minimumViewport,
        selectedScale.maximumViewport,
      ),
      pixels: maximumPixels === pixels ? `${pixels}px` : `${pixels}–${maximumPixels}px`,
      calculatedPixels: pixels,
    };
  });
  const previewStyle = Object.fromEntries(
    fontSizes.map(({ token, calculatedPixels }) => [token, formatRem(calculatedPixels)]),
  );
  const fixedFontSizes = fontSizeSteps.map(({ token, multiplier }) => {
    const pixels = Math.round((16 * multiplier) / 2) * 2;

    return {
      name: token.slice(-3),
      token: token.replace("-fluid-", "-fixed-"),
      multiplier,
      value: formatRem(pixels),
      pixels: `${pixels}px`,
    };
  });

  return (
    <div className="typography-chapter" style={previewStyle}>
      <TypographyIntroVisual />
      <section className="type-group" aria-labelledby="font-families">
        <div className="section-header"><h2 id="font-families" className="section-title">Primary stacks and fallbacks</h2></div>
        <div className="token-table"><Table stickyFirstColumn><thead><tr><th>Use</th><th>Token</th><th>Font stack</th><th>Preview</th></tr></thead><tbody>
          <FontFamily label="Body" token="--font-sans" stack={'"Geologica", system-ui, sans-serif'} className="font-sans" sample="The quick brown fox jumps over the lazy dog." />
          <FontFamily label="Headings" token="--font-heading" stack={'"Geologica", system-ui, sans-serif'} className="font-heading" sample="Thoughtful typography creates hierarchy." />
          <FontFamily label="Code" token="--font-mono" stack="ui-monospace, Consolas, monospace" className="font-mono" sample="const foundation = true;" />
        </tbody></Table></div>
      </section>
      <section className="type-group" aria-labelledby="font-shorthands">
        <div className="section-header"><h2 id="font-shorthands" className="section-title">Font shorthands</h2><p>Each token combines family, weight, size, and line height into a reusable font style.</p></div>
        <div className="font-shorthand-table"><Table stickyFirstColumn><thead><tr><th>Style</th><th>Token</th><th>Font shorthand</th><th>Preview</th></tr></thead><tbody>
          {fontShorthands.map(({ name, token, value, sample }) => <tr key={token}><td>{name}</td><td><code>{formatTokenName(token)}</code></td><td><div className="font-shorthand-value">{value.map((part) => <code key={part}>{part}</code>)}</div></td><td><span className="font-shorthand-sample" style={{ font: `var(${token})` }}>{sample}</span></td></tr>)}
        </tbody></Table></div>
      </section>
      <section className="type-group" aria-labelledby="type-scale">
        <div className="section-header"><h2 id="type-scale" className="section-title">Fluid font sizes</h2><p>Use fluid sizes for body, subtitle, title, and display text. Values follow a 1.125 second-major scale and round to even pixels; step 025 uses 0.75× to remain distinct.</p></div>
        <FontSizeMultiplierCurve />
        <p className="font-size-viewport-preview">
          Previewing a <span className="font-size-dynamic-value">{selectedScale.label.toLowerCase()}</span> base of <span className="font-size-dynamic-value">{selectedScale.basePixels}px</span>.
        </p>
        <div className="font-size-viewport-toggle" role="group" aria-label="Font size viewport preview">
          {viewportScales.map(({ id, label, basePixels }) => (
            <button
              className={id === selectedScaleId ? "is-active" : undefined}
              type="button"
              key={id}
              aria-pressed={id === selectedScaleId}
              onClick={() => setSelectedScaleId(id)}
            >
              {label} ({basePixels}px)
            </button>
          ))}
        </div>
        <FontSizeCurve fontSizes={fontSizes} />
        <div className="font-size-table"><Table stickyFirstColumn><thead><tr><th>Step</th><th>Token</th><th>Multiplier</th><th>Value</th><th>Pixels</th><th>Preview</th></tr></thead><tbody>
          {fontSizes.map(({ name, token, multiplier, value, pixels }) => <tr key={token}><td>{name}</td><td><code>{formatTokenName(token)}</code></td><td><code>{Number(multiplier.toFixed(3))}×</code></td><td><code className="font-size-dynamic-value">{value}</code></td><td><code className="font-size-dynamic-value">{pixels}</code></td><td><span className="font-size-sample" style={{ fontSize: `var(${token})` }}>The quick brown fox</span></td></tr>)}
        </tbody></Table></div>
        <div className="font-size-clamp-explanation">
          <h3>How the clamp is calculated</h3>
          <p>Example: scale from 14px to 16px as the viewport grows from 768px to 1024px.</p>
          <code className="font-size-clamp-formula">vw coefficient = (16 − 14) ÷ (1024 − 768) × 100 = 0.78125vw</code>
          <code className="font-size-clamp-formula">intercept = 14 − (0.0078125 × 768) = 8px = 0.5rem</code>
          <code className="font-size-clamp-formula">clamp(0.875rem, 0.5rem + 0.78125vw, 1rem)</code>
          <p>The middle value equals 14px at 768px and 16px at 1024px. The outer values keep the result within that range.</p>
        </div>
      </section>
      <section className="type-group" aria-labelledby="fixed-font-sizes">
        <div className="section-header"><h2 id="fixed-font-sizes" className="section-title">Fixed font size primitives</h2><p>Use fixed sizes for compact interface text such as buttons, pills, inputs, navigation, captions, and code. These values use a 16px base and do not change with the viewport.</p></div>
        <div className="font-size-table"><Table stickyFirstColumn><thead><tr><th>Step</th><th>Token</th><th>Multiplier</th><th>Value</th><th>Pixels</th><th>Preview</th></tr></thead><tbody>
          {fixedFontSizes.map(({ name, token, multiplier, value, pixels }) => <tr key={token}><td>{name}</td><td><code>{formatTokenName(token)}</code></td><td><code>{Number(multiplier.toFixed(3))}×</code></td><td><code>{value}</code></td><td><code>{pixels}</code></td><td><span className="font-size-sample" style={{ fontSize: `var(${token})` }}>The quick brown fox</span></td></tr>)}
        </tbody></Table></div>
      </section>
      <section className="type-group" aria-labelledby="line-heights">
        <div className="section-header"><h2 id="line-heights" className="section-title">Line heights</h2><p>Unitless values preserve the intended rhythm as text sizes respond to the viewport.</p></div>
        <div className="token-table"><Table stickyFirstColumn><thead><tr><th>Use</th><th>Token</th><th>Value</th><th>Preview</th></tr></thead><tbody>
          {lineHeights.map(({ name, token, value, font, description }) => <tr key={token}><td>{name}</td><td><code>{formatTokenName(token)}</code></td><td><code>{value}</code></td><td><span className="token-sample" style={{ font: `var(${font})` }}>{description[0]}<br />{description[1]}</span></td></tr>)}
        </tbody></Table></div>
      </section>
      <section className="type-group" aria-labelledby="font-weights">
        <div className="section-header"><h2 id="font-weights" className="section-title">Font weights</h2><p>Geologica is a variable font with a supported range from 100 to 900. These are the weights used across the interface.</p></div>
        <div className="token-table"><Table stickyFirstColumn><thead><tr><th>Weight</th><th>Token</th><th>Value</th><th>Preview</th></tr></thead><tbody>
          {fontWeights.map(({ name, token, value }) => <tr key={token}><td>{name}</td><td><code>{formatTokenName(token)}</code></td><td><code>{value}</code></td><td><span className="token-sample" style={{ fontWeight: `var(${token})` }}>The quick brown fox</span></td></tr>)}
        </tbody></Table></div>
      </section>
    </div>
  );
}

function FontSizeCurve({ fontSizes }) {
  const maximum = fontSizes.at(-1).calculatedPixels;
  const points = fontSizes.map(({ name, calculatedPixels: value }, index) => {
    return {
      label: name,
      value,
      x: 40 + (index * 560) / (fontSizes.length - 1),
      y: 172 - (value / maximum) * 132,
    };
  });
  const linePoints = points.map(({ x, y }) => `${x},${y}`).join(" ");

  return (
    <figure className="spacing-curve">
      <svg viewBox="0 0 640 208" role="img" aria-labelledby="font-size-curve-title font-size-curve-description">
        <title id="font-size-curve-title">Calculated font sizes</title>
        <desc id="font-size-curve-description">A line chart showing the rounded font sizes for the selected viewport base.</desc>
        <line className="spacing-curve__axis" x1="40" y1="172" x2="600" y2="172" />
        <line className="spacing-curve__guide" x1="40" y1="106" x2="600" y2="106" />
        <line className="spacing-curve__guide" x1="40" y1="40" x2="600" y2="40" />
        <polyline className="spacing-curve__line" points={linePoints} />
        {points.map(({ label, value, x, y }) => (
          <g key={label}>
            <circle className="spacing-curve__point" cx={x} cy={y} r="4" />
            <text className="spacing-curve__value spacing-curve__value--dynamic" x={x} y={y - 10}>{value}px</text>
            <text className="spacing-curve__label" x={x} y="194">{label}</text>
          </g>
        ))}
      </svg>
      <figcaption>Resulting font sizes, rounded to the nearest 2px.</figcaption>
    </figure>
  );
}

function FontSizeMultiplierCurve() {
  const maximum = fontSizeSteps.at(-1).multiplier;
  const points = fontSizeSteps.map(({ token, multiplier }, index) => {

    return {
      label: token.slice(-3),
      multiplier,
      x: 40 + (index * 560) / (fontSizeSteps.length - 1),
      y: 172 - (multiplier / maximum) * 132,
    };
  });
  const linePoints = points.map(({ x, y }) => `${x},${y}`).join(" ");

  return (
    <figure className="spacing-curve spacing-curve--neutral">
      <svg viewBox="0 0 640 208" role="img" aria-labelledby="font-size-multiplier-curve-title font-size-multiplier-curve-description">
        <title id="font-size-multiplier-curve-title">Font size progression multipliers</title>
        <desc id="font-size-multiplier-curve-description">A line chart showing the progression multipliers across ten font size steps.</desc>
        <line className="spacing-curve__axis" x1="40" y1="172" x2="600" y2="172" />
        <line className="spacing-curve__guide" x1="40" y1="106" x2="600" y2="106" />
        <line className="spacing-curve__guide" x1="40" y1="40" x2="600" y2="40" />
        <polyline className="spacing-curve__line" points={linePoints} />
        {points.map(({ label, multiplier, x, y }) => (
          <g key={label}>
            <circle className="spacing-curve__point" cx={x} cy={y} r="4" />
            <text className="spacing-curve__value" x={x} y={y - 10}>{Number(multiplier.toFixed(3))}×</text>
            <text className="spacing-curve__label" x={x} y="194">{label}</text>
          </g>
        ))}
      </svg>
      <figcaption>Second-major multipliers applied to the viewport base.</figcaption>
    </figure>
  );
}

function TypographyIntroVisual() {
  return <div className="typography-intro-visual" aria-hidden="true">
    <span className="typography-intro-visual__sample">Aa</span>
  </div>;
}

function FontFamily({ label, token, stack, className, sample }) {
  return <tr><td>{label}</td><td><code>{formatTokenName(token)}</code></td><td><code>{stack}</code></td><td><span className={`font-family-sample ${className}`}>{sample}</span></td></tr>;
}
