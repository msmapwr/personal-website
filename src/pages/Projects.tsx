import { Body1, Title2, makeStyles, tokens } from "@fluentui/react-components";
import { ProjectCard } from "../components/ProjectCard";
import { Reveal } from "../components/Reveal";
import { content } from "../content";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  titleEn: {
    color: tokens.colorNeutralForeground3,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "20px",
  },
  cardReveal: {
    height: "100%",
  },
});

export function Projects() {
  const styles = useStyles();
  const { title, projects } = content.projects;

  return (
    <section className={styles.root}>
      <Reveal>
        <Title2>{title.zh}</Title2>
        <Body1 className={styles.titleEn}>{title.en}</Body1>
      </Reveal>
      <div className={styles.grid}>
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.1} className={styles.cardReveal}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
