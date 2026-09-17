import { useState } from "react";
import Table from "../../../components/table/Table";

const colorTokens = [
  { token: "--fg", light: "oklch(51.35% 0.0296 305.45)", dark: "oklch(71.37% 0.0192 261.32)", sampleType: "text" },
  { token: "--fg-muted", light: "oklch(from var(--fg) calc(l + 0.2) c h)", dark: "oklch(from var(--fg) calc(l - 0.2) c h)", sampleType: "text" },
  { token: "--bg", light: "oklch(100% 0 0)", dark: "oklch(20.63% 0.012 277.83)", sampleType: "fill" },
  { token: "--bg-surface", light: "oklch(from var(--bg) calc(l - 0.01) c h)", dark: "oklch(from var(--bg) calc(l + 0.02) c h)", sampleType: "fill" },
  { token: "--fg-inverse", light: "oklch(from var(--bg) calc(l - 0.04) c h)", dark: "oklch(from var(--bg) calc(l + 0.04) c h)", sampleType: "text" },
  { token: "--bg-inverse", light: "oklch(from var(--fg) calc(l - 0.1) c h)", dark: "oklch(from var(--fg) calc(l + 0.1) c h)", sampleType: "fill" },
  { token: "--border", light: "oklch(92.05% 0.0042 301.42)", dark: "oklch(31.13% 0.0181 276.38)", sampleType: "border" },
  { token: "--bg-code", light: "oklch(96.3% 0.0093 99.98)", dark: "oklch(24.6% 0.0152 279.6)", sampleType: "fill" },
  { token: "--fg-accent", light: "oklch(50% 0.12 190)", dark: "oklch(72% 0.12 190)", sampleType: "text" },
  { token: "--bg-accent", light: "var(--fg-accent)", dark: "var(--fg-accent)", sampleType: "fill" },
  { token: "--bg-surface-accent", light: "oklch(from var(--fg-accent) l c h / 0.1)", dark: "oklch(from var(--fg-accent) l c h / 0.15)", sampleType: "fill" },
  { token: "--border-accent", light: "oklch(from var(--fg-accent) l c h / 0.5)", dark: "oklch(from var(--fg-accent) l c h / 0.5)", sampleType: "border" },
];

const baseColorGroups = [
  {
    name: "Foreground",
    colors: [
      { name: "Foreground", variable: "--fg", sampleType: "text" },
      { name: "Muted foreground", variable: "--fg-muted", sampleType: "text" },
      { name: "Inverse foreground", variable: "--fg-inverse", sampleType: "text" },
      { name: "Accent foreground", variable: "--fg-accent", sampleType: "text" },
    ],
  },
  {
    name: "Background",
    colors: [
      { name: "Background", variable: "--bg", sampleType: "fill" },
      { name: "Surface background", variable: "--bg-surface", sampleType: "fill" },
      { name: "Inverse background", variable: "--bg-inverse", sampleType: "fill" },
      { name: "Code background", variable: "--bg-code", sampleType: "fill" },
      { name: "Accent background", variable: "--bg-accent", sampleType: "fill" },
      { name: "Accent surface background", variable: "--bg-surface-accent", sampleType: "fill" },
    ],
  },
  {
    name: "Borders",
    colors: [
      { name: "Border", variable: "--border", sampleType: "border" },
      { name: "Accent border", variable: "--border-accent", sampleType: "border" },
    ],
  },
];

const outlineButtonTokens = [
  { token: "--button-outline-fg", light: "var(--fg)", dark: "var(--fg)", sampleType: "text" },
  { token: "--button-outline-bg", light: "var(--bg)", dark: "var(--bg)", sampleType: "fill" },
  { token: "--button-outline-border", light: "var(--border)", dark: "var(--border)", sampleType: "border" },
  { token: "--button-outline-bg-hover", light: "oklch(from var(--bg) calc(l - 0.04) c h)", dark: "oklch(from var(--bg) calc(l + 0.04) c h)", sampleType: "fill" },
  { token: "--button-outline-fg-active", light: "oklch(from var(--fg) calc(l - 0.14) c h)", dark: "oklch(from var(--fg) calc(l + 0.14) c h)", sampleType: "text" },
  { token: "--button-outline-bg-active", light: "oklch(from var(--bg) calc(l - 0.08) c h)", dark: "oklch(from var(--bg) calc(l + 0.08) c h)", sampleType: "fill" },
];

