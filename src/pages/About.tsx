import {
  Body1,
  Divider,
  Title2,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { content } from "../content";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "720px",
  },
  titleEn: {
    color: tokens.colorNeutralForeground3,
  },
  paragraph: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  en: {
    color: tokens.colorNeutralForeground2,
  },
});

export function About() {
  const styles = useStyles();
  const { title, paragraphs } = content.about;

  return (
    <section className={styles.root}>
      <div>
        <Title2>{title.zh}</Title2>
        <Body1 className={styles.titleEn}>{title.en}</Body1>
      </div>
      <Divider />
      {paragraphs.map((p, i) => (
        <div key={i} className={styles.paragraph}>
          <Body1>{p.zh}</Body1>
          <Body1 className={styles.en}>{p.en}</Body1>
        </div>
      ))}
    </section>
  );
}
