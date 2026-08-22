import { Body1, Title2, makeStyles, tokens } from "@fluentui/react-components";
import { ProjectCard } from "../components/ProjectCard";
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
});

export function Projects() {
  const styles = useStyles();
  const { title, projects } = content.projects;

  return (
    <section className={styles.root}>
      <div>
        <Title2>{title.zh}</Title2>
        <Body1 className={styles.titleEn}>{title.en}</Body1>
      </div>
      <div className={styles.grid}>
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
