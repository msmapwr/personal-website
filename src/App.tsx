import { FluentProvider } from "@fluentui/react-components";
import { lazy, Suspense, type ReactNode } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { useThemeMode } from "./hooks/useThemeMode";
import { LanguageProvider } from "./i18n/LanguageContext";
import { RouteLoading } from "./components/RouteLoading";
import { RouteErrorBoundary, RouteLoadError } from "./components/RouteErrorBoundary";
import { darkTheme, lightTheme } from "./theme/fluentTheme";
import { routeLoaders } from "./routeLoaders";

const Home = lazy(routeLoaders.home);
const About = lazy(routeLoaders.about);
const Projects = lazy(routeLoaders.projects);
const ProjectDetail = lazy(() => import("./pages/ProjectDetail").then(({ ProjectDetail }) => ({ default: ProjectDetail })));
const Skills = lazy(routeLoaders.skills);
const SkillDetail = lazy(() => import("./pages/SkillDetail").then(({ SkillDetail }) => ({ default: SkillDetail })));
const Contact = lazy(routeLoaders.contact);
const Blog = lazy(routeLoaders.blog);
const BlogPost = lazy(() => import("./pages/BlogPost").then(({ BlogPost }) => ({ default: BlogPost })));
const NotFound = lazy(() => import("./pages/NotFound").then(({ NotFound }) => ({ default: NotFound })));

function LazyRoute({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  return (
    <RouteErrorBoundary key={pathname} fallback={<RouteLoadError />}>
      <Suspense fallback={<RouteLoading />}>{children}</Suspense>
    </RouteErrorBoundary>
  );
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
