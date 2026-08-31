import { Body1, Subtitle2, Title3, makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  list: {
    margin: "0",
    paddingLeft: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  code: {
    margin: "0",
    padding: "16px",
    borderRadius: "8px",
    overflowX: "auto",
    backgroundColor: "var(--colorNeutralBackground3)",
    fontFamily: "Consolas, 'Cascadia Code', monospace",
    fontSize: "14px",
    lineHeight: "1.5",
    whiteSpace: "pre-wrap",
  },
});

export function RichText({ text }: { text: string }) {
  const styles = useStyles();
  const lines = text.split(/\r?\n/);
  const blocks: JSX.Element[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  let code: string[] = [];
  let inCode = false;

  const flushParagraph = () => {
    if (paragraph.length) {
      blocks.push(<Body1 key={`p-${blocks.length}`}>{paragraph.join(" ")}</Body1>);
      paragraph = [];
    }
  };
  const flushList = () => {
    if (list.length) {
      blocks.push(<ul key={`ul-${blocks.length}`} className={styles.list}>{list.map((item) => <li key={item}><Body1>{item}</Body1></li>)}</ul>);
      list = [];
    }
  };

  for (const line of lines) {
    if (line.trim().startsWith("```") || inCode) {
      flushParagraph();
      flushList();
      if (line.trim().startsWith("```") && inCode) {
        blocks.push(<pre key={`code-${blocks.length}`} className={styles.code}><code>{code.join("\n")}</code></pre>);
        code = [];
        inCode = false;
      } else if (!line.trim().startsWith("```")) {
        code.push(line);
      } else {
        inCode = true;
      }
      continue;
    }
    if (!line.trim()) {
      flushParagraph();
      flushList();
    } else if (line.startsWith("### ")) {
      flushParagraph(); flushList();
      blocks.push(<Title3 key={`h3-${blocks.length}`}>{line.slice(4)}</Title3>);
    } else if (line.startsWith("## ")) {
      flushParagraph(); flushList();
      blocks.push(<Subtitle2 key={`h2-${blocks.length}`}>{line.slice(3)}</Subtitle2>);
    } else if (line.startsWith("- ")) {
      flushParagraph();
      list.push(line.slice(2));
    } else {
      paragraph.push(line.trim());
    }
  }
  if (inCode) blocks.push(<pre key={`code-${blocks.length}`} className={styles.code}><code>{code.join("\n")}</code></pre>);
  flushParagraph();
  flushList();
  return <div className={styles.root}>{blocks}</div>;
}
