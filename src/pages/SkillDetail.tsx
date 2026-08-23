import {
  Badge,
  Body1,
  Title2,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { Link, useParams } from "react-router-dom";
import type { SkillGroup, SkillItem } from "../content/types";
import { useT } from "../i18n/LanguageContext";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "720px",
  },
  back: {
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    fontSize: "14px",
    ":hover": {
      textDecoration: "underline",
    },
  },
  meta: {
    display: "flex",
    gap: "8px",
  },
});

export function SkillDetail() {
  const styles = useStyles();
  const { id } = useParams();
  const t = useT();
  let found: { group: SkillGroup; item: SkillItem } | undefined;
  for (const group of t.skills.groups) {
    const item = group.items.find((it) => it.id === id);
    if (item) {
      found = { group, item };
      break;
    }
  }
  const skillsLabel = t.nav.find((n) => n.id === "skills")?.label ?? "Skills";

  if (!found) {
    return (
      <div className={styles.root}>
        <Link to="/skills" className={styles.back}>
          ← {skillsLabel}
        </Link>
        <Title2>404</Title2>
      </div>
    );
  }

  const { group, item } = found;
  return (
    <div className={styles.root}>
      <Link to="/skills" className={styles.back}>
        ← {skillsLabel}
      </Link>
      <Title2>{item.label}</Title2>
      <div className={styles.meta}>
        <Badge appearance="tint">{group.label}</Badge>
        {item.level === "learning" && (
          <Badge appearance="tint" color="warning">
            {t.ui.learning}
          </Badge>
        )}
      </div>
      <Body1>{item.description}</Body1>
    </div>
  );
}
