import { makeStyles, tokens } from "@fluentui/react-components";
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
  header: {
    position: "sticky",
    top: "0",
    zIndex: "10",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
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

  return (
    <div className={styles.root}>
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
