import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon } from "@heroicons/react/24/outline";
import PersonalNote from "../../../components/personal-note/PersonalNote";
import Table from "../../../components/table/Table";
import formatTokenName from "../formatTokenName";

const colorTokens = [
  { token: "--fg", light: "oklch(51.35% 0.0296 305.45)", dark: "oklch(71.37% 0.0192 261.32)", sampleType: "text" },
  { token: "--fg-muted", light: "oklch(from var(--fg) calc(l + 0.2) c h)", dark: "oklch(from var(--fg) calc(l - 0.2) c h)", sampleType: "text" },
  { token: "--bg", light: "oklch(100% 0 0)", dark: "oklch(20.63% 0.012 277.83)", sampleType: "fill" },
  { token: "--bg-surface", light: "oklch(from var(--bg) calc(l - 0.01) c h)", dark: "oklch(from var(--bg) calc(l + 0.02) c h)", sampleType: "fill" },
  { token: "--fg-inverse", light: "oklch(from var(--bg) calc(l - 0.04) c h)", dark: "oklch(from var(--bg) calc(l + 0.04) c h)", sampleType: "text" },
  { token: "--bg-inverse", light: "oklch(from var(--fg) calc(l - 0.1) c h)", dark: "oklch(from var(--fg) calc(l + 0.1) c h)", sampleType: "fill" },
  { token: "--border", light: "oklch(92.05% 0.0042 301.42)", dark: "oklch(31.13% 0.0181 276.38)", sampleType: "border" },
  { token: "--border-muted", light: "oklch(from var(--border) calc(l + 0.03) c h)", dark: "oklch(from var(--border) calc(l - 0.06) c h)", sampleType: "border" },
  { token: "--fg-accent", light: "oklch(50% 0.12 190)", dark: "oklch(72% 0.12 190)", sampleType: "text" },
  { token: "--bg-accent", light: "var(--fg-accent)", dark: "var(--fg-accent)", sampleType: "fill" },
  { token: "--bg-surface-accent", light: "oklch(from var(--fg-accent) l c h / 0.1)", dark: "oklch(from var(--fg-accent) l c h / 0.15)", sampleType: "fill" },
  { token: "--border-accent", light: "oklch(from var(--fg-accent) l c h / 0.5)", dark: "oklch(from var(--fg-accent) l c h / 0.5)", sampleType: "border" },
];

const baseColorPairs = [
  { name: "Default", foreground: "--fg", background: "--bg" },
  { name: "Muted", foreground: "--fg-muted", background: "--bg" },
  { name: "Surface", foreground: "--fg", background: "--bg-surface" },
  { name: "Inverse", foreground: "--fg-inverse", background: "--bg-inverse" },
  { name: "Accent", foreground: "--fg-inverse", background: "--bg-accent" },
  { name: "Accent surface", foreground: "--fg-accent", background: "--bg-surface-accent", border: "--border-accent" },
  { name: "Border", foreground: "--fg", background: "--bg", border: "--border" },
  { name: "Muted border", foreground: "--fg-muted", background: "--bg", border: "--border-muted" },
];

const documentationColorPairs = [
  { name: "Code", foreground: "--fg", background: "--bg-code" },
  { name: "Annotation", foreground: "--fg-inverse", background: "--bg-annotation" },
  { name: "Annotation surface", foreground: "--fg-annotation", background: "--bg-surface-annotation", border: "--border-annotation" },
  { name: "Note", foreground: "--fg-on-note", background: "--bg-note" },
  { name: "Note surface", foreground: "--fg-note", background: "--bg-surface-note", border: "--border-note" },
];

const documentationColorTokens = [
  { token: "--bg-code", light: "oklch(96.3% 0.0093 99.98)", dark: "oklch(24.6% 0.0152 279.6)", sampleType: "fill" },
  { token: "--fg-annotation", light: "oklch(65% 0.25 330)", dark: "oklch(65% 0.25 330)", sampleType: "text" },
  { token: "--bg-annotation", light: "var(--fg-annotation)", dark: "var(--fg-annotation)", sampleType: "fill" },
  { token: "--bg-surface-annotation", light: "oklch(from var(--fg-annotation) l c h / 0.3)", dark: "oklch(from var(--fg-annotation) l c h / 0.3)", sampleType: "fill" },
  { token: "--border-annotation", light: "var(--fg-annotation)", dark: "var(--fg-annotation)", sampleType: "border" },
  { token: "--fg-note", light: "oklch(42% 0.09 80)", dark: "oklch(88% 0.14 92)", sampleType: "text" },
  { token: "--fg-on-note", light: "oklch(25% 0.05 80)", dark: "oklch(25% 0.05 80)", sampleType: "text" },
  { token: "--bg-note", light: "oklch(86% 0.17 92)", dark: "oklch(86% 0.17 92)", sampleType: "fill" },
  { token: "--bg-surface-note", light: "oklch(from var(--bg-note) l c h / 0.3)", dark: "oklch(from var(--bg-note) l c h / 0.3)", sampleType: "fill" },
  { token: "--border-note", light: "oklch(60% 0.13 85)", dark: "oklch(75% 0.14 90)", sampleType: "border" },
];

