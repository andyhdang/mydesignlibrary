import { readFile } from "node:fs/promises";

const [indexCss, tokensChapter] = await Promise.all([
  readFile("src/index.css", "utf8"),
  readFile("src/pages/style-guide/chapters/Tokens.jsx", "utf8"),
]);

const rootMatch = indexCss.match(/:root \{([\s\S]*?)\n\}/);

if (!rootMatch) {
  throw new Error("Could not find the :root token definitions in src/index.css.");
}

const rootTokens = new Set(
  [...rootMatch[1].matchAll(/^\s*(--[\w-]+):/gm)].map((match) => match[1]),
);
const documentedTokens = new Set(
  [...tokensChapter.matchAll(/\["(--[\w-]+)",/g)].map((match) => match[1]),
);
const missingTokens = [...rootTokens].filter((token) => !documentedTokens.has(token));
const staleTokens = [...documentedTokens].filter((token) => !rootTokens.has(token));

if (missingTokens.length === 0 && staleTokens.length === 0) {
  console.log(`Design tokens are current (${rootTokens.size} documented).`);
  process.exit(0);
}

if (missingTokens.length > 0) {
  console.error(`Missing from Design tokens chapter: ${missingTokens.join(", ")}`);
}

if (staleTokens.length > 0) {
  console.error(`Not defined in :root: ${staleTokens.join(", ")}`);
}

process.exit(1);