const filledButtonTokens = [
  { token: "--button-filled-fg", light: "var(--fg-inverse)", dark: "var(--fg-inverse)", sampleType: "text" },
  { token: "--button-filled-bg", light: "var(--bg-inverse)", dark: "var(--bg-inverse)", sampleType: "fill" },
  { token: "--button-filled-bg-hover", light: "oklch(from var(--bg-inverse) calc(l + 0.06) c h)", dark: "oklch(from var(--bg-inverse) calc(l - 0.06) c h)", sampleType: "fill" },
  { token: "--button-filled-bg-active", light: "oklch(from var(--bg-inverse) calc(l - 0.06) c h)", dark: "oklch(from var(--bg-inverse) calc(l - 0.12) c h)", sampleType: "fill" },
];

const accentButtonTokens = [
  { token: "--button-accent-fg", light: "var(--fg-inverse)", dark: "var(--fg-inverse)", sampleType: "text" },
  { token: "--button-accent-bg", light: "var(--bg-accent)", dark: "var(--bg-accent)", sampleType: "fill" },
  { token: "--button-accent-bg-hover", light: "oklch(from var(--fg-accent) calc(l + 0.06) c h)", dark: "oklch(from var(--fg-accent) calc(l - 0.06) c h)", sampleType: "fill" },
  { token: "--button-accent-bg-active", light: "oklch(from var(--fg-accent) calc(l - 0.06) c h)", dark: "oklch(from var(--fg-accent) calc(l - 0.06) c h)", sampleType: "fill" },
];

const controlStateColors = [
  { token: "--control-fg", light: "var(--fg)", dark: "var(--fg)", sampleType: "text" },
  { token: "--control-bg", light: "var(--bg)", dark: "var(--bg)", sampleType: "fill" },
  { token: "--control-border", light: "var(--border)", dark: "var(--border)", sampleType: "border" },
  { token: "--control-bg-hover", light: "oklch(from var(--bg) calc(l - 0.04) c h)", dark: "oklch(from var(--bg) calc(l + 0.04) c h)", sampleType: "fill" },
  { token: "--control-bg-active", light: "oklch(from var(--bg) calc(l - 0.08) c h)", dark: "oklch(from var(--bg) calc(l + 0.08) c h)", sampleType: "fill" },
  { token: "--control-selected-fg", light: "var(--fg-accent)", dark: "var(--fg-accent)", sampleType: "text" },
  { token: "--control-selected-border", light: "var(--fg-accent)", dark: "var(--fg-accent)", sampleType: "border" },
];

