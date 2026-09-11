import Table from "../../../components/table/Table";

const tokens = [
  ["--text", "Primary text color"],
  ["--bg", "Page background color"],
  ["--accent", "Primary accent color"],
  ["--shadow", "Elevation token"],
  ["--sans", "Body font family"],
  ["--heading", "Heading font family"],
  ["--mono", "Code font family"],
];

export default function Tokens() {
  return <Table><thead><tr><th>Token</th><th>Purpose</th></tr></thead><tbody>{tokens.map(([token, purpose]) => <tr key={token}><td><code>{token}</code></td><td>{purpose}</td></tr>)}</tbody></Table>;
}
