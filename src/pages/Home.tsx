import {
  Body1,
  Button,
  Display,
  Title3,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { ArrowRight20Regular, Mail20Regular } from "@fluentui/react-icons";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, useGSAP } from "../animation/gsap";
import { ProjectCard } from "../components/ProjectCard";
import { Reveal } from "../components/Reveal";
import { useT } from "../i18n/LanguageContext";
import { brandRamp } from "../theme/fluentTheme";

const useStyles = makeStyles({
  hero: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "12px",
    padding: "56px 48px",
    background: `linear-gradient(150deg, ${brandRamp[130]} 0%, ${brandRamp[150]} 50%, ${tokens.colorNeutralBackground1} 100%)`,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "16px",
    border: `1px solid color-mix(in srgb, ${tokens.colorBrandForeground1} 18%, transparent)`,
    boxShadow: tokens.shadow16,
    isolation: "isolate",
    "@media (max-width: 767px)": {
      padding: "40px 24px",
    },
  },
  blob: {
    position: "absolute",
    right: "-80px",
    top: "-80px",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    background: brandRamp[110],
    opacity: "0.4",
    filter: "blur(70px)",
    pointerEvents: "none",
    "@media (max-width: 767px)": {
      opacity: "0.2",
    },
  },
  avatar: {
    width: "96px",
    height: "96px",
    borderRadius: "50%",
    objectFit: "cover",
    border: `3px solid ${tokens.colorBrandForeground1}`,
    boxShadow: tokens.shadow16,
    position: "relative",
    zIndex: "1",
  },
  name: {
    color: tokens.colorBrandForeground1,
  },
  subtitle: {
    maxWidth: "680px",
    color: "#000000",
  },
  tagline: {
    color: "#000000",
  },
  actions: {
    display: "flex",
    gap: "12px",
    marginTop: "8px",
  },
  link: {
    textDecoration: "none",
  },
  featured: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    marginTop: "32px",
  },
});

export function Home() {
  const styles = useStyles();
  const heroRef = useRef<HTMLDivElement>(null);
  const ambientRef = useRef<gsap.core.Tween | null>(null);
  const t = useT();
  const { name, hero, avatar } = t;
  const featuredProject = t.projects.projects.find((project) => project.featured);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({
      reduceMotion: "(prefers-reduced-motion: reduce)",
      compact: "(max-width: 767px)",
    }, ({ conditions }) => {
      const reduceMotion = conditions?.reduceMotion;
      const compact = conditions?.compact;
      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });

      if (reduceMotion) {
        gsap.set("[data-hero-item]", { clearProps: "all" });
        gsap.set("[data-hero-blob]", { clearProps: "all" });
        return;
      }

      intro
        .fromTo("[data-hero-blob]", { autoAlpha: 0, scale: 0.55, rotation: -18 }, { autoAlpha: compact ? 0.2 : 0.4, scale: 1, rotation: 0, duration: 1.2, ease: "power2.out" })
        .fromTo("[data-hero-item]", { autoAlpha: 0, y: 26, rotateX: 8 }, { autoAlpha: 1, y: 0, rotateX: 0, duration: 0.65, stagger: 0.09, ease: "back.out(1.35)" }, "-=0.65");

      ambientRef.current = gsap.to("[data-hero-blob]", {
        scale: 1.12,
        rotation: 14,
        duration: compact ? 12 : 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, heroRef);

    return () => {
      ambientRef.current?.kill();
      ambientRef.current = null;
      mm.revert();
    };
  }, { scope: heroRef });

  useEffect(() => {
    const handleVisibility = () => ambientRef.current?.paused(document.visibilityState === "hidden");
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, []);

  return (
    <>
      <div ref={heroRef} className={styles.hero}>
        <div className={styles.blob} data-hero-blob aria-hidden="true" />
        {avatar && (
          <img
            src={avatar}
            alt={name}
            className={styles.avatar}
            data-hero-item
          />
        )}
        <div data-hero-item>
          <Display className={styles.name}>{name}</Display>
        </div>
        <div data-hero-item>
          <Title3 className={styles.tagline}>{hero.tagline}</Title3>
        </div>
        <div data-hero-item>
          <Body1 className={styles.subtitle}>{hero.subtitle}</Body1>
        </div>
        <div data-hero-item className={styles.actions}>
          <Link to="/projects" className={styles.link}>
            <Button appearance="primary" icon={<ArrowRight20Regular />}>
              {hero.actions.primary}
            </Button>
          </Link>
          <Link to="/contact" className={styles.link}>
            <Button appearance="secondary" icon={<Mail20Regular />}>
              {hero.actions.secondary}
            </Button>
          </Link>
        </div>
      </div>
      {featuredProject && (
        <section className={styles.featured} aria-labelledby="featured-projects-title">
          <Reveal>
            <Title3 id="featured-projects-title">{t.ui.featuredProjects}</Title3>
          </Reveal>
          <Reveal>
            <ProjectCard project={featuredProject} />
          </Reveal>
          <Link to="/projects" className={styles.link}>
            <Button appearance="subtle" icon={<ArrowRight20Regular />}>
              {t.ui.viewAllProjects}
            </Button>
          </Link>
        </section>
      )}
    </>
  );
}
