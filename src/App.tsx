import {
  FluentProvider,
  Spinner,
  makeStyles,
} from "@fluentui/react-components";
import { lazy, Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { useThemeMode } from "./hooks/useThemeMode";
import { LanguageProvider } from "./i18n/LanguageContext";
import { darkTheme, lightTheme } from "./theme/fluentTheme";

const Home = lazy(() => import("./pages/Home").then((m) => ({ default: m.Home })));
const About = lazy(() => import("./pages/About").then((m) => ({ default: m.About })));
const Projects = lazy(() => import("./pages/Projects").then((m) => ({ default: m.Projects })));
const Skills = lazy(() => import("./pages/Skills").then((m) => ({ default: m.Skills })));
const Contact = lazy(() => import("./pages/Contact").then((m) => ({ default: m.Contact })));

const useStyles = makeStyles({
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "80px 0",
  },
});

function PageLoading() {
  const styles = useStyles();
  return (
    <div className={styles.loading}>
      <Spinner label="加载中…" />
    </div>
  );
}

export function App() {
  const { mode, resolved, setMode } = useThemeMode();

  return (
    <FluentProvider theme={resolved === "dark" ? darkTheme : lightTheme}>
      <LanguageProvider>
        <HashRouter>
          <Suspense fallback={<PageLoading />}>
            <Routes>
              <Route element={<AppShell mode={mode} onModeChange={setMode} />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<Home />} />
              </Route>
            </Routes>
          </Suspense>
        </HashRouter>
      </LanguageProvider>
    </FluentProvider>
  );
}
