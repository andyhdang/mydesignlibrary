import { useState } from "react";
import Table from "../../../components/table/Table";
import formatTokenName from "../formatTokenName";

const spacingTokens = [
  ["--space-01"],
  ["--space-02"],
  ["--space-03"],
  ["--space-04"],
  ["--space-05"],
  ["--space-06"],
  ["--space-07"],
  ["--space-08"],
  ["--space-09"],
  ["--space-10"],
  ["--space-11"],
  ["--space-12"],
  ["--space-13"],
  ["--space-14"],
  ["--space-15"],
];

const semanticSpacingTokenGroups = [
  {
    title: "Inset",
    diagram: "inset",
    description: "Equal padding on all sides.",
    tokens: [
      ["--inset-xs", "space-02", "Extra-small equal inset"],
      ["--inset-s", "space-04", "Small equal inset"],
      ["--inset-m", "space-06", "Medium equal inset"],
      ["--inset-l", "space-08", "Large equal inset"],
      ["--inset-xl", "space-10", "Extra-large equal inset"],
    ],
  },
  {
    title: "Inset squish",
    diagram: "inset-squish",
    description: "Less block padding than inline padding.",
    tokens: [
      ["--inset-squish-xs", "space-01 space-02", "Extra-small squished inset"],
      ["--inset-squish-s", "space-02 space-04", "Small squished inset"],
      ["--inset-squish-m", "space-04 space-06", "Medium squished inset"],
      ["--inset-squish-l", "space-06 space-08", "Large squished inset"],
      ["--inset-squish-xl", "space-08 space-10", "Extra-large squished inset"],
    ],
  },
  {
    title: "Inset stretch",
    diagram: "inset-stretch",
    description: "More block padding than inline padding.",
    tokens: [
      ["--inset-stretch-xs", "space-02 space-01", "Extra-small stretched inset"],
      ["--inset-stretch-s", "space-04 space-02", "Small stretched inset"],
      ["--inset-stretch-m", "space-06 space-04", "Medium stretched inset"],
      ["--inset-stretch-l", "space-08 space-06", "Large stretched inset"],
      ["--inset-stretch-xl", "space-10 space-08", "Extra-large stretched inset"],
    ],
  },
  {
    title: "Inline",
    diagram: "inline",
    description: "Horizontal gaps between adjacent elements.",
    tokens: [
      ["--inline-xs", "space-02", "Extra-small inline gap"],
      ["--inline-s", "space-04", "Small inline gap"],
      ["--inline-m", "space-06", "Medium inline gap"],
      ["--inline-l", "space-08", "Large inline gap"],
      ["--inline-xl", "space-10", "Extra-large inline gap"],
    ],
  },
  {
    title: "Stack",
    diagram: "stack",
    description: "Vertical gaps between stacked elements.",
    tokens: [
      ["--stack-xs", "space-02", "Extra-small stack gap"],
      ["--stack-s", "space-04", "Small stack gap"],
      ["--stack-m", "space-06", "Medium stack gap"],
      ["--stack-l", "space-08", "Large stack gap"],
      ["--stack-xl", "space-10", "Extra-large stack gap"],
    ],
  },
];

const viewportScales = [
  { id: "mobile", label: "Mobile", basePixels: 8 },
  { id: "tablet", label: "Tablet", basePixels: 8 },
  { id: "desktop-small", label: "Desktop small", basePixels: 12 },
  { id: "desktop-medium", label: "Desktop medium", basePixels: 12 },
  { id: "desktop-large", label: "Desktop large", basePixels: 16 },
];

const spacingMultipliers = [0.5, 0.75, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 6, 8, 12];

function formatRem(value) {
  return `${Number(value.toFixed(3))}rem`;
}

function formatPixels(value) {
  return `${Number(value.toFixed(3))}px`;
}

function getRoundedSpacingValues(basePixels) {
  return [0.25, ...spacingMultipliers].map((multiplier) => (
    Math.round((basePixels * multiplier) / 2) * 2
  ));
}

function getSemanticPixelValues(references, spacingValues) {
  return references
    .split(" ")
    .map((reference) => {
      const tokenIndex = spacingTokens.findIndex(([token]) => token === `--${reference}`);
      return formatPixels(spacingValues[tokenIndex]);
    })
    .join(" ");
}

