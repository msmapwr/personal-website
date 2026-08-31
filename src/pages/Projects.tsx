import {
  Button,
  Dropdown,
  Field,
  Option,
  Title2,
  makeStyles,
} from "@fluentui/react-components";
import { useMemo, useState } from "react";
import { ProjectCard } from "../components/ProjectCard";
import { Reveal } from "../components/Reveal";
import { useT } from "../i18n/LanguageContext";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "20px",
  },
  cardReveal: {
    height: "100%",
  },
  controls: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
    alignItems: "end",
  },
  sortButtons: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
  },
  control: {
    minWidth: "190px",
  },
  empty: {
    padding: "24px",
    borderRadius: "8px",
    backgroundColor: "var(--colorNeutralBackground2)",
  },
});

type ProjectSort = "featured" | "recent" | "name";

export function Projects() {
  const styles = useStyles();
  const t = useT();
  const { title, projects } = t.projects;
  const [sort, setSort] = useState<ProjectSort>("featured");
  const [tag, setTag] = useState("all");

  const tags = useMemo(
    () => Array.from(new Set(projects.flatMap((project) => project.tags))).sort(),
    [projects],
  );
  const visibleProjects = useMemo(() => {
    const filtered = tag === "all" ? projects : projects.filter((project) => project.tags.includes(tag));
    return [...filtered].sort((a, b) => {
      if (sort === "name") return a.name.localeCompare(b.name);
      if (sort === "recent") return b.updated.localeCompare(a.updated);
      return Number(b.featured) - Number(a.featured) || b.updated.localeCompare(a.updated);
    });
  }, [projects, sort, tag]);

  return (
    <section className={styles.root}>
      <Reveal>
        <Title2>{title}</Title2>
      </Reveal>
      <div className={styles.controls}>
        <Field className={styles.control} label={t.ui.sortFeatured}>
          <div className={styles.sortButtons} role="group" aria-label={t.ui.sortFeatured}>
            {([
              ["featured", t.ui.sortFeatured],
              ["recent", t.ui.sortRecent],
              ["name", t.ui.sortName],
            ] as const).map(([value, label]) => (
              <Button
                key={value}
                appearance={sort === value ? "primary" : "secondary"}
                aria-pressed={sort === value}
                onClick={() => setSort(value)}
              >
                {label}
              </Button>
            ))}
          </div>
        </Field>
        <Field className={styles.control} label={t.ui.filterTags}>
          <Dropdown
            value={tag === "all" ? t.ui.allTags : tag}
            selectedOptions={[tag]}
            onOptionSelect={(_, data) => setTag(data.optionValue ?? "all")}
          >
            <Option value="all">{t.ui.allTags}</Option>
            {tags.map((item) => (
              <Option key={item} value={item}>
                {item}
              </Option>
            ))}
          </Dropdown>
        </Field>
      </div>
      <div className={styles.grid}>
        {visibleProjects.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.1} className={styles.cardReveal}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
      {visibleProjects.length === 0 && <div className={styles.empty}>{t.ui.allTags}</div>}
    </section>
  );
}
