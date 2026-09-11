import Table from "../../../components/table/Table";

const colorTokens = [
  { token: "--fg", light: "oklch(51.35% 0.0296 305.45)", dark: "oklch(71.37% 0.0192 261.32)", sampleType: "text" },
  { token: "--bg", light: "oklch(100% 0 0)", dark: "oklch(20.63% 0.012 277.83)", sampleType: "fill" },
  { token: "--border", light: "oklch(92.05% 0.0042 301.42)", dark: "oklch(31.13% 0.0181 276.38)", sampleType: "border" },
  { token: "--bg-code", light: "oklch(96.3% 0.0093 99.98)", dark: "oklch(24.6% 0.0152 279.6)", sampleType: "fill" },
  { token: "--fg-accent", light: "oklch(60.81% 0.269 305.12)", dark: "oklch(72.17% 0.1767 305.5)", sampleType: "text" },
  { token: "--bg-accent", light: "oklch(from var(--fg-accent) l c h / 0.1)", dark: "oklch(from var(--fg-accent) l c h / 0.15)", sampleType: "fill" },
  { token: "--border-accent", light: "oklch(from var(--fg-accent) l c h / 0.5)", dark: "oklch(from var(--fg-accent) l c h / 0.5)", sampleType: "border" },
];

const baseColors = [
  { name: "Background", variable: "--bg", sampleType: "fill" },
  { name: "Foreground", variable: "--fg", sampleType: "text" },
  { name: "Border", variable: "--border", sampleType: "border" },
  { name: "Code background", variable: "--bg-code", sampleType: "fill" },
  { name: "Accent foreground", variable: "--fg-accent", sampleType: "text" },
  { name: "Accent background", variable: "--bg-accent", sampleType: "fill" },
  { name: "Accent border", variable: "--border-accent", sampleType: "border" },
];

const stateColors = [
  { token: "--button-bg-hover", light: "oklch(from var(--bg) calc(l - 0.04) c h / 1)", dark: "oklch(from var(--bg) calc(l + 0.04) c h / 1)", sampleType: "fill" },
  { token: "--button-accent-bg-hover", light: "oklch(from var(--fg-accent) calc(l + 0.06) c h / 1)", dark: "oklch(from var(--fg-accent) calc(l - 0.06) c h / 1)", sampleType: "fill" },
  { token: "--button-fg-active", light: "oklch(from var(--fg) calc(l - 0.14) c h / 1)", dark: "oklch(from var(--fg) calc(l + 0.14) c h / 1)", sampleType: "text" },
  { token: "--button-bg-active", light: "oklch(from var(--bg) calc(l - 0.08) c h / 1)", dark: "oklch(from var(--bg) calc(l + 0.08) c h / 1)", sampleType: "fill" },
  { token: "--button-border-active", light: "oklch(from var(--border) calc(l - 0.14) c h / 1)", dark: "oklch(from var(--border) calc(l + 0.14) c h / 1)", sampleType: "border" },
  { token: "--button-accent-fg-active", light: "oklch(from var(--fg-accent) calc(l - 0.2) c h / 1)", dark: "oklch(from var(--fg-accent) calc(l + 0.2) c h / 1)", sampleType: "text" },
  { token: "--button-accent-bg-active", light: "oklch(from var(--fg-accent) calc(l + 0.18) c h / 1)", dark: "oklch(from var(--fg-accent) calc(l - 0.18) c h / 1)", sampleType: "fill" },
];

export default function Colors() {
  return (
    <>
      <section className="type-group" aria-labelledby="base-set-colors">
        <div className="type-group-heading"><span className="docs-eyebrow">Core palette</span><h2 id="base-set-colors">Base set colors</h2><p>The most frequently used colors throughout the site.</p></div>
        <div className="color-grid">{baseColors.map(({ name, variable, sampleType }) => <ColorSwatch key={variable} name={name} variable={variable} sampleType={sampleType} />)}</div>
      </section>
      <section className="type-group" aria-labelledby="color-token-values">
        <div className="type-group-heading"><span className="docs-eyebrow">Theme reference</span><h2 id="color-token-values">Color token values</h2><p>Token values for the light and dark themes.</p></div>
        <div className="token-table color-token-table"><Table stickyFirstColumn><colgroup><col /><col /><col /><col /></colgroup><thead><tr><th>Token</th><th>Light</th><th>Dark</th><th>Sample</th></tr></thead><tbody>
          {colorTokens.map(({ token, light, dark, sampleType }) => <tr key={token}><td><code>{token}</code></td><td><code>{light}</code></td><td><code>{dark}</code></td><td><ColorSample token={token} type={sampleType} /></td></tr>)}
        </tbody></Table></div>
      </section>
      <section className="type-group" aria-labelledby="state-colors">
        <div className="type-group-heading"><span className="docs-eyebrow">Interaction</span><h2 id="state-colors">State colors</h2><p>Hover and active states use fully opaque relative OKLCH values, preserving base hue and chroma while adjusting lightness.</p></div>
        <div className="state-color-demo" aria-label="State color button examples">
          <button className="state-color-button" type="button">Neutral button</button>
          <button className="state-color-button state-color-button--accent" type="button">Accent button</button>
        </div>
        <div className="token-table color-token-table"><Table stickyFirstColumn><colgroup><col /><col /><col /><col /></colgroup><thead><tr><th>Token</th><th>Light</th><th>Dark</th><th>Sample</th></tr></thead><tbody>
          {stateColors.map(({ token, light, dark, sampleType }) => <tr key={token}><td><code>{token}</code></td><td><code>{light}</code></td><td><code>{dark}</code></td><td><ColorSample token={token} type={sampleType} /></td></tr>)}
        </tbody></Table></div>
      </section>
    </>
  );
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