export default function Spacing() {
  const [selectedScaleId, setSelectedScaleId] = useState("mobile");
  const selectedScale = viewportScales.find(({ id }) => id === selectedScaleId);
  const spacingValues = getRoundedSpacingValues(selectedScale.basePixels);
  const primitiveTokens = spacingTokens.map(([token], index) => [
    token,
    formatRem(spacingValues[index] / 16),
    formatPixels(spacingValues[index]),
  ]);
  const previewStyle = {
    "--space-base": `${selectedScale.basePixels / 16}rem`,
    ...Object.fromEntries(
      primitiveTokens.map(([token, value]) => [token, value]),
    ),
  };
  const curvePoints = spacingValues.map((value, index) => ({
    label: spacingTokens[index][0].slice(-2),
    value,
    x: 40 + (index * 560) / (spacingValues.length - 1),
    y: 172 - (value / Math.max(...spacingValues)) * 132,
  }));

  return (
    <div className="spacing-chapter" style={previewStyle}>
      <SpacingTable
        title="Primitive spacing tokens"
        description={
          <>
            Previewing a <span className="spacing-dynamic-value">{selectedScale.label.toLowerCase()}</span> base unit of <span className="spacing-dynamic-value">{selectedScale.basePixels}px</span> at space-04. Multipliers begin at 0.25×, 0.5×, 0.75×, and 1×, then grow to 12× with tighter middle steps. Every calculated value rounds to the nearest even pixel, preserving close steps through the middle of the scale before growing for larger layouts.
          </>
        }
        tokens={primitiveTokens}
        valueLabel="Value"
        visual={
          <>
            <SpacingMultiplierCurve />
            <div className="spacing-viewport-toggle" role="group" aria-label="Spacing viewport preview">
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
            <SpacingCurve points={curvePoints} />
          </>
        }
      />
      <section className="type-group" aria-labelledby="semantic-spacing-tokens">
        <div className="section-header">
          <h2 id="semantic-spacing-tokens" className="section-title">Semantic spacing tokens</h2>
          <p>Use T-shirt-sized role tokens rather than choosing primitive values directly. Squish and stretch values use block then inline shorthand.</p>
        </div>
        <div className="semantic-spacing-groups">
          {semanticSpacingTokenGroups.map(({ title, diagram, description, tokens }) => (
            <section key={title} className="semantic-spacing-group" aria-labelledby={`semantic-${title.replaceAll(" ", "-")}`}>
              <h3 id={`semantic-${title.replaceAll(" ", "-")}`}>{title}</h3>
              <p>{description}</p>
              <SpacingTypeDiagram type={diagram} />
              <SpacingTable
                tokens={tokens.map(([token, references, use]) => [
                  token,
                  references,
                  getSemanticPixelValues(references, spacingValues),
                  use,
                ])}
                semantic
              />
            </section>
          ))}
        </div>
      </section>
      <section className="chapter-references" aria-labelledby="spacing-references">
        <h2 id="spacing-references" className="section-title">References</h2>
        <ul>
          <li>
            <a
              href="https://spectrum.adobe.com/foundations/layout-and-structure/spacing/layout-spacing"
              target="_blank"
              rel="noreferrer"
            >
              Adobe Spectrum: Layout spacing
            </a>
          </li>
          <li>
            <a
              href="https://medium.com/eightshapes-llc/space-in-design-systems-188bcbae0d62"
              target="_blank"
              rel="noreferrer"
            >
              EightShapes: Space in design systems
            </a>
          </li>
        </ul>
      </section>
    </div>
  );
}