export default function Colors() {
  return (
    <>
      <ColorIntroVisual />
      <section className="type-group" aria-labelledby="base-set-colors">
        <div className="section-header"><h2 id="base-set-colors" className="section-title">Base set colors</h2><p>The most frequently used colors throughout the site.</p></div>
        <div className="color-groups">{baseColorGroups.map(({ name, colors }) => <section className="color-group" key={name}><h3>{name}</h3><div className="color-grid">{colors.map(({ name: colorName, variable, sampleType }) => <ColorSwatch key={variable} name={colorName} variable={variable} sampleType={sampleType} />)}</div></section>)}</div>
      </section>
      <section className="type-group" aria-labelledby="color-token-values">
        <div className="section-header"><h2 id="color-token-values" className="section-title">Base set color tokens</h2><p>Token values for the light and dark themes.</p></div>
        <div className="token-table color-token-table"><Table stickyFirstColumn><colgroup><col /><col /><col /><col /></colgroup><thead><tr><th>Token</th><th>Light</th><th>Dark</th><th>Sample</th></tr></thead><tbody>
          {colorTokens.map(({ token, light, dark, sampleType }) => <tr key={token}><td><code>{token}</code></td><td><code>{light}</code></td><td><code>{dark}</code></td><td><ColorSample token={token} type={sampleType} /></td></tr>)}
        </tbody></Table></div>
      </section>
      <section className="type-group" aria-labelledby="state-colors">
        <div className="section-header"><h2 id="state-colors" className="section-title">State colors</h2><p>Hover and active states use fully opaque relative OKLCH values, preserving base hue and chroma while adjusting lightness.</p></div>
        <h3 className="state-color-subheading">Button states</h3>
        <div className="state-color-demo" aria-label="State color button examples">
          <button className="state-color-button state-color-button--outline" type="button">Outline button</button>
          <button className="state-color-button state-color-button--filled" type="button">Filled button</button>
          <button className="state-color-button state-color-button--accent" type="button">Accent button</button>
        </div>
        <div className="button-token-tables">
          {[outlineButtonTokens, filledButtonTokens, accentButtonTokens].map((tokens) => <div className="token-table color-token-table" key={tokens[0].token}><Table stickyFirstColumn><colgroup><col /><col /><col /><col /></colgroup><thead><tr><th>Token</th><th>Light</th><th>Dark</th><th>Sample</th></tr></thead><tbody>
            {tokens.map(({ token, light, dark, sampleType }) => <tr key={token}><td><code>{token}</code></td><td><code>{light}</code></td><td><code>{dark}</code></td><td><ColorSample token={token} type={sampleType} /></td></tr>)}
          </tbody></Table></div>)}
        </div>
        <h3 className="state-color-subheading">Control states</h3>
        <ControlStateDemo />
        <div className="token-table color-token-table"><Table stickyFirstColumn><colgroup><col /><col /><col /><col /></colgroup><thead><tr><th>Token</th><th>Light</th><th>Dark</th><th>Sample</th></tr></thead><tbody>
          {controlStateColors.map(({ token, light, dark, sampleType }) => <tr key={token}><td><code>{token}</code></td><td><code>{light}</code></td><td><code>{dark}</code></td><td><ColorSample token={token} type={sampleType} /></td></tr>)}
        </tbody></Table></div>
      </section>
    </>
  );
}

function ColorIntroVisual() {
  return <div className="color-intro-visual" aria-hidden="true">
    <div className="color-intro-visual__ui">
      <div className="color-intro-visual__topbar"><span /><span /><span /></div>
      <div className="color-intro-visual__body">
        <div className="color-intro-visual__sidebar"><span /><span /><span /></div>
        <div className="color-intro-visual__content">
          <span className="color-intro-visual__title" />
          <span className="color-intro-visual__line" />
          <span className="color-intro-visual__line color-intro-visual__line--short" />
          <div className="color-intro-visual__cards"><span /><span /><span /></div>
          <span className="color-intro-visual__action" />
        </div>
      </div>
    </div>
  </div>;
}

function ControlStateDemo() {
  const [selectedControl, setSelectedControl] = useState("Articles");
  const controls = ["Articles", "Projects", "Writing"];

  return <div className="control-color-demo" role="group" aria-label="Control state examples">
    {controls.map((control) => {
      const isSelected = control === selectedControl;

      return <button key={control} className={`control-color-pill${isSelected ? " is-selected" : ""}`} type="button" aria-pressed={isSelected} onClick={() => setSelectedControl(control)}>{control}</button>;
    })}
  </div>;
}

function ColorSwatch({ name, variable, sampleType }) {
  const style = sampleType === "border"
    ? { borderColor: `var(${variable})` }
    : sampleType === "text"
      ? { color: `var(${variable})` }
      : { backgroundColor: `var(${variable})` };

  return <div className="color-card"><div className={`color-swatch color-swatch--${sampleType}`} style={style}>{sampleType === "text" && "Aa"}</div><div><strong>{name}</strong><code>{variable}</code></div></div>;
}

function ColorSample({ token, type }) {
  if (type === "text") {
    return <span className="color-token-sample color-token-sample--fg" style={{ color: `var(${token})` }} aria-label={`${token} text color sample`}>Aa</span>;
  }

  if (type === "border") {
    return <span className="color-token-sample color-token-sample--border" style={{ borderColor: `var(${token})` }} aria-label={`${token} border color sample`} />;
  }

  return <span className="color-token-sample" style={{ backgroundColor: `var(${token})` }} aria-label={`${token} color sample`} />;
}
