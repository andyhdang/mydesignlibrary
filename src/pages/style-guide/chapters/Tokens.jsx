import Table from "../../../components/table/Table";
import formatTokenName from "../formatTokenName";

const tokenGroups = [
  {
    title: "Color foundations",
    description: "Core foreground, background, border, and accent colors shared across themes.",
    tokens: [
      ["--fg", "Primary foreground color"],
      ["--fg-muted", "Muted foreground color"],
      ["--bg", "Page background color"],
      ["--bg-surface", "Surface background color"],
      ["--fg-inverse", "Foreground color for inverse surfaces"],
      ["--bg-inverse", "Inverse background color"],
      ["--border", "Standard border color"],
      ["--bg-code", "Code background color"],
      ["--fg-accent", "Primary accent foreground color"],
      ["--bg-accent", "Primary accent background color"],
      ["--bg-surface-accent", "Accent surface background color"],
      ["--border-accent", "Accent border color"],
    ],
  },
  {
    title: "Interaction states",
    description: "Button and control colors for default, hover, active, and selected states.",
    tokens: [
      ["--button-outline-fg", "Outline button foreground color"],
      ["--button-outline-bg", "Outline button background color"],
      ["--button-outline-border", "Outline button border color"],
      ["--button-outline-bg-hover", "Outline button hover background color"],
      ["--button-outline-fg-active", "Outline button active foreground color"],
      ["--button-outline-bg-active", "Outline button active background color"],
      ["--button-accent-fg", "Accent button foreground color"],
      ["--button-accent-bg", "Accent button background color"],
      ["--button-accent-bg-hover", "Accent button hover background color"],
      ["--button-accent-bg-active", "Accent button active background color"],
      ["--button-filled-fg", "Filled button foreground color"],
      ["--button-filled-bg", "Filled button background color"],
      ["--button-filled-bg-hover", "Filled button hover background color"],
      ["--button-filled-bg-active", "Filled button active background color"],
      ["--control-fg", "Control foreground color"],
      ["--control-bg", "Control background color"],
      ["--control-border", "Control border color"],
      ["--control-bg-hover", "Control hover background color"],
      ["--control-bg-active", "Control active background color"],
      ["--control-selected-fg", "Selected control foreground color"],
      ["--control-selected-border", "Selected control border color"],
    ],
  },
  {
    title: "Elevation",
    description: "Shadow used to separate floating surfaces from the page.",
    tokens: [
      ["--shadow", "Elevation shadow"],
    ],
  },
  {
    title: "Spacing",
    description: "Primitive and semantic values for layout rhythm, padding, and gaps.",
    tokens: [
      ["--space-base", "Responsive spacing base unit"],
      ["--space-01", "Quarter-base spacing"],
      ["--space-02", "Half-base spacing"],
      ["--space-03", "Three-quarter-base spacing"],
      ["--space-04", "Base spacing"],
      ["--space-05", "One-and-a-half-base spacing"],
      ["--space-06", "Double-base spacing"],
      ["--space-07", "Two-and-a-half-times-base spacing"],
      ["--space-08", "Triple-base spacing"],
      ["--space-09", "Three-and-a-half-times-base spacing"],
      ["--space-10", "Four-times-base spacing"],
      ["--space-11", "Four-and-a-half-times-base spacing"],
      ["--space-12", "Five-times-base spacing"],
      ["--space-13", "Six-times-base spacing"],
      ["--space-14", "Eight-times-base spacing"],
      ["--space-15", "Twelve-times-base spacing"],
      ["--space-inset-xs", "Extra-small equal inset"],
      ["--space-inset-s", "Small equal inset"],
      ["--space-inset-m", "Medium equal inset"],
      ["--space-inset-l", "Large equal inset"],
      ["--space-inset-xl", "Extra-large equal inset"],
      ["--space-inset-squish-xs", "Extra-small squished inset"],
      ["--space-inset-squish-s", "Small squished inset"],
      ["--space-inset-squish-m", "Medium squished inset"],
      ["--space-inset-squish-l", "Large squished inset"],
      ["--space-inset-squish-xl", "Extra-large squished inset"],
      ["--space-inset-stretch-xs", "Extra-small stretched inset"],
      ["--space-inset-stretch-s", "Small stretched inset"],
      ["--space-inset-stretch-m", "Medium stretched inset"],
      ["--space-inset-stretch-l", "Large stretched inset"],
      ["--space-inset-stretch-xl", "Extra-large stretched inset"],
      ["--space-inline-xs", "Extra-small inline gap"],
      ["--space-inline-s", "Small inline gap"],
      ["--space-inline-m", "Medium inline gap"],
      ["--space-inline-l", "Large inline gap"],
      ["--space-inline-xl", "Extra-large inline gap"],
      ["--space-stack-xs", "Extra-small stack gap"],
      ["--space-stack-s", "Small stack gap"],
      ["--space-stack-m", "Medium stack gap"],
      ["--space-stack-l", "Large stack gap"],
      ["--space-stack-xl", "Extra-large stack gap"],
    ],
  },
  {
    title: "Font families",
    description: "Type stacks for body copy, headings, and code.",
    tokens: [
      ["--font-sans", "Body font family"],
      ["--font-heading", "Heading font family"],
      ["--font-mono", "Code font family"],
    ],
  },
  {
    title: "Fluid font sizes",
    description: "Responsive type scale steps for body, title, subtitle, and display styles.",
    tokens: [
      ["--font-size-fluid-025", "Smallest fluid font size"],
      ["--font-size-fluid-050", "Fine print fluid font size"],
      ["--font-size-fluid-100", "Small fluid font size"],
      ["--font-size-fluid-200", "Extra-small fluid font size"],
      ["--font-size-fluid-300", "Base fluid font size"],
      ["--font-size-fluid-400", "Medium fluid font size"],
      ["--font-size-fluid-500", "Large fluid font size"],
      ["--font-size-fluid-600", "Extra-large fluid font size"],
      ["--font-size-fluid-700", "Display fluid font size"],
      ["--font-size-fluid-800", "Largest display fluid font size"],
    ],
  },
  {
    title: "Fixed font sizes",
    description: "Stable type scale steps for labels, controls, captions, and code.",
    tokens: [
      ["--font-size-fixed-025", "Smallest fixed font size"],
      ["--font-size-fixed-050", "Fine print fixed font size"],
      ["--font-size-fixed-100", "Small fixed font size"],
      ["--font-size-fixed-200", "Extra-small fixed font size"],
      ["--font-size-fixed-300", "Base fixed font size"],
      ["--font-size-fixed-400", "Medium fixed font size"],
      ["--font-size-fixed-500", "Large fixed font size"],
      ["--font-size-fixed-600", "Extra-large fixed font size"],
      ["--font-size-fixed-700", "Display fixed font size"],
      ["--font-size-fixed-800", "Largest display fixed font size"],
    ],
  },
  {
    title: "Line heights",
    description: "Line-height values for display, heading, label, subtitle, caption, and body text.",
    tokens: [
      ["--font-line-height-display", "Display line height"],
      ["--font-line-height-heading", "Heading line height"],
      ["--font-line-height-label", "Label line height"],
      ["--font-line-height-subtitle", "Subtitle line height"],
      ["--font-line-height-caption", "Caption line height"],
      ["--font-line-height-body", "Body line height"],
    ],
  },
  {
    title: "Font weights",
    description: "Weights used throughout the interface.",
    tokens: [
      ["--font-weight-light", "Light font weight"],
      ["--font-weight-regular", "Regular font weight"],
      ["--font-weight-medium", "Medium font weight"],
      ["--font-weight-bold", "Bold font weight"],
    ],
  },
  {
    title: "Font styles",
    description: "Composite font shorthands that combine family, weight, size, and line height.",
    tokens: [
      ["--font-body-small", "Small body text"],
      ["--font-body-medium", "Medium body text"],
      ["--font-body-large", "Large body text"],
      ["--font-title-small", "Small title text"],
      ["--font-title-medium", "Medium title text"],
      ["--font-title-large", "Large title text"],
      ["--font-caption", "Caption text"],
      ["--font-subtitle", "Subtitle text"],
      ["--font-display", "Display text"],
      ["--font-code-block", "Code block text"],
      ["--font-label-small", "Small label text"],
      ["--font-label-medium", "Medium label text"],
      ["--font-label-large", "Large label text"],
      ["--font-label-eyebrow", "Eyebrow label text"],
    ],
  },
];

export default function Tokens() {
  return (
    <>
      {tokenGroups.map(({ title, description, tokens }) => (
        <section className="type-group" key={title}>
          <div className="section-header">
            <h2 className="section-title">{title}</h2>
            <p>{description}</p>
          </div>
          <div className="token-table">
            <Table>
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                {tokens.map(([token, purpose]) => (
                  <tr key={token}>
                    <td><code>{formatTokenName(token)}</code></td>
                    <td>{purpose}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </section>
      ))}
    </>
  );
}
