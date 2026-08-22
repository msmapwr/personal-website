import { makeStyles, tokens } from "@fluentui/react-components";
import { motion, useScroll, useSpring } from "framer-motion";
import { Link, Outlet } from "react-router-dom";
import { content } from "../content";
import { ThemeMode } from "../hooks/useThemeMode";
import { Navigation } from "./Navigation";
import { ThemeSwitcher } from "./ThemeSwitcher";

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
    gap: "16px",
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
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className={styles.root}>
      <motion.div className={styles.progress} style={{ scaleX }} />
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" className={styles.brand}>
            {content.name}
          </Link>
          <Navigation />
          <ThemeSwitcher mode={mode} onModeChange={onModeChange} />
        </div>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        © {new Date().getFullYear()} {content.name}
      </footer>
    </div>
  );
}
