import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import PersonalNote from "../../../components/personal-note/PersonalNote";
import Table from "../../../components/table/Table";
import formatTokenName from "../formatTokenName";

const aardvarkImage = `${import.meta.env.BASE_URL}images/aardvark.jpeg`;

const fontShorthands = [
  { name: "Body small", token: "--font-body-small", value: ["var(--font-weight-regular)", "clamp(var(--font-size-050), 0.5rem + 0.78125vw, var(--font-size-100))", "/ var(--font-line-height-body)", "var(--font-family-sans)"], fontSize: "14–16 px", sample: "Reading copy", note: { title: "Clamp for editorial copy", body: "Fluid sizing with clamp suits editorial copy: text scales smoothly between a minimum and maximum size, so long-form reading stays comfortable at any viewport without breakpoint jumps." } },
  { name: "Body medium", token: "--font-body-medium", value: ["var(--font-weight-regular)", "clamp(var(--font-size-100), 0.25rem + 1.5625vw, var(--font-size-200))", "/ var(--font-line-height-body)", "var(--font-family-sans)"], fontSize: "16–20 px", sample: "Reading copy" },
  { name: "Body large", token: "--font-body-large", value: ["var(--font-weight-regular)", "clamp(var(--font-size-200), 0.5rem + 1.5625vw, var(--font-size-300))", "/ var(--font-line-height-body)", "var(--font-family-sans)"], fontSize: "20–24 px", sample: "Reading copy" },
  { name: "Title small", token: "--font-title-small", value: ["var(--font-weight-medium)", "clamp(var(--font-size-200), 0.5rem + 1.5625vw, var(--font-size-300))", "/ var(--font-line-height-title)", "var(--font-family-sans)"], fontSize: "20–24 px", sample: "Section title" },
  { name: "Title medium", token: "--font-title-medium", value: ["var(--font-weight-medium)", "clamp(var(--font-size-300), 1.166667rem + 0.694444vw, var(--font-size-500))", "/ var(--font-line-height-title)", "var(--font-family-sans)"], fontSize: "24–32 px", sample: "Section title" },
  { name: "Title large", token: "--font-title-large", value: ["var(--font-weight-medium)", "clamp(var(--font-size-500), 1.5rem + 1.041667vw, var(--font-size-800))", "/ var(--font-line-height-title)", "var(--font-family-sans)"], fontSize: "32–44 px", sample: "Page title" },
  { name: "Supporting", token: "--font-supporting", value: ["var(--font-weight-regular)", "var(--font-size-050)", "/ var(--font-line-height-supporting)", "var(--font-family-sans)"], fontSize: "14 px", sample: "Helper text" },
  { name: "Subtitle", token: "--font-subtitle", value: ["var(--font-weight-regular)", "clamp(var(--font-size-100), 0.25rem + 1.5625vw, var(--font-size-200))", "/ var(--font-line-height-subtitle)", "var(--font-family-sans)"], fontSize: "16–20 px", sample: "Supporting copy" },
  { name: "Display", token: "--font-display", value: ["var(--font-weight-medium)", "clamp(var(--font-size-600), 1.75rem + 1.041667vw, var(--font-size-900))", "/ var(--font-line-height-display)", "var(--font-family-sans)"], fontSize: "36–48 px", sample: "Make impact" },
  { name: "Code block", token: "--font-code-block", value: ["var(--font-weight-regular)", "var(--font-size-100)", "/ var(--font-line-height-body)", "var(--font-family-mono)"], fontSize: "16 px", sample: "npm run dev" },
  { name: "Label small", token: "--font-label-small", value: ["var(--font-weight-medium)", "var(--font-size-050)", "/ var(--font-line-height-label)", "var(--font-family-sans)"], fontSize: "14 px", sample: "Status" },
  { name: "Label medium", token: "--font-label-medium", value: ["var(--font-weight-medium)", "var(--font-size-100)", "/ var(--font-line-height-label)", "var(--font-family-sans)"], fontSize: "16 px", sample: "Status" },
  { name: "Label large", token: "--font-label-large", value: ["var(--font-weight-medium)", "var(--font-size-200)", "/ var(--font-line-height-label)", "var(--font-family-sans)"], fontSize: "20 px", sample: "Status" },
];

