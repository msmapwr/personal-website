import { Body1, Divider, Title2, makeStyles } from "@fluentui/react-components";
import { Reveal } from "../components/Reveal";
import { useT } from "../i18n/LanguageContext";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "720px",
  },
});

export function About() {
  const styles = useStyles();
  const { title, paragraphs } = useT().about;

  return (
    <section className={styles.root}>
      <Reveal>
        <Title2>{title}</Title2>
      </Reveal>
      <Divider />
      {paragraphs.map((p, i) => (
        <Reveal key={i} delay={i * 0.08}>
          <Body1>{p}</Body1>
        </Reveal>
      ))}
    </section>
  );
}
