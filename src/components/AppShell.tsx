import { makeStyles, tokens } from "@fluentui/react-components";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { ThemeMode } from "../hooks/useThemeMode";
import { useT } from "../i18n/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Navigation } from "./Navigation";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { motionTokens } from "../theme/motion";

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
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const progress = reduce ? scrollYProgress : scaleX;
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const route = location.pathname.replace("/", "");
    const item = t.nav.find((n) => n.id === route);
    document.title = item ? `${item.label} · ${t.name}` : t.name;
  }, [location, t]);

  useEffect(() => {
    mainRef.current?.focus({ preventScroll: true });
  }, [location.pathname]);

  return (
    <div className={styles.root}>
      <a href="#main" className={styles.skipLink}>
        {t.ui.skipToContent}
      </a>
      <motion.div
        className={styles.progress}
        style={{ scaleX: progress }}
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
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            className={styles.page}
            initial={reduce ? false : { opacity: 0, y: motionTokens.distance.small }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -motionTokens.distance.small }}
            transition={{ duration: reduce ? 0 : motionTokens.duration.normal, ease: motionTokens.easing }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <footer className={styles.footer}>
        © {new Date().getFullYear()} {t.name}
      </footer>
    </div>
  );
}
