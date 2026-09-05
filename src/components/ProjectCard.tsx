import {
  Badge,
  Body1,
  Card,
  CardFooter,
  CardHeader,
  CardPreview,
  Subtitle2,
  Title3,
  makeStyles,
  mergeClasses,
  tokens,
} from "@fluentui/react-components";
import { ArrowUpRight20Regular, Code20Regular } from "@fluentui/react-icons";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ResponsiveImage } from "./ResponsiveImage";
import { projectImages } from "../content/projectImages";
import type { Project } from "../content/types";
import { useT } from "../i18n/LanguageContext";

const useStyles = makeStyles({
  wrap: {
    position: "relative",
    height: "100%",
    cursor: "pointer",
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
  preview: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    display: "block",
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
  const { ui } = useT();
  const navigate = useNavigate();
  const rootRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const rectRef = useRef<DOMRect | null>(null);
  const [active, setActive] = useState(false);
  const images = projectImages[project.id] ?? [];
  const image = images[0];
  const statusLabel =
    project.status === "completed"
      ? ui.statusCompleted
      : project.status === "in-progress"
        ? ui.statusInProgress
        : ui.statusOptimizing;

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = rootRef.current;
    const rect = rectRef.current;
    if (!el || !rect || frameRef.current !== null) return;
    pointerRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    frameRef.current = requestAnimationFrame(() => {
      const { x, y } = pointerRef.current;
      el.style.setProperty("--fx", `${x}px`);
      el.style.setProperty("--fy", `${y}px`);
      frameRef.current = null;
    });
  };

  const handleEnter = () => {
    rectRef.current = rootRef.current?.getBoundingClientRect() ?? null;
    setActive(true);
  };

  const handleLeave = () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
    rectRef.current = null;
    setActive(false);
  };

  useEffect(() => () => {
    if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
  }, []);

  return (
    <div
      ref={rootRef}
      className={styles.wrap}
      role="link"
      tabIndex={0}
      aria-label={`${project.name}: ${project.tagline}`}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={() => navigate(`/projects/${project.id}`)}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget) return;
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigate(`/projects/${project.id}`);
        }
      }}
    >
      <Card className={styles.card}>
        {image && (
          <CardPreview>
            <ResponsiveImage src={image} alt={project.name} className={styles.preview} loading="lazy" decoding="async" sizes="(max-width: 640px) calc(100vw - 48px), (max-width: 1100px) 45vw, 480px" />
          </CardPreview>
        )}
        <CardHeader
          header={<Title3>{project.name}</Title3>}
          description={
            <Badge
              appearance="tint"
              color={
                project.status === "completed"
                  ? "success"
                  : project.status === "in-progress"
                    ? "warning"
                    : "informative"
              }
            >
              {statusLabel}
            </Badge>
          }
        />
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
              onClick={(e) => e.stopPropagation()}
            >
              <Code20Regular /> GitHub
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                className={styles.link}
                onClick={(e) => e.stopPropagation()}
              >
                <ArrowUpRight20Regular /> {ui.demo}
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
