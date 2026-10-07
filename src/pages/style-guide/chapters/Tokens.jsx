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
    title: "Font families",
    description: "Type stacks for body copy, headings, and code.",
    tokens: [
      ["--font-sans", "Body font family"],
      ["--font-heading", "Heading font family"],
      ["--font-mono", "Code font family"],
    ],
  },
  {
    title: "Font sizes",
    description: "Fluid type scale steps that adapt across viewport sizes.",
    tokens: [
      ["--font-size-100", "Smallest font size"],
      ["--font-size-200", "Extra-small font size"],
      ["--font-size-300", "Base font size"],
      ["--font-size-400", "Medium font size"],
      ["--font-size-500", "Large font size"],
      ["--font-size-600", "Extra-large font size"],
      ["--font-size-700", "Display font size"],
      ["--font-size-800", "Largest display font size"],
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
