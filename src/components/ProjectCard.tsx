import {
  Badge,
  Body1,
  Card,
  CardFooter,
  CardHeader,
  Subtitle2,
  Title3,
  makeStyles,
  mergeClasses,
  tokens,
} from "@fluentui/react-components";
import { ArrowUpRight20Regular, Code20Regular } from "@fluentui/react-icons";
import { useRef, useState, type MouseEvent } from "react";
import type { Project } from "../content/types";

const useStyles = makeStyles({
  wrap: {
    position: "relative",
    height: "100%",
    transition: "transform 0.2s ease",
    ":hover": {
      transform: "translateY(-4px)",
    },
    ":active": {
      transform: "scale(0.98)",
    },
  },
  card: {
    height: "100%",
  },
  body: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "0 20px 16px",
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
    ":focus-visible": {
      outline: `2px solid ${tokens.colorBrandForeground1}`,
      outlineOffset: "2px",
    },
  },
  spotlight: {
    position: "absolute",
    inset: "0",
    borderRadius: "12px",
    background:
      "radial-gradient(320px circle at var(--fx, 50%) var(--fy, 50%), rgba(0,120,212,0.10), transparent 60%)",
    boxShadow: "inset 0 0 0 1px rgba(0,120,212,0)",
    opacity: "0",
    transition: "opacity 0.2s ease, box-shadow 0.2s ease",
    pointerEvents: "none",
  },
  spotlightOn: {
    opacity: "1",
    boxShadow: "inset 0 0 0 1px rgba(0,120,212,0.35)",
  },
});

export function ProjectCard({ project }: { project: Project }) {
  const styles = useStyles();
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--fx", `${e.clientX - r.left}px`);
    el.style.setProperty("--fy", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={rootRef}
      className={styles.wrap}
      onMouseMove={handleMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      <Card className={styles.card}>
        <CardHeader header={<Title3>{project.name}</Title3>} />
        <div className={styles.body}>
          <Subtitle2>{project.tagline}</Subtitle2>
          <Body1>{project.description}</Body1>
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
      <div
        className={mergeClasses(styles.spotlight, active && styles.spotlightOn)}
      />
    </div>
  );
}
