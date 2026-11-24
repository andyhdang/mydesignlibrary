import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { InformationCircleIcon, PhotoIcon } from "@heroicons/react/24/outline";
import Table from "../../../components/table/Table";
import formatTokenName from "../formatTokenName";

const fontShorthands = [
  { name: "Body small", token: "--font-body-small", value: ["var(--font-weight-regular)", "var(--font-size-fluid-100)", "/ var(--font-line-height-body)", "var(--font-family-sans)"], sample: "Reading copy" },
  { name: "Body medium", token: "--font-body-medium", value: ["var(--font-weight-regular)", "var(--font-size-fluid-200)", "/ var(--font-line-height-body)", "var(--font-family-sans)"], sample: "Reading copy" },
  { name: "Body large", token: "--font-body-large", value: ["var(--font-weight-regular)", "var(--font-size-fluid-300)", "/ var(--font-line-height-body)", "var(--font-family-sans)"], sample: "Reading copy" },
  { name: "Title small", token: "--font-title-small", value: ["var(--font-weight-medium)", "var(--font-size-fluid-300)", "/ var(--font-line-height-title)", "var(--font-family-sans)"], sample: "Section title" },
  { name: "Title medium", token: "--font-title-medium", value: ["var(--font-weight-medium)", "var(--font-size-fluid-400)", "/ var(--font-line-height-title)", "var(--font-family-sans)"], sample: "Section title" },
  { name: "Title large", token: "--font-title-large", value: ["var(--font-weight-medium)", "var(--font-size-fluid-600)", "/ var(--font-line-height-title)", "var(--font-family-sans)"], sample: "Page title" },
  { name: "Caption", token: "--font-caption", value: ["var(--font-weight-regular)", "var(--font-size-050)", "/ var(--font-line-height-caption)", "var(--font-family-sans)"], sample: "Supporting detail" },
  { name: "Subtitle", token: "--font-subtitle", value: ["var(--font-weight-regular)", "var(--font-size-fluid-200)", "/ var(--font-line-height-subtitle)", "var(--font-family-sans)"], sample: "Supporting copy" },
  { name: "Display", token: "--font-display", value: ["var(--font-weight-medium)", "var(--font-size-fluid-700)", "/ var(--font-line-height-display)", "var(--font-family-sans)"], sample: "Make impact" },
  { name: "Code block", token: "--font-code-block", value: ["var(--font-weight-regular)", "var(--font-size-200)", "/ var(--font-line-height-body)", "var(--font-family-mono)"], sample: "npm run dev" },
  { name: "Label small", token: "--font-label-small", value: ["var(--font-weight-medium)", "var(--font-size-050)", "/ var(--font-line-height-label)", "var(--font-family-sans)"], sample: "Status" },
  { name: "Label medium", token: "--font-label-medium", value: ["var(--font-weight-medium)", "var(--font-size-100)", "/ var(--font-line-height-label)", "var(--font-family-sans)"], sample: "Status" },
  { name: "Label large", token: "--font-label-large", value: ["var(--font-weight-medium)", "var(--font-size-200)", "/ var(--font-line-height-label)", "var(--font-family-sans)"], sample: "Status" },
  { name: "Eyebrow", token: "--font-eyebrow", value: ["var(--font-weight-regular)", "var(--font-size-050)", "/ var(--font-line-height-label)", "var(--font-family-mono)"], sample: "Foundation" },
];