const statePairs = [
  { name: "Hover", foreground: "--fg", background: "--bg-hover" },
  {
    name: "Pressed",
    foreground: "--fg-pressed",
    background: "--bg-pressed",
    note: {
      title: "Why \"pressed\" and not \"active\"?",
      body: "\"Active\" can also describe the current tab or nav item. \"Pressed\" names only the momentary feedback while an element is held down, which keeps it distinct from the persistent selected state.",
    },
  },
  { name: "Selected", foreground: "--fg-selected", background: "--bg", border: "--border-selected" },
  { name: "Inverse hover", foreground: "--fg-inverse", background: "--bg-inverse-hover" },
  { name: "Inverse pressed", foreground: "--fg-inverse", background: "--bg-inverse-pressed" },
  { name: "Accent hover", foreground: "--fg-inverse", background: "--bg-accent-hover" },
  { name: "Accent pressed", foreground: "--fg-inverse", background: "--bg-accent-pressed" },
];

const stateColorTokens = [
  { token: "--bg-hover", light: "oklch(from var(--bg) calc(l - 0.04) c h)", dark: "oklch(from var(--bg) calc(l + 0.04) c h)", sampleType: "fill" },
  { token: "--bg-pressed", light: "oklch(from var(--bg) calc(l - 0.08) c h)", dark: "oklch(from var(--bg) calc(l + 0.08) c h)", sampleType: "fill" },
  { token: "--fg-pressed", light: "oklch(from var(--fg) calc(l - 0.14) c h)", dark: "oklch(from var(--fg) calc(l + 0.14) c h)", sampleType: "text" },
  { token: "--bg-inverse-hover", light: "oklch(from var(--bg-inverse) calc(l + 0.06) c h)", dark: "oklch(from var(--bg-inverse) calc(l - 0.06) c h)", sampleType: "fill" },
  { token: "--bg-inverse-pressed", light: "oklch(from var(--bg-inverse) calc(l - 0.06) c h)", dark: "oklch(from var(--bg-inverse) calc(l - 0.12) c h)", sampleType: "fill" },
  { token: "--bg-accent-hover", light: "oklch(from var(--fg-accent) calc(l + 0.06) c h)", dark: "oklch(from var(--fg-accent) calc(l - 0.06) c h)", sampleType: "fill" },
  { token: "--bg-accent-pressed", light: "oklch(from var(--fg-accent) calc(l - 0.06) c h)", dark: "oklch(from var(--fg-accent) calc(l - 0.06) c h)", sampleType: "fill" },
  { token: "--fg-selected", light: "var(--fg-accent)", dark: "var(--fg-accent)", sampleType: "text" },
  { token: "--border-selected", light: "var(--fg-accent)", dark: "var(--fg-accent)", sampleType: "border" },
];

