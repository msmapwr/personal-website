import { FluentProvider } from "@fluentui/react-components";
import { HashRouter, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { useThemeMode } from "./hooks/useThemeMode";
import { LanguageProvider } from "./i18n/LanguageContext";
import { About } from "./pages/About";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { ProjectDetail } from "./pages/ProjectDetail";
import { Projects } from "./pages/Projects";
import { SkillDetail } from "./pages/SkillDetail";
import { Skills } from "./pages/Skills";
import { darkTheme, lightTheme } from "./theme/fluentTheme";

export function App() {
  const { mode, resolved, setMode } = useThemeMode();

  return (
    <FluentProvider theme={resolved === "dark" ? darkTheme : lightTheme}>
      <LanguageProvider>
        <HashRouter>
          <Routes>
            <Route element={<AppShell mode={mode} onModeChange={setMode} />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/:id" element={<ProjectDetail />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/skills/:id" element={<SkillDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="*" element={<Home />} />
            </Route>
          </Routes>
        </HashRouter>
      </LanguageProvider>
    </FluentProvider>
  );
}
