import { Body1, Title1, Title3, makeStyles } from "@fluentui/react-components";
import { content } from "../content";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
});

export function Home() {
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Title1>{content.name}</Title1>
      <Title3>
        {content.hero.tagline.zh} · {content.hero.tagline.en}
      </Title3>
      <Body1>{content.hero.subtitle.zh}</Body1>
      <Body1>{content.hero.subtitle.en}</Body1>
    </div>
  );
}
