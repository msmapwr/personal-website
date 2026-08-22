import {
  Badge,
  Body1,
  Subtitle2,
  Title2,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { Reveal } from "../components/Reveal";
import { useT } from "../i18n/LanguageContext";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },
  group: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  items: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
    gap: "12px",
  },
  item: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    padding: "16px",
    borderRadius: "8px",
    backgroundColor: tokens.colorNeutralBackground2,
  },
});

export function Skills() {
  const styles = useStyles();
  const { ui, skills } = useT();
  const { title, groups } = skills;

  return (
    <section className={styles.root}>
      <Reveal>
        <Title2>{title}</Title2>
      </Reveal>
      {groups.map((g, i) => (
        <Reveal key={g.name} delay={i * 0.08}>
          <div className={styles.group}>
            <Subtitle2>{g.label}</Subtitle2>
            <div className={styles.items}>
              {g.items.map((it, j) => (
                <div key={j} className={styles.item}>
                  <Body1>{it.label}</Body1>
                  {it.level === "learning" && (
                    <Badge appearance="tint" color="warning">
                      {ui.learning}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      ))}
    </section>
  );
}
