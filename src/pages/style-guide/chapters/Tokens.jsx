import Table from "../../../components/table/Table";
import formatTokenName from "../formatTokenName";

const tokens = [
  ["--fg", "Primary text color"],
  ["--bg", "Page background color"],
  ["--fg-accent", "Primary accent color"],
  ["--shadow", "Elevation token"],
  ["--font-sans", "Body font family"],
  ["--font-heading", "Heading font family"],
  ["--font-mono", "Code font family"],
];

export default function Tokens() {
  return <Table><thead><tr><th>Token</th><th>Purpose</th></tr></thead><tbody>{tokens.map(([token, purpose]) => <tr key={token}><td><code>{formatTokenName(token)}</code></td><td>{purpose}</td></tr>)}</tbody></Table>;
}
