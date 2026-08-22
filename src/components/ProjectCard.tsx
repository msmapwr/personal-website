import {
  Badge,
  Body1,
  Card,
  CardFooter,
  CardHeader,
  Subtitle2,
  Title3,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { ArrowUpRight20Regular, Code20Regular } from "@fluentui/react-icons";
import type { Project } from "../content/types";

const useStyles = makeStyles({
  card: {
    height: "100%",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "0 20px 16px",
  },
  taglineEn: {
    color: tokens.colorNeutralForeground3,
  },
  descriptionEn: {
    color: tokens.colorNeutralForeground2,
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

export function ProjectCard({ project }: { project: Project }) {
  const styles = useStyles();

  return (
    <Card className={styles.card}>
      <CardHeader
        header={<Title3>{project.name.zh}</Title3>}
        description={project.name.en}
      />
      <div className={styles.body}>
        <div>
          <Subtitle2>{project.tagline.zh}</Subtitle2>
          <Body1 className={styles.taglineEn}>{project.tagline.en}</Body1>
        </div>
        <Body1>{project.description.zh}</Body1>
        <Body1 className={styles.descriptionEn}>{project.description.en}</Body1>
        <div className={styles.tags}>
          {project.tags.map((t) => (
            <Badge key={t} appearance="tint">
              {t}
            </Badge>
          ))}
        </div>
      </div>
      <CardFooter>
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
              <ArrowUpRight20Regular /> 在线演示
            </a>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
