import { useState } from "react";
import Table from "../../../components/table/Table";
import formatTokenName from "../formatTokenName";

const spacingTokens = [
  ["--space-01", 0],
  ["--space-02", 1],
  ["--space-03", 2],
  ["--space-04", 3],
  ["--space-05", 4],
  ["--space-06", 5],
  ["--space-07", 6],
  ["--space-08", 7],
  ["--space-09", 8],
  ["--space-10", 9],
  ["--space-11", 10],
  ["--space-12", 11],
  ["--space-13", 12],
  ["--space-14", 13],
];

const semanticSpacingTokens = [
  ["--padding-compact", "--space-02", 1],
  ["--padding-default", "--space-03", 2],
  ["--padding-spacious", "--space-07", 6],
  ["--margin-compact", "--space-02", 1],
  ["--margin-default", "--space-03", 2],
  ["--margin-spacious", "--space-07", 6],
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
  return spacingTokens.map(([, step]) => (
    Math.round((basePixels * spacingMultipliers[step]) / 2) * 2
  ));
}

export default function Spacing() {
  const [selectedScaleId, setSelectedScaleId] = useState("mobile");
  const selectedScale = viewportScales.find(({ id }) => id === selectedScaleId);
  const spacingValues = getRoundedSpacingValues(selectedScale.basePixels);
  const primitiveTokens = spacingTokens.map(([token, step]) => [
    token,
    formatRem(spacingValues[step] / 16),
    formatPixels(spacingValues[step]),
  ]);
  const semanticTokens = semanticSpacingTokens.map(([token, reference, step]) => [
    token,
    reference,
    formatPixels(spacingValues[step]),
  ]);
  const previewStyle = {
    "--space-base": `${selectedScale.basePixels / 16}rem`,
    ...Object.fromEntries(
      primitiveTokens.map(([token, value]) => [token, value]),
    ),
  };
  const curvePoints = spacingValues.map((value, index) => ({
    label: String(index + 1).padStart(2, "0"),
    value,
    x: 40 + (index * 560) / (spacingValues.length - 1),
    y: 172 - (value / Math.max(...spacingValues)) * 132,
  }));

  return (
    <div className="spacing-chapter" style={previewStyle}>
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
      <SpacingTable
        title="Primitive spacing tokens"
        description={`Previewing a ${selectedScale.label.toLowerCase()} base unit of ${selectedScale.basePixels}px at step 03. The scale uses 0.5×, 0.75×, 1×, 1.5×, 2×, then half-base increments through 5× before increasing to 6×, 8×, and 12×. Each value rounds to the nearest 2px, preserving close steps through the middle of the scale before growing for larger layouts.`}
        tokens={primitiveTokens}
        valueLabel="Value"
        visual={<><SpacingMultiplierCurve /><SpacingCurve points={curvePoints} /></>}
      />
      <SpacingTable
        title="Semantic spacing tokens"
        description="Use these role-based tokens for padding and margins instead of selecting primitive values directly."
        tokens={semanticTokens}
        valueLabel="References"
      />
    </div>
  );
}

function SpacingTable({ title, description, tokens, valueLabel, visual }) {
  const titleId = title.toLowerCase().replaceAll(" ", "-");

  return (
    <section className="type-group" aria-labelledby={titleId}>
      <div className="section-header">
        <h2 id={titleId} className="section-title">{title}</h2>
        <p>{description}</p>
      </div>
      {visual}
      <div className="token-table spacing-token-table">
        <Table>
          <thead>
            <tr>
              <th>Token</th>
              <th>{valueLabel}</th>
              <th>Pixels</th>
              <th>Preview</th>
            </tr>
          </thead>
          <tbody>
            {tokens.map(([token, value, pixels]) => (
              <tr key={token}>
                <td><code>{formatTokenName(token)}</code></td>
                <td><code>{formatTokenName(value)}</code></td>
                <td><code>{pixels}</code></td>
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
            <text className="spacing-curve__value" x={x} y={y - 10}>{value}px</text>
            <text className="spacing-curve__label" x={x} y="194">{label}</text>
          </g>
        ))}
      </svg>
      <figcaption>Resulting spacing values, rounded to the nearest 2px.</figcaption>
    </figure>
  );
}

function SpacingMultiplierCurve() {
  const maximum = Math.max(...spacingMultipliers);
  const points = spacingMultipliers.map((multiplier, index) => ({
    label: String(index + 1).padStart(2, "0"),
    multiplier,
    x: 40 + (index * 560) / (spacingMultipliers.length - 1),
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
            <text className="spacing-curve__value" x={x} y={y - 10}>{multiplier}×</text>
            <text className="spacing-curve__label" x={x} y="194">{label}</text>
          </g>
        ))}
      </svg>
      <figcaption>Progression multipliers applied to the base value.</figcaption>
    </figure>
  );
}
