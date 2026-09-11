import Table from "../../../components/table/Table";

const colorTokens = [
  { token: "--text", light: "oklch(51.35% 0.0296 305.45)", lightSample: "oklch(51.35% 0.0296 305.45)", dark: "oklch(71.37% 0.0192 261.32)", darkSample: "oklch(71.37% 0.0192 261.32)" },
  { token: "--bg", light: "oklch(100% 0 0)", lightSample: "oklch(100% 0 0)", dark: "oklch(20.63% 0.012 277.83)", darkSample: "oklch(20.63% 0.012 277.83)" },
  { token: "--border", light: "oklch(92.05% 0.0042 301.42)", lightSample: "oklch(92.05% 0.0042 301.42)", dark: "oklch(31.13% 0.0181 276.38)", darkSample: "oklch(31.13% 0.0181 276.38)" },
  { token: "--code-bg", light: "oklch(96.3% 0.0093 99.98)", lightSample: "oklch(96.3% 0.0093 99.98)", dark: "oklch(24.6% 0.0152 279.6)", darkSample: "oklch(24.6% 0.0152 279.6)" },
  { token: "--accent", light: "oklch(60.81% 0.269 305.12)", lightSample: "oklch(60.81% 0.269 305.12)", dark: "oklch(72.17% 0.1767 305.5)", darkSample: "oklch(72.17% 0.1767 305.5)" },
  { token: "--accent-bg", light: "oklch(from var(--accent) l c h / 0.1)", lightSample: "oklch(60.81% 0.269 305.12 / 0.1)", dark: "oklch(from var(--accent) l c h / 0.15)", darkSample: "oklch(72.17% 0.1767 305.5 / 0.15)" },
  { token: "--accent-border", light: "oklch(from var(--accent) l c h / 0.5)", lightSample: "oklch(60.81% 0.269 305.12 / 0.5)", dark: "oklch(from var(--accent) l c h / 0.5)", darkSample: "oklch(72.17% 0.1767 305.5 / 0.5)" },
];

export default function Colors() {
  return (
    <>
      <section className="type-group" aria-labelledby="base-set-colors">
        <div className="type-group-heading"><span className="docs-eyebrow">Core palette</span><h2 id="base-set-colors">Base set colors</h2><p>The most frequently used colors throughout the site.</p></div>
        <div className="color-grid">{[
          ["Background", "--bg"], ["Text", "--text"], ["Border", "--border"], ["Code background", "--code-bg"], ["Accent", "--accent"], ["Accent background", "--accent-bg"], ["Accent border", "--accent-border"],
        ].map(([name, variable]) => <ColorSwatch key={variable} name={name} variable={variable} />)}</div>
      </section>
      <section className="type-group" aria-labelledby="color-token-values">
        <div className="type-group-heading"><span className="docs-eyebrow">Theme reference</span><h2 id="color-token-values">Color token values</h2><p>Token values for the light and dark themes.</p></div>
        <div className="token-table color-token-table"><Table><colgroup><col /><col /><col /></colgroup><thead><tr><th>Token</th><th>Light</th><th>Dark</th></tr></thead><tbody>
          {colorTokens.map(({ token, light, lightSample, dark, darkSample }) => <tr key={token}><td><code>{token}</code></td><td><ColorValue value={light} sample={lightSample} label={`Light ${token} color sample`} /></td><td><ColorValue value={dark} sample={darkSample} label={`Dark ${token} color sample`} /></td></tr>)}
        </tbody></Table></div>
      </section>
    </>
  );
}

function ColorSwatch({ name, variable }) {
  return <div className="color-card"><div className="color-swatch" style={{ backgroundColor: `var(${variable})` }} /><div><strong>{name}</strong><code>{variable}</code></div></div>;
}

function ColorValue({ value, sample, label }) {
  return <div className="color-value"><span className="color-token-sample" style={{ backgroundColor: sample }} aria-label={label} /><code>{value}</code></div>;
}
