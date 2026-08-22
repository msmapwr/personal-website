import {
  Body1,
  Caption1,
  Card,
  CardHeader,
  Subtitle1,
  Title2,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { Reveal } from "../components/Reveal";
import { useT } from "../i18n/LanguageContext";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "720px",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "20px",
  },
  date: {
    color: tokens.colorNeutralForeground3,
  },
});

export function Blog() {
  const styles = useStyles();
  const { title, posts } = useT().posts;

  return (
    <section className={styles.root}>
      <Reveal>
        <Title2>{title}</Title2>
      </Reveal>
      {posts.map((p, i) => (
        <Reveal key={p.id} delay={i * 0.08}>
          <Card className={styles.card}>
            <CardHeader
              header={<Subtitle1>{p.title}</Subtitle1>}
              description={<Caption1 className={styles.date}>{p.date}</Caption1>}
            />
            <Body1>{p.excerpt}</Body1>
            <Body1>{p.body}</Body1>
          </Card>
        </Reveal>
      ))}
    </section>
  );
}