export default function Colors() {
  return (
    <>
      <ColorIntroVisual />
      <section className="type-group" aria-labelledby="base-set-colors">
        <div className="section-header"><h2 id="base-set-colors" className="section-title">Base set colors</h2><p>Foreground and background pairs used for most content across the site.</p></div>
        <div className="color-grid">{baseColorPairs.map((pair) => <ColorPair key={pair.name} {...pair} />)}</div>
        <div className="color-subsection">
        <div className="section-header"><h3>Base set color tokens</h3><p>Token values for the light and dark themes.</p></div>
        <div className="token-table color-token-table"><Table stickyFirstColumn><colgroup><col /><col /><col /><col /></colgroup><thead><tr><th>Token</th><th>Light</th><th>Dark</th><th>Sample</th></tr></thead><tbody>
          {colorTokens.map(({ token, light, dark, sampleType }) => <tr key={token}><td><code>{formatTokenName(token)}</code></td><td><code>{light}</code></td><td><code>{dark}</code></td><td><ColorSample token={token} type={sampleType} /></td></tr>)}
        </tbody></Table></div>
        </div>
      </section>
      <section className="type-group" aria-labelledby="state-colors">
        <div className="section-header"><h2 id="state-colors" className="section-title">State colors</h2><p>Hover and pressed states use fully opaque relative OKLCH values, preserving base hue and chroma while adjusting lightness.</p></div>
        <StateColorPreview />
        <div className="color-grid">{statePairs.map((pair) => <ColorPair key={pair.name} {...pair} />)}</div>
        <div className="color-subsection">
        <div className="section-header"><h3>State color tokens</h3><p>Token values for the light and dark themes.</p></div>
        <div className="token-table color-token-table"><Table stickyFirstColumn><colgroup><col /><col /><col /><col /></colgroup><thead><tr><th>Token</th><th>Light</th><th>Dark</th><th>Sample</th></tr></thead><tbody>
          {stateColorTokens.map(({ token, light, dark, sampleType }) => <tr key={token}><td><code>{formatTokenName(token)}</code></td><td><code>{light}</code></td><td><code>{dark}</code></td><td><ColorSample token={token} type={sampleType} /></td></tr>)}
        </tbody></Table></div>
        </div>
      </section>
      <section className="type-group" aria-labelledby="documentation-colors">
        <div className="section-header"><h2 id="documentation-colors" className="section-title">Documentation colors</h2><p>Colors reserved for presenting code and calling out annotations in the documentation.</p></div>
        <div className="color-grid">{documentationColorPairs.map((pair) => <ColorPair key={pair.name} {...pair} />)}</div>
        <div className="color-subsection">
        <div className="section-header"><h3>Documentation color tokens</h3><p>Token values for the light and dark themes.</p></div>
        <div className="token-table color-token-table"><Table stickyFirstColumn><colgroup><col /><col /><col /><col /></colgroup><thead><tr><th>Token</th><th>Light</th><th>Dark</th><th>Sample</th></tr></thead><tbody>
          {documentationColorTokens.map(({ token, light, dark, sampleType }) => <tr key={token}><td><code>{formatTokenName(token)}</code></td><td><code>{light}</code></td><td><code>{dark}</code></td><td><ColorSample token={token} type={sampleType} /></td></tr>)}
        </tbody></Table></div>
        </div>
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

function StateColorPreview() {
  const [selectedTab, setSelectedTab] = useState("Overview");
  const tabs = ["Overview", "Details", "Activity", "Settings"];

  return <div className="state-color-preview">
    <div className="state-color-preview__group">
      <h3 className="state-color-preview__label">Buttons</h3>
      <div className="state-color-preview__row">
        <button className="state-color-button state-color-button--outline" type="button">Outline button</button>
        <button className="state-color-button state-color-button--filled" type="button">Filled button</button>
        <button className="state-color-button state-color-button--accent" type="button">Accent button</button>
      </div>
      <div className="state-color-preview__row">
        <button className="state-color-button state-color-button--outline state-color-button--icon" type="button" aria-label="Outline icon button"><ChevronLeftIcon aria-hidden="true" /></button>
        <button className="state-color-button state-color-button--filled state-color-button--icon" type="button" aria-label="Filled icon button"><ChevronRightIcon aria-hidden="true" /></button>
        <button className="state-color-button state-color-button--accent state-color-button--icon" type="button" aria-label="Accent icon button"><PlusIcon aria-hidden="true" /></button>
      </div>
    </div>
    <div className="state-color-preview__group">
      <h3 className="state-color-preview__label">Pill tabs</h3>
      <div className="state-color-tabs" role="tablist" aria-label="Pill tab state examples">
        {tabs.map((tab) => <button key={tab} className="state-color-tab" type="button" role="tab" aria-selected={tab === selectedTab} onClick={() => setSelectedTab(tab)}>{tab}</button>)}
      </div>
    </div>
  </div>;
}

function ColorPair({ name, foreground, background, border, note }) {
  const style = { backgroundColor: `var(${background})`, color: `var(${foreground})`, ...(border && { borderColor: `var(${border})`, borderWidth: "2px" }) };

  return <article className="color-card"><div className="color-swatch" style={style} aria-hidden="true">Aa</div><div className="color-card__body"><h4>{name}{note && <PersonalNote title={note.title}>{note.body}</PersonalNote>}</h4><dl className="color-card__tokens">{[["Foreground", foreground], ["Background", background], ["Border", border]].filter(([, token]) => token).map(([role, token]) => <div key={role}><dt>{role}</dt><dd><code>{formatTokenName(token)}</code></dd></div>)}</dl></div></article>;
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
