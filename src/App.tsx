import { FluentProvider } from "@fluentui/react-components";
import { HashRouter, Route, Routes } from "react-router-dom";
import { AppShell } from "./components/AppShell";
import { useThemeMode } from "./hooks/useThemeMode";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { Skills } from "./pages/Skills";
import { darkTheme, lightTheme } from "./theme/fluentTheme";

export function App() {
  const { mode, resolved, setMode } = useThemeMode();

  return (
    <FluentProvider theme={resolved === "dark" ? darkTheme : lightTheme}>
      <HashRouter>
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
      </HashRouter>
    </FluentProvider>
  );
}
