import { FluentProvider } from "@fluentui/react-components";
import { lazy, Suspense, type ReactNode } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { useThemeMode } from "./hooks/useThemeMode";
import { LanguageProvider } from "./i18n/LanguageContext";
import { RouteLoading } from "./components/RouteLoading";
import { darkTheme, lightTheme } from "./theme/fluentTheme";

const Home = lazy(() => import("./pages/Home").then(({ Home }) => ({ default: Home })));
const About = lazy(() => import("./pages/About").then(({ About }) => ({ default: About })));
const Projects = lazy(() => import("./pages/Projects").then(({ Projects }) => ({ default: Projects })));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail").then(({ ProjectDetail }) => ({ default: ProjectDetail })));
const Skills = lazy(() => import("./pages/Skills").then(({ Skills }) => ({ default: Skills })));
const SkillDetail = lazy(() => import("./pages/SkillDetail").then(({ SkillDetail }) => ({ default: SkillDetail })));
const Contact = lazy(() => import("./pages/Contact").then(({ Contact }) => ({ default: Contact })));
const Blog = lazy(() => import("./pages/Blog").then(({ Blog }) => ({ default: Blog })));
const BlogPost = lazy(() => import("./pages/BlogPost").then(({ BlogPost }) => ({ default: BlogPost })));
const NotFound = lazy(() => import("./pages/NotFound").then(({ NotFound }) => ({ default: NotFound })));

function LazyRoute({ children }: { children: ReactNode }) {
  return <Suspense fallback={<RouteLoading />}>{children}</Suspense>;
}

export function App() {
  const { mode, resolved, setMode } = useThemeMode();

  return (
    <FluentProvider theme={resolved === "dark" ? darkTheme : lightTheme}>
      <LanguageProvider>
        <HashRouter>
          <Routes>
            <Route element={<AppShell mode={mode} onModeChange={setMode} />}>
              <Route path="/" element={<LazyRoute><Home /></LazyRoute>} />
              <Route path="/about" element={<LazyRoute><About /></LazyRoute>} />
              <Route path="/projects" element={<LazyRoute><Projects /></LazyRoute>} />
              <Route path="/projects/:id" element={<LazyRoute><ProjectDetail /></LazyRoute>} />
              <Route path="/skills" element={<LazyRoute><Skills /></LazyRoute>} />
              <Route path="/skills/:id" element={<LazyRoute><SkillDetail /></LazyRoute>} />
              <Route path="/contact" element={<LazyRoute><Contact /></LazyRoute>} />
              <Route path="/blog" element={<LazyRoute><Blog /></LazyRoute>} />
              <Route path="/blog/:id" element={<LazyRoute><BlogPost /></LazyRoute>} />
              <Route path="*" element={<LazyRoute><NotFound /></LazyRoute>} />
            </Route>
          </Routes>
        </HashRouter>
      </LanguageProvider>
    </FluentProvider>
  );
}
