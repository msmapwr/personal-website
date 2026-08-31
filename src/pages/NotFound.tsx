import { StatusView } from "../components/StatusView";
import { useT } from "../i18n/LanguageContext";

export function NotFound() {
  const t = useT();
  const projectsLabel = t.nav.find((item) => item.id === "projects")?.label ?? "Projects";

  return (
    <StatusView
      title="404"
      message={t.ui.pageNotFound}
      backLabel={projectsLabel}
      backTo="/projects"
      homeLabel={t.ui.backHome}
    />
  );
}
