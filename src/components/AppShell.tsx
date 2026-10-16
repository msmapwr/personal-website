import { makeStyles, tokens } from "@fluentui/react-components";
import { useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ThemeMode } from "../hooks/useThemeMode";
import { useT } from "../i18n/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Navigation } from "./Navigation";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { OfflineNotice } from "./OfflineNotice";
import { preloadRoute } from "../routeLoaders";
import { gsap, useGSAP } from "../animation/gsap";

interface AppShellProps {
  mode: ThemeMode;
  onModeChange: (mode: ThemeMode) => void;
}

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: tokens.colorNeutralBackground1,
  },
  skipLink: {
    position: "absolute",
    left: "-9999px",
    top: "auto",
    width: "1px",
    height: "1px",
    overflow: "hidden",
    whiteSpace: "nowrap",
    ":focus": {
      position: "fixed",
      top: "8px",
      left: "8px",
      width: "auto",
      height: "auto",
      padding: "8px 16px",
      borderRadius: "6px",
      backgroundColor: tokens.colorNeutralBackground1,
      color: tokens.colorBrandForeground1,
      boxShadow: tokens.shadow4,
      textDecoration: "none",
      zIndex: "200",
    },
  },
  progress: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    height: "3px",
    background: tokens.colorBrandForeground1,
    transformOrigin: "0% 50%",
    zIndex: "100",
  },
  header: {
    position: "sticky",
    top: "0",
    zIndex: "10",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: "color-mix(in srgb, var(--colorNeutralBackground1) 78%, transparent)",
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
  },
  headerInner: {
    maxWidth: "1080px",
    margin: "0 auto",
    padding: "0 24px",
    height: "56px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  brand: {
    fontSize: "20px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    textDecoration: "none",
    marginRight: "auto",
  },
  main: {
    flex: "1",
    maxWidth: "1080px",
    width: "100%",
    margin: "0 auto",
    padding: "40px 24px",
  },
  page: {
    width: "100%",
    willChange: "opacity, transform",
  },
  footer: {
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: "24px",
    textAlign: "center",
    color: tokens.colorNeutralForeground3,
    fontSize: "14px",
  },
});

export function AppShell({ mode, onModeChange }: AppShellProps) {
  const styles = useStyles();
  const t = useT();
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();
    mm.add({ reduceMotion: "(prefers-reduced-motion: reduce)" }, ({ conditions }) => {
      gsap.fromTo(pageRef.current,
        { autoAlpha: 0, y: conditions?.reduceMotion ? 0 : 12, scale: conditions?.reduceMotion ? 1 : 0.995 },
        { autoAlpha: 1, y: 0, scale: 1, duration: conditions?.reduceMotion ? 0 : 0.55, ease: "power3.out", clearProps: "transform" },
      );
    });
    return () => mm.revert();
  }, { scope: pageRef, dependencies: [location.pathname], revertOnUpdate: true });

  useEffect(() => {
    const route = location.pathname.replace("/", "");
    const item = t.nav.find((n) => n.id === route);
    document.title = item ? `${item.label} · ${t.name}` : t.name;
  }, [location, t]);

  useEffect(() => {
    mainRef.current?.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (progressRef.current) gsap.set(progressRef.current, { scaleX: progress });
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    if (connection?.saveData || (connection?.effectiveType && connection.effectiveType !== "4g")) return;

    const warm = () => ["home", "about", "projects", "skills", "contact", "blog"].forEach(preloadRoute);
    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
    };
    const idle = idleWindow.requestIdleCallback
      ? window.setTimeout(() => idleWindow.requestIdleCallback?.(warm, { timeout: 2000 }), 600)
      : window.setTimeout(warm, 1200);
    return () => window.clearTimeout(idle);
  }, []);

  return (
    <div className={styles.root}>
      <a href="#main" className={styles.skipLink}>
        {t.ui.skipToContent}
      </a>
      <div
        ref={progressRef}
        className={styles.progress}
        aria-hidden="true"
      />
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.brand}>
            {t.name}
          </Link>
          <Navigation />
          <LanguageSwitcher />
          <ThemeSwitcher mode={mode} onModeChange={onModeChange} />
        </div>
      </header>
      <main id="main" ref={mainRef} tabIndex={-1} className={styles.main}>
        <OfflineNotice />
        <div ref={pageRef} className={styles.page}>
          <Outlet />
        </div>
      </main>
      <footer className={styles.footer}>
        © {new Date().getFullYear()} {t.name}
      </footer>
    </div>
  );
}