const fontNomenclature = [
  {
    name: "Eyebrow",
    description: "A short contextual phrase placed above a heading to signal category or sequence.",
  },
  {
    name: "Display",
    description: "Oversized, expressive text reserved for a short, high-impact message.",
  },
  {
    name: "Subtitle",
    description: "Supporting copy paired with a title to add context or clarify its meaning.",
  },
  {
    name: "Caption",
    description: "Concise supporting information attached to media, data, or another element.",
  },
  {
    name: "Title",
    description: "A heading that names a page, section, or distinct content block.",
  },
  {
    name: "Body",
    description: "Reading text used for sentences, paragraphs, and general content.",
  },
  {
    name: "Label",
    description: "Compact text used inside controls and interactive interface elements.",
  },
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

const fixedFontSizeSteps = [
  { name: "000", token: "--font-size-000", pixels: 10 },
  { name: "025", token: "--font-size-025", pixels: 12 },
  { name: "050", token: "--font-size-050", pixels: 14 },
  { name: "100", token: "--font-size-100", pixels: 16 },
  { name: "200", token: "--font-size-200", pixels: 18 },
  { name: "300", token: "--font-size-300", pixels: 20 },
  { name: "400", token: "--font-size-400", pixels: 22 },
  { name: "500", token: "--font-size-500", pixels: 26 },
  { name: "600", token: "--font-size-600", pixels: 28 },
  { name: "700", token: "--font-size-700", pixels: 32 },
  { name: "800", token: "--font-size-800", pixels: 36 },
  { name: "900", token: "--font-size-900", pixels: 40 },
  { name: "1000", token: "--font-size-1000", pixels: 42 },
  { name: "1100", token: "--font-size-1100", pixels: 46 },
];

const viewportScales = [
  { id: "compact", label: "Mobile / tablet", basePixels: 14, maximumBasePixels: 16, minimumViewport: 768, maximumViewport: 1024 },
  { id: "desktop", label: "Desktop", basePixels: 16, maximumBasePixels: 18, minimumViewport: 1024, maximumViewport: 1536, cappedReadingSizes: [12, 14, 16, 18, 20] },
  { id: "wide", label: "Wide desktop", basePixels: 18, maximumBasePixels: 20, minimumViewport: 1536, maximumViewport: 1920, cappedReadingSizes: [12, 14, 16, 18, 20] },
];

function formatRem(pixels) {
  return `${Number((pixels / 16).toFixed(4))}rem`;
}

function getFixedFontSizeToken(pixels) {
  const fixedSize = fixedFontSizeSteps.find((step) => step.pixels === pixels);

  if (!fixedSize) {
    throw new Error(`Missing fixed font size token for ${pixels}px.`);
  }

  return `var(${fixedSize.token})`;
}

function getFluidValue(minimum, maximum, minimumViewport, maximumViewport) {
  if (minimum === maximum) {
    return getFixedFontSizeToken(minimum);
  }

  const viewportCoefficient = ((maximum - minimum) / (maximumViewport - minimumViewport)) * 100;
  const intercept = minimum - (viewportCoefficient / 100) * minimumViewport;

  return `clamp(${getFixedFontSizeToken(minimum)}, ${formatRem(intercept)} + ${Number(viewportCoefficient.toFixed(6))}vw, ${getFixedFontSizeToken(maximum)})`;
}

const lineHeights = [
  { name: "Display", token: "--font-line-height-display", value: "1.1", font: "--font-display", description: ["Use for oversized", "display text."] },
  { name: "Title", token: "--font-line-height-title", value: "1.25", font: "--font-title-medium", description: ["Use for multi-line", "titles."] },
  { name: "Subtitle", token: "--font-line-height-subtitle", value: "1.25", font: "--font-subtitle", description: ["Use for supporting", "title copy."] },
  { name: "Body", token: "--font-line-height-body", value: "1.5", font: "--font-body-medium", description: ["Use for readable", "body text."] },
  { name: "Label", token: "--font-line-height-label", value: "1.2", font: "--font-label-medium", description: ["Use for compact", "UI labels."] },
  { name: "Caption", token: "--font-line-height-caption", value: "1.4", font: "--font-caption", description: ["Use for concise", "captions."] },
];

const fontWeights = [
  { name: "Light", token: "--font-weight-light", value: "300" },
  { name: "Regular", token: "--font-weight-regular", value: "400" },
  { name: "Medium", token: "--font-weight-medium", value: "500" },
  { name: "Bold", token: "--font-weight-bold", value: "700" },
];

export default function Typography() {
  const [selectedScaleId, setSelectedScaleId] = useState("compact");
  const [selectedNomenclature, setSelectedNomenclature] = useState(null);
  const selectedScale = viewportScales.find(({ id }) => id === selectedScaleId);
  const mockHighlightClass = (name) => `font-nomenclature__mock-highlight${selectedNomenclature === name ? " is-highlighted" : ""}`;
  const nomenclatureTrigger = (name, placement = "start") => (
    <NomenclaturePopover
      name={name}
      placement={placement}
      isOpen={selectedNomenclature === name}
      onToggle={() => setSelectedNomenclature((current) => current === name ? null : name)}
    />
  );
  const fontSizes = fontSizeSteps.map(({ token, multiplier }, index) => {
    const cappedReadingSize = selectedScale.cappedReadingSizes?.[index];
    const pixels = cappedReadingSize ?? Math.round((selectedScale.basePixels * multiplier) / 2) * 2;
    const maximumPixels = cappedReadingSize ?? Math.round((selectedScale.maximumBasePixels * multiplier) / 2) * 2;

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
  const fixedFontSizes = fixedFontSizeSteps.map(({ name, token, pixels }) => ({
    name,
    token,
    value: formatRem(pixels),
    pixels: `${pixels}px`,
  }));

  useEffect(() => {
    if (!selectedNomenclature) {
      return undefined;
    }

    const closeOnPointerDown = (event) => {
      if (event.target instanceof Element && !event.target.closest(".font-nomenclature__annotation")) {
        setSelectedNomenclature(null);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") {
        setSelectedNomenclature(null);
      }
    };

    document.addEventListener("pointerdown", closeOnPointerDown);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnPointerDown);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [selectedNomenclature]);

  return (
    <div className="typography-chapter" style={previewStyle}>
      <TypographyIntroVisual />
      <section className="type-group" aria-labelledby="font-families">
        <div className="section-header"><h2 id="font-families" className="section-title">Font family</h2><p>Use the sans-serif stack for interface and editorial text, and the monospace stack for code.</p></div>
        <div className="token-table"><Table stickyFirstColumn><thead><tr><th>Use</th><th>Token</th><th>Font stack</th><th>Preview</th></tr></thead><tbody>
          <FontFamily label="Sans" token="--font-family-sans" stack={'"Figtree", system-ui, sans-serif'} className="font-sans" sample="The quick brown fox jumps over the lazy dog." />
          <FontFamily label="Code" token="--font-family-mono" stack="ui-monospace, Consolas, monospace" className="font-mono" sample="const foundation = true;" />
        </tbody></Table></div>
      </section>
      <section className="type-group" aria-labelledby="font-shorthands">
        <div className="section-header"><h2 id="font-shorthands" className="section-title">Font shorthands</h2><p>Each token combines family, weight, size, and line height into a reusable font style.</p></div>
        <div className="font-nomenclature">
          <article className="font-nomenclature__mock-design" aria-label="Typography styles in context">
            <header>
              <p className="font-nomenclature__mock-eyebrow"><span className={mockHighlightClass("Eyebrow")}>Court notes / 04</span>{nomenclatureTrigger("Eyebrow")}</p>
              <h3 className="font-nomenclature__mock-display"><span className={mockHighlightClass("Display")}>Dink responsibly</span>{nomenclatureTrigger("Display")}</h3>
              <p className="font-nomenclature__mock-subtitle"><span className={mockHighlightClass("Subtitle")}>A very serious guide to tiny paddles, kitchen drama, and one-more-game energy.</span>{nomenclatureTrigger("Subtitle", "end")}</p>
            </header>
            <div className="font-nomenclature__mock-content">
              <figure>
                <div className="font-nomenclature__mock-visual" role="img" aria-label="Media placeholder"><PhotoIcon aria-hidden="true" /></div>
                <figcaption className="font-nomenclature__mock-caption"><span className={mockHighlightClass("Caption")}>The kitchen: where patience wins points and volleys lose friends.</span>{nomenclatureTrigger("Caption", "end")}</figcaption>
              </figure>
              <div>
                <h4 className="font-nomenclature__mock-title"><span className={mockHighlightClass("Title")}>Own the kitchen</span>{nomenclatureTrigger("Title")}</h4>
                <p className="font-nomenclature__mock-body"><span className={mockHighlightClass("Body")}>Keep your paddle up, your dinks low, and your victory dance ready. The softest shot can cause the loudest celebration.</span>{nomenclatureTrigger("Body", "end")}</p>
                <div className="font-nomenclature__mock-action">
                  <button className="font-nomenclature__mock-label" type="button"><span className={mockHighlightClass("Label")}>Join the rally</span></button>
                  {nomenclatureTrigger("Label")}
                </div>
              </div>
            </div>
          </article>
        </div>
        <div className="font-shorthand-table"><Table stickyFirstColumn><thead><tr><th>Style</th><th>Token</th><th>Font shorthand</th><th>Preview</th></tr></thead><tbody>
          {fontShorthands.map(({ name, token, value, sample }) => <tr key={token}><td>{name}</td><td><code>{formatTokenName(token)}</code></td><td><div className="font-shorthand-value">{value.map((part) => <code key={part}>{part}</code>)}</div></td><td><span className="font-shorthand-sample" style={{ font: `var(${token})` }}>{sample}</span></td></tr>)}
        </tbody></Table></div>
      </section>
      <section className="type-group" aria-labelledby="fixed-font-sizes">
        <div className="section-header"><h2 id="fixed-font-sizes" className="section-title">Font sizes</h2><p>These values anchor the fluid scale and support compact interface text such as buttons, pills, inputs, navigation, captions, and code. They use a 16px base and do not change with the viewport.</p></div>
        <div className="font-size-table"><Table stickyFirstColumn><thead><tr><th>Step</th><th>Token</th><th>Value</th><th>Pixels</th><th>Preview</th></tr></thead><tbody>
          {fixedFontSizes.map(({ name, token, value, pixels }) => <tr key={token}><td>{name}</td><td><code>{formatTokenName(token)}</code></td><td><code>{value}</code></td><td><code>{pixels}</code></td><td><span className="font-size-sample" style={{ fontSize: `var(${token})` }}>The quick brown fox</span></td></tr>)}
        </tbody></Table></div>
      </section>
      <section className="type-group" aria-labelledby="type-scale">
        <div className="section-header"><h2 id="type-scale" className="section-title">Fluid font sizes</h2><p>The compact scale follows a 1.125 second-major ratio. Reading sizes reach their caps at 1024px, while title and display sizes continue to respond on larger screens.</p></div>
        <FontSizeMultiplierCurve />
        <p className="font-size-viewport-preview">
          Previewing the <span className="font-size-dynamic-value">{selectedScale.label.toLowerCase()}</span> scale.
        </p>
        <div className="font-size-viewport-toggle" role="group" aria-label="Font size viewport preview">
          {viewportScales.map(({ id, label }) => (
            <button
              className={id === selectedScaleId ? "is-active" : undefined}
              type="button"
              key={id}
              aria-pressed={id === selectedScaleId}
              onClick={() => setSelectedScaleId(id)}
            >
              {label}
            </button>
          ))}
        </div>
        <FontSizeCurve fontSizes={fontSizes} />
        <div className="font-size-table"><Table stickyFirstColumn><thead><tr><th>Step</th><th>Token</th><th>Value</th><th>Pixels</th><th>Preview</th></tr></thead><tbody>
          {fontSizes.map(({ name, token, value, pixels }) => <tr key={token}><td>{name}</td><td><code>{formatTokenName(token)}</code></td><td><code className="font-size-dynamic-value">{value}</code></td><td><code className="font-size-dynamic-value">{pixels}</code></td><td><span className="font-size-sample" style={{ fontSize: `var(${token})` }}>The quick brown fox</span></td></tr>)}
        </tbody></Table></div>
        <div className="font-size-clamp-explanation">
          <h3>How the clamp is calculated</h3>
          <p>Example: scale from 14px to 16px as the viewport grows from 768px to 1024px.</p>
          <code className="font-size-clamp-formula">vw coefficient = (16 − 14) ÷ (1024 − 768) × 100 = 0.78125vw</code>
          <code className="font-size-clamp-formula">intercept = 14 − (0.0078125 × 768) = 8px = 0.5rem</code>
          <code className="font-size-clamp-formula">clamp(var(--font-size-050), 0.5rem + 0.78125vw, var(--font-size-100))</code>
          <p>The middle value equals 14px at 768px and 16px at 1024px. The fixed tokens keep the result within that range and provide a single source of truth for each endpoint.</p>
        </div>
      </section>
      <section className="type-group" aria-labelledby="line-heights">
        <div className="section-header"><h2 id="line-heights" className="section-title">Line heights</h2><p>Unitless values preserve the intended rhythm as text sizes respond to the viewport.</p></div>
        <div className="token-table"><Table stickyFirstColumn><thead><tr><th>Use</th><th>Token</th><th>Value</th><th>Preview</th></tr></thead><tbody>
          {lineHeights.map(({ name, token, value, font, description }) => <tr key={token}><td>{name}</td><td><code>{formatTokenName(token)}</code></td><td><code>{value}</code></td><td><span className="token-sample" style={{ font: `var(${font})` }}>{description[0]}<br />{description[1]}</span></td></tr>)}
        </tbody></Table></div>
      </section>
      <section className="type-group" aria-labelledby="font-weights">
        <div className="section-header"><h2 id="font-weights" className="section-title">Font weights</h2><p>Figtree is a variable font with a supported range from 300 to 900. These are the weights used across the interface.</p></div>
        <div className="token-table"><Table stickyFirstColumn><thead><tr><th>Weight</th><th>Token</th><th>Value</th><th>Preview</th></tr></thead><tbody>
          {fontWeights.map(({ name, token, value }) => <tr key={token}><td>{name}</td><td><code>{formatTokenName(token)}</code></td><td><code>{value}</code></td><td><span className="token-sample" style={{ fontWeight: `var(${token})` }}>The quick brown fox</span></td></tr>)}
        </tbody></Table></div>
      </section>
    </div>
  );
}

function NomenclaturePopover({ name, placement, isOpen, onToggle }) {
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);
  const description = fontNomenclature.find((item) => item.name === name)?.description;
  const popoverId = `font-nomenclature-${name.toLowerCase()}-popover`;
  const titleId = `${popoverId}-title`;

  useLayoutEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const positionPopover = () => {
      const trigger = triggerRef.current;
      const popover = popoverRef.current;

      if (!trigger || !popover) {
        return;
      }

      const viewportInset = 12;
      const gap = 8;
      const triggerBounds = trigger.getBoundingClientRect();
      const popoverBounds = popover.getBoundingClientRect();
      const preferredLeft = placement === "end"
        ? triggerBounds.right - popoverBounds.width
        : triggerBounds.left;
      const left = Math.min(
        Math.max(preferredLeft, viewportInset),
        window.innerWidth - popoverBounds.width - viewportInset,
      );
      const spaceBelow = window.innerHeight - triggerBounds.bottom - gap - viewportInset;
      const top = spaceBelow >= popoverBounds.height
        ? triggerBounds.bottom + gap
        : Math.max(viewportInset, triggerBounds.top - popoverBounds.height - gap);

      popover.style.left = `${left}px`;
      popover.style.top = `${top}px`;
      popover.style.visibility = "visible";
    };

    positionPopover();
    window.addEventListener("resize", positionPopover);
    window.addEventListener("scroll", positionPopover, true);
    return () => {
      window.removeEventListener("resize", positionPopover);
      window.removeEventListener("scroll", positionPopover, true);
    };
  }, [isOpen, placement]);

  return (
    <span className={`font-nomenclature__annotation font-nomenclature__annotation--${placement}`}>
      <button
        ref={triggerRef}
        className="font-nomenclature__trigger"
        type="button"
        aria-label={`About ${name} typography`}
        aria-expanded={isOpen}
        aria-controls={popoverId}
        onClick={onToggle}
      >
        <InformationCircleIcon aria-hidden="true" />
      </button>
      {isOpen && (
        <span ref={popoverRef} id={popoverId} className="font-nomenclature__popover" role="dialog" aria-labelledby={titleId}>
          <strong id={titleId}>{name}</strong>
          <span>{description}</span>
        </span>
      )}
    </span>
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
      <figcaption>Second-major multipliers define the compact scale before reading sizes reach their caps.</figcaption>
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
