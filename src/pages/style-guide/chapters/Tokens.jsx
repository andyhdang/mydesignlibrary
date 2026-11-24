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
      ["--border-muted", "Muted border color"],
      ["--bg-code", "Code background color"],
      ["--fg-accent", "Primary accent foreground color"],
      ["--bg-accent", "Primary accent background color"],
      ["--bg-surface-accent", "Accent surface background color"],
      ["--border-accent", "Accent border color"],
      ["--fg-annotation", "Annotation foreground color"],
      ["--bg-annotation", "Annotation background color"],
      ["--bg-surface-annotation", "Annotation surface background color"],
      ["--border-annotation", "Annotation border color"],
      ["--fg-note", "Personal note foreground color"],
      ["--fg-on-note", "Foreground color on the personal note background"],
      ["--bg-note", "Personal note background color"],
      ["--bg-surface-note", "Personal note surface background color"],
      ["--border-note", "Personal note border color"],
    ],
  },
  {
    title: "Interaction states",
    description: "Hover, pressed, and selected colors for interactive elements.",
    tokens: [
      ["--bg-hover", "Hover background color"],
      ["--bg-pressed", "Pressed background color"],
      ["--fg-pressed", "Pressed foreground color"],
      ["--bg-inverse-hover", "Inverse hover background color"],
      ["--bg-inverse-pressed", "Inverse pressed background color"],
      ["--bg-accent-hover", "Accent hover background color"],
      ["--bg-accent-pressed", "Accent pressed background color"],
      ["--fg-selected", "Selected foreground color"],
      ["--border-selected", "Selected border color"],
    ],
  },
  {
    title: "Radii",
    description: "Subtle corner radii for surfaces, controls, and inline elements.",
    tokens: [
      ["--radius-s", "Small corner radius"],
      ["--radius-m", "Medium corner radius"],
      ["--radius-l", "Large corner radius"],
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
    description: "Type stacks for sans-serif text and code.",
    tokens: [
      ["--font-family-sans", "Sans-serif font family"],
      ["--font-family-mono", "Code font family"],
    ],
  },
  {
    title: "Font sizes",
    description: "An iterative second-major scale based on 16px, rounded to even pixels below the base and 4px increments above it.",
    tokens: [
      ["--font-size-000", "Three steps below the base"],
      ["--font-size-025", "Two steps below the base"],
      ["--font-size-050", "One step below the base"],
      ["--font-size-100", "Base font size"],
      ["--font-size-200", "One step above the base"],
      ["--font-size-300", "Two steps above the base"],
      ["--font-size-400", "Three steps above the base"],
      ["--font-size-500", "Four steps above the base"],
      ["--font-size-600", "Five steps above the base"],
      ["--font-size-700", "Six steps above the base"],
      ["--font-size-800", "Seven steps above the base"],
      ["--font-size-900", "Eight steps above the base"],
      ["--font-size-1000", "Nine steps above the base"],
      ["--font-size-1100", "Ten steps above the base"],
    ],
  },
  {
    title: "Line heights",
    description: "Line-height values for display, title, subtitle, body, label, and supporting text.",
    tokens: [
      ["--font-line-height-display", "Display line height"],
      ["--font-line-height-title", "Title line height"],
      ["--font-line-height-subtitle", "Subtitle line height"],
      ["--font-line-height-body", "Body line height"],
      ["--font-line-height-label", "Label line height"],
      ["--font-line-height-supporting", "Supporting line height"],
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
      ["--font-supporting", "Supporting text"],
      ["--font-subtitle", "Subtitle text"],
      ["--font-display", "Display text"],
      ["--font-code-block", "Code block text"],
      ["--font-label-small", "Small label text"],
      ["--font-label-medium", "Medium label text"],
      ["--font-label-large", "Large label text"],
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
