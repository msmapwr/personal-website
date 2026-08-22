import {
  Body1,
  FluentProvider,
  Title1,
  Title3,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { content } from "./content";
import { useThemeMode } from "./hooks/useThemeMode";
import { darkTheme, lightTheme } from "./theme/fluentTheme";

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
    backgroundColor: tokens.colorNeutralBackground1,
    display: "flex",
    flexDirection: "column",
    padding: "24px",
  },
  header: {
    display: "flex",
    justifyContent: "flex-end",
  },
  content: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    textAlign: "center",
  },
});

export function App() {
  const { mode, resolved, setMode } = useThemeMode();
  const styles = useStyles();
  const { name, hero, nav } = content;

  return (
    <FluentProvider theme={resolved === "dark" ? darkTheme : lightTheme}>
      <div className={styles.root}>
        <header className={styles.header}>
          <ThemeSwitcher mode={mode} onModeChange={setMode} />
        </header>
        <main className={styles.content}>
          <Title1>{name}</Title1>
          <Title3>
            {hero.tagline.zh} · {hero.tagline.en}
          </Title3>
          <Body1>{hero.subtitle.zh}</Body1>
          <Body1>{hero.subtitle.en}</Body1>
          <Body1>导航：{nav.map((n) => n.label.zh).join(" / ")}</Body1>
        </main>
      </div>
    </FluentProvider>
  );
}