const fontNomenclature = [
  {
    name: "Display",
    description: "Oversized, expressive text reserved for a short, high-impact message.",
  },
  {
    name: "Subtitle",
    description: "Supporting copy paired with a title to add context or clarify its meaning.",
  },
  {
    name: "Supporting",
    description: "Secondary information such as captions, helper text, and legal copy.",
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

const fixedFontSizeSteps = [
  { name: "000", token: "--font-size-000", pixels: 10 },
  { name: "025", token: "--font-size-025", pixels: 12 },
  { name: "050", token: "--font-size-050", pixels: 14 },
  { name: "100", token: "--font-size-100", pixels: 16 },
  { name: "200", token: "--font-size-200", pixels: 20 },
  { name: "300", token: "--font-size-300", pixels: 24 },
  { name: "400", token: "--font-size-400", pixels: 28 },
  { name: "500", token: "--font-size-500", pixels: 32 },
  { name: "600", token: "--font-size-600", pixels: 36 },
  { name: "700", token: "--font-size-700", pixels: 40 },
  { name: "800", token: "--font-size-800", pixels: 44 },
  { name: "900", token: "--font-size-900", pixels: 48 },
  { name: "1000", token: "--font-size-1000", pixels: 56 },
  { name: "1100", token: "--font-size-1100", pixels: 64 },
];

function formatRem(pixels) {
  return `${Number((pixels / 16).toFixed(4))}rem`;
}

const lineHeights = [
  { name: "Display", token: "--font-line-height-display", value: "1.1", font: "--font-display", description: ["Use for oversized", "display text."] },
  { name: "Title", token: "--font-line-height-title", value: "1.25", font: "--font-title-medium", description: ["Use for multi-line", "titles."] },
  { name: "Subtitle", token: "--font-line-height-subtitle", value: "1.25", font: "--font-subtitle", description: ["Use for supporting", "title copy."] },
  { name: "Body", token: "--font-line-height-body", value: "1.5", font: "--font-body-medium", description: ["Use for readable", "body text."] },
  { name: "Label", token: "--font-line-height-label", value: "1.2", font: "--font-label-medium", description: ["Use for compact", "UI labels."] },
  { name: "Supporting", token: "--font-line-height-supporting", value: "1.1", font: "--font-supporting", description: ["Use for captions, helper", "and legal text."] },
];

const fontWeights = [
  { name: "Light", token: "--font-weight-light", value: "300" },
  { name: "Regular", token: "--font-weight-regular", value: "400" },
  { name: "Medium", token: "--font-weight-medium", value: "500" },
  { name: "Bold", token: "--font-weight-bold", value: "700" },
];

export default function Typography() {
  const [selectedNomenclature, setSelectedNomenclature] = useState(null);
  const mockHighlightClass = (name) => `font-nomenclature__mock-highlight${selectedNomenclature === name ? " is-highlighted" : ""}`;
  const nomenclatureTrigger = (name, placement = "start") => (
    <NomenclaturePopover
      name={name}
      placement={placement}
      isOpen={selectedNomenclature === name}
      onToggle={() => setSelectedNomenclature((current) => current === name ? null : name)}
    />
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
    <div className="typography-chapter">
      <TypographyIntroVisual />
      <section className="type-group" aria-labelledby="font-families">
        <div className="section-header"><h2 id="font-families" className="section-title">Font family</h2><p>Use the sans-serif stack for interface and editorial text, and the monospace stack for code.</p></div>
        <div className="token-table"><Table stickyFirstColumn><thead><tr><th>Use</th><th>Token</th><th>Font stack</th><th>Preview</th></tr></thead><tbody>
          <FontFamily label="Sans" token="--font-family-sans" stack={'"Figtree", system-ui, sans-serif'} className="font-sans" sample="The quick brown fox jumps over the lazy dog." />
          <FontFamily label="Code" token="--font-family-mono" stack="ui-monospace, Consolas, monospace" className="font-mono" sample="const foundation = true;" />
        </tbody></Table></div>
      </section>
      <section className="type-group" aria-labelledby="font-roles">
        <div className="section-header"><h2 id="font-roles" className="section-title">Font roles</h2><p>Font roles give text a clear purpose within the interface. Use them consistently to establish hierarchy and help people understand the relationship between content and controls.</p></div>
        <div className="font-nomenclature">
          <article className="font-nomenclature__mock-design" aria-label="Typography styles in context">
            <header>
              <h3 className="font-nomenclature__mock-display"><span className={mockHighlightClass("Display")}>Dig a little deeper.</span>{nomenclatureTrigger("Display")}</h3>
              <p className="font-nomenclature__mock-subtitle"><span className={mockHighlightClass("Subtitle")}>Long ears. Strong claws. Serious appetite.</span>{nomenclatureTrigger("Subtitle", "end")}</p>
            </header>
            <div className="font-nomenclature__mock-content">
              <figure>
                <div className="font-nomenclature__mock-visual"><img src={aardvarkImage} alt="An aardvark walking across red soil" /></div>
                <figcaption className="font-nomenclature__mock-caption"><span className={mockHighlightClass("Supporting")}>Aardvarks can close their nostrils to keep out dust while digging.</span>{nomenclatureTrigger("Supporting", "end")}</figcaption>
              </figure>
              <div>
                <h4 className="font-nomenclature__mock-title"><span className={mockHighlightClass("Title")}>Built for the night</span>{nomenclatureTrigger("Title")}</h4>
                <p className="font-nomenclature__mock-body"><span className={mockHighlightClass("Body")}>Aardvarks spend warm days curled inside cool burrows, then roam after dark using keen hearing and a remarkable sense of smell to find termites and ants.</span>{nomenclatureTrigger("Body", "end")}</p>
                <div className="font-nomenclature__mock-action">
                  <button className="font-nomenclature__mock-label" type="button"><span className={mockHighlightClass("Label")}>Meet the aardvark</span></button>
                  {nomenclatureTrigger("Label")}
                </div>
              </div>
            </div>
          </article>
        </div>
        <div className="font-shorthand-table-header">
          <h3 id="font-shorthands">Font shorthands</h3>
          <p>Each shorthand combines family, weight, size, and line height into a reusable font declaration for its role.</p>
        </div>
        <div className="font-shorthand-table"><Table stickyFirstColumn><thead><tr><th>Style</th><th>Token</th><th>Value</th><th>Font size</th><th>Preview</th></tr></thead><tbody>
          {fontShorthands.map(({ name, token, value, fontSize, sample, note }) => <tr key={token}><td>{name}</td><td><code>{formatTokenName(token)}</code></td><td><div className="font-shorthand-value">{value.map((part) => note && part.startsWith("clamp") ? <span key={part} className="font-shorthand-note"><code>{part}</code><PersonalNote title={note.title}>{note.body}</PersonalNote></span> : <code key={part}>{part}</code>)}</div></td><td><code>{fontSize}</code></td><td><span className="font-shorthand-sample" style={{ font: `var(${token})` }}>{sample}</span></td></tr>)}
        </tbody></Table></div>
      </section>
      <section className="type-group" aria-labelledby="fixed-font-sizes">
        <div className="section-header"><h2 id="fixed-font-sizes" className="section-title">Font sizes</h2><p>The scale starts at 16px on step 100 and follows an iterative second-major ratio. Steps above the base round to the nearest 4px; smaller steps round to the nearest even pixel.</p></div>
        <FontSizeCurve />
        <div className="font-size-table"><Table stickyFirstColumn><thead><tr><th>Step</th><th>Token</th><th>Value</th><th>Pixels</th><th>Preview</th></tr></thead><tbody>
          {fixedFontSizes.map(({ name, token, value, pixels }) => <tr key={token}><td>{name}</td><td><code>{formatTokenName(token)}</code></td><td><code>{value}</code></td><td><code>{pixels}</code></td><td><span className="font-size-sample" style={{ fontSize: `var(${token})` }}>The quick brown fox</span></td></tr>)}
        </tbody></Table></div>
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

function FontSizeCurve() {
  const chart = { left: 56, right: 888, top: 36, bottom: 202 };
  const minimum = fixedFontSizeSteps[0].pixels;
  const maximum = fixedFontSizeSteps.at(-1).pixels;
  const points = fixedFontSizeSteps.map(({ name, pixels }, index) => ({
    name,
    pixels,
    x: chart.left + (index * (chart.right - chart.left)) / (fixedFontSizeSteps.length - 1),
    y: chart.bottom - ((pixels - minimum) / (maximum - minimum)) * (chart.bottom - chart.top),
  }));
  const linePoints = points.map(({ x, y }) => `${x},${y}`).join(" ");
  const guides = [16, 40, 64].map((pixels) => ({
    pixels,
    y: chart.bottom - ((pixels - minimum) / (maximum - minimum)) * (chart.bottom - chart.top),
  }));

  return <figure className="font-size-curve">
    <svg viewBox="0 0 920 250" role="img" aria-labelledby="font-size-curve-title font-size-curve-description">
      <title id="font-size-curve-title">Primitive font-size scale curve</title>
      <desc id="font-size-curve-description">A line chart showing font sizes increasing from 10 to 64 pixels across fourteen scale steps.</desc>
      {guides.map(({ pixels, y }) => <g key={pixels}>
        <line className="font-size-curve__guide" x1={chart.left} y1={y} x2={chart.right} y2={y} />
        <text className="font-size-curve__guide-label" x={chart.left - 12} y={y + 4}>{pixels}</text>
      </g>)}
      <line className="font-size-curve__axis" x1={chart.left} y1={chart.bottom} x2={chart.right} y2={chart.bottom} />
      <polyline className="font-size-curve__line" points={linePoints} />
      {points.map(({ name, pixels, x, y }) => <g key={name}>
        <circle className="font-size-curve__point" cx={x} cy={y} r="4" />
        <text className="font-size-curve__value" x={x} y={y - 11}>{pixels}px</text>
        <text className="font-size-curve__step" x={x} y="230">{name}</text>
      </g>)}
    </svg>
    <figcaption>Each step applies a 1.125 ratio to the previously rounded value.</figcaption>
  </figure>;
}

function TypographyIntroVisual() {
  return <div className="typography-intro-visual" aria-hidden="true">
    <span className="typography-intro-visual__sample">Aa</span>
  </div>;
}

function FontFamily({ label, token, stack, className, sample }) {
  return <tr><td>{label}</td><td><code>{formatTokenName(token)}</code></td><td><code>{stack}</code></td><td><span className={`font-family-sample ${className}`}>{sample}</span></td></tr>;
}
