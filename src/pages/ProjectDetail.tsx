import {
  Badge,
  Body1,
  Subtitle2,
  Title2,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { ArrowUpRight20Regular, Code20Regular } from "@fluentui/react-icons";
import { Link, useParams } from "react-router-dom";
import { projectImages } from "../content/projectImages";
import { StatusView } from "../components/StatusView";
import { useT } from "../i18n/LanguageContext";
import { ResponsiveImage } from "../components/ResponsiveImage";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "820px",
  },
  back: {
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    fontSize: "14px",
    ":hover": {
      textDecoration: "underline",
    },
  },
  image: {
    width: "100%",
    borderRadius: "12px",
    display: "block",
  },
  tags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
  },
  links: {
    display: "flex",
    gap: "16px",
  },
  link: {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    ":hover": {
      textDecoration: "underline",
    },
  },
});

export function ProjectDetail() {
  const styles = useStyles();
  const { id } = useParams();
  const t = useT();
  const project = t.projects.projects.find((p) => p.id === id);
  const images = projectImages[id ?? ""] ?? [];
  const projectsLabel = t.nav.find((n) => n.id === "projects")?.label ?? "Projects";

  if (!project) {
    return (
      <StatusView title="404" message={t.ui.pageNotFound} backLabel={projectsLabel} backTo="/projects" homeLabel={t.ui.backHome} />
    );
  }

  return (
    <div className={styles.root}>
      <Link to="/projects" className={styles.back}>
        ← {projectsLabel}
      </Link>
      <Title2>{project.name}</Title2>
      <Subtitle2>{project.tagline}</Subtitle2>
      <Badge appearance="tint" color={project.status === "completed" ? "success" : project.status === "in-progress" ? "warning" : "informative"}>
        {project.status === "completed" ? t.ui.statusCompleted : project.status === "in-progress" ? t.ui.statusInProgress : t.ui.statusOptimizing}
      </Badge>
      {images.map((img) => (
        <ResponsiveImage key={img} src={img} alt={`${project.name} screenshot`} className={styles.image} loading="lazy" decoding="async" sizes="(max-width: 820px) calc(100vw - 48px), 820px" />
      ))}
      <Body1>{project.description}</Body1>
      <div className={styles.tags}>
        {project.tags.map((tag) => (
          <Badge key={tag} appearance="tint">
            {tag}
          </Badge>
        ))}
      </div>
      <div className={styles.links}>
        <a
          href={project.link}
          target="_blank"
          rel="noreferrer"
          className={styles.link}
        >
          <Code20Regular /> GitHub
        </a>
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className={styles.link}
          >
            <ArrowUpRight20Regular /> {t.ui.demo}
          </a>
        )}
      </div>
    </div>
  );
}