function SpacingTable({ title, description, tokens, valueLabel, visual, semantic = false }) {
  const titleId = title?.toLowerCase().replaceAll(" ", "-");

  return (
    <section className={title ? "type-group" : undefined} aria-labelledby={title ? titleId : undefined}>
      {title && (
        <div className="section-header">
          <h2 id={titleId} className="section-title">{title}</h2>
          <p>{description}</p>
        </div>
      )}
      {visual}
      <div className="token-table spacing-token-table">
        <Table>
          <thead>
            <tr>
              <th>Token</th>
              <th>{semantic ? "References" : valueLabel}</th>
              {semantic ? <><th>Pixels</th><th>Use</th></> : <><th>Pixels</th><th>Preview</th></>}
            </tr>
          </thead>
          <tbody>
            {semantic
              ? tokens.map(([token, references, pixels, use]) => (
                <tr key={token}>
                  <td><code>{formatTokenName(token)}</code></td>
                  <td><code>{references}</code></td>
                  <td><code className="spacing-dynamic-value">{pixels}</code></td>
                  <td>{use}</td>
                </tr>
              ))
              : tokens.map(([token, value, pixels]) => (
                <tr key={token}>
                  <td><code>{formatTokenName(token)}</code></td>
                  <td><code className="spacing-dynamic-value">{formatTokenName(value)}</code></td>
                  <td><code className="spacing-dynamic-value">{pixels}</code></td>
                  <td>
                    <span
                      className="spacing-token-sample"
                      style={{ width: `var(${token})` }}
                      aria-label={`${formatTokenName(token)} spacing sample`}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </section>
  );
}

function SpacingCurve({ points }) {
  const linePoints = points.map(({ x, y }) => `${x},${y}`).join(" ");

  return (
    <figure className="spacing-curve">
      <svg viewBox="0 0 640 208" role="img" aria-labelledby="spacing-curve-title spacing-curve-description">
        <title id="spacing-curve-title">Primitive spacing scale curve</title>
        <desc id="spacing-curve-description">A line chart showing the rounded balanced spacing values increasing across ten steps.</desc>
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
      <figcaption>Resulting spacing values, rounded to the nearest 2px.</figcaption>
    </figure>
  );
}

function SpacingMultiplierCurve() {
  const multipliers = [0.25, ...spacingMultipliers];
  const maximum = Math.max(...multipliers);
  const stepWidth = 560 / (multipliers.length - 1);
  const points = multipliers.map((multiplier, index) => ({
    label: String(index + 1).padStart(2, "0"),
    multiplier,
    x: 40 + index * stepWidth,
    y: 172 - (multiplier / maximum) * 132,
  }));
  const linePoints = points.map(({ x, y }) => `${x},${y}`).join(" ");

  return (
    <figure className="spacing-curve">
      <svg viewBox="0 0 640 208" role="img" aria-labelledby="spacing-multiplier-curve-title spacing-multiplier-curve-description">
        <title id="spacing-multiplier-curve-title">Spacing progression multipliers</title>
        <desc id="spacing-multiplier-curve-description">A line chart showing the balanced progression multipliers across ten spacing steps.</desc>
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
      <figcaption>Progression multipliers applied to the base value.</figcaption>
    </figure>
  );
}

function SpacingTypeDiagram({ type }) {
  const diagrams = {
    inset: {
      title: "Inset spacing diagram",
      description: "Equal space separates an inner element from an outer container on every side.",
      caption: "Equal space on every side of the content.",
    },
    "inset-squish": {
      title: "Inset squish spacing diagram",
      description: "An inner element has less space above and below than it has on the left and right.",
      caption: "Less block space, more inline space.",
    },
    "inset-stretch": {
      title: "Inset stretch spacing diagram",
      description: "An inner element has more space above and below than it has on the left and right.",
      caption: "More block space, less inline space.",
    },
    inline: {
      title: "Inline spacing diagram",
      description: "A horizontal gap separates two adjacent elements.",
      caption: "Horizontal space between adjacent elements.",
    },
    stack: {
      title: "Stack spacing diagram",
      description: "A vertical gap separates two stacked elements.",
      caption: "Vertical space between stacked elements.",
    },
  };
  const diagram = diagrams[type];
  const titleId = `spacing-${type}-diagram-title`;
  const descriptionId = `spacing-${type}-diagram-description`;

  return (
    <figure className="spacing-type-diagram">
      <svg viewBox="0 0 360 160" role="img" aria-labelledby={`${titleId} ${descriptionId}`}>
        <title id={titleId}>{diagram.title}</title>
        <desc id={descriptionId}>{diagram.description}</desc>
        {type.startsWith("inset") && (
          <>
            <rect className="spacing-type-diagram__container" x="60" y="20" width="240" height="120" />
            {type === "inset" && <rect className="spacing-type-diagram__content" x="90" y="50" width="180" height="60" />}
            {type === "inset-squish" && <rect className="spacing-type-diagram__content" x="125" y="35" width="110" height="90" />}
            {type === "inset-stretch" && <rect className="spacing-type-diagram__content" x="85" y="57" width="190" height="46" />}
            <MeasurementLine x1="60" y1="80" x2={type === "inset-stretch" ? "85" : type === "inset-squish" ? "125" : "90"} y2="80" />
            <MeasurementLine x1="180" y1="20" x2="180" y2={type === "inset-squish" ? "35" : type === "inset-stretch" ? "57" : "50"} />
            <text className="spacing-type-diagram__label" x="180" y="154">container</text>
          </>
        )}
        {type === "inline" && (
          <>
            <rect className="spacing-type-diagram__content" x="60" y="55" width="100" height="50" />
            <rect className="spacing-type-diagram__content" x="200" y="55" width="100" height="50" />
            <MeasurementLine x1="160" y1="80" x2="200" y2="80" />
            <text className="spacing-type-diagram__label" x="180" y="135">inline gap</text>
          </>
        )}
        {type === "stack" && (
          <>
            <rect className="spacing-type-diagram__content" x="130" y="20" width="100" height="45" />
            <rect className="spacing-type-diagram__content" x="130" y="105" width="100" height="45" />
            <MeasurementLine x1="180" y1="65" x2="180" y2="105" />
            <text className="spacing-type-diagram__label" x="250" y="88">stack gap</text>
          </>
        )}
      </svg>
      <figcaption>{diagram.caption}</figcaption>
    </figure>
  );
}

function MeasurementLine({ x1, y1, x2, y2 }) {
  return (
    <g>
      <line className="spacing-type-diagram__measure" x1={x1} y1={y1} x2={x2} y2={y2} />
      <path className="spacing-type-diagram__measure-endpoint" transform={`translate(${x1} ${y1})`} d="M 0 -4 L 4 0 L 0 4 L -4 0 Z" />
      <path className="spacing-type-diagram__measure-endpoint" transform={`translate(${x2} ${y2})`} d="M 0 -4 L 4 0 L 0 4 L -4 0 Z" />
    </g>
  );
}
