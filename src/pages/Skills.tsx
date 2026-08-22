import {
  Badge,
  Body1,
  Subtitle2,
  Title2,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { content } from "../content";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "28px",
  },
  titleEn: {
    color: tokens.colorNeutralForeground3,
  },
  group: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  groupLabelEn: {
    color: tokens.colorNeutralForeground3,
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
  itemEn: {
    color: tokens.colorNeutralForeground3,
  },
});

export function Skills() {
  const styles = useStyles();
  const { title, groups } = content.skills;

  return (
    <section className={styles.root}>
      <div>
        <Title2>{title.zh}</Title2>
        <Body1 className={styles.titleEn}>{title.en}</Body1>
      </div>
      {groups.map((g) => (
        <div key={g.name} className={styles.group}>
          <div>
            <Subtitle2>{g.label.zh}</Subtitle2>
            <Body1 className={styles.groupLabelEn}>{g.label.en}</Body1>
          </div>
          <div className={styles.items}>
            {g.items.map((it, i) => (
              <div key={i} className={styles.item}>
                <Body1>{it.label.zh}</Body1>
                <Body1 className={styles.itemEn}>{it.label.en}</Body1>
                {it.level === "learning" && (
                  <Badge appearance="tint" color="warning">
                    学习中 · Learning
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
