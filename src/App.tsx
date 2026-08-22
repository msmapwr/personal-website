import {
  Body1,
  FluentProvider,
  Title1,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
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
  },
});

export function App() {
  const { mode, resolved, setMode } = useThemeMode();
  const styles = useStyles();

  return (
    <FluentProvider theme={resolved === "dark" ? darkTheme : lightTheme}>
      <div className={styles.root}>
        <header className={styles.header}>
          <ThemeSwitcher mode={mode} onModeChange={setMode} />
        </header>
        <main className={styles.content}>
          <Title1>msmapwr</Title1>
          <Body1>
            当前主题模式：{mode}（实际渲染：{resolved}）
          </Body1>
        </main>
      </div>
    </FluentProvider>
  );
}
