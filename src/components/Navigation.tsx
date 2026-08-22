import {
  makeStyles,
  mergeClasses,
  tokens,
} from "@fluentui/react-components";
import { NavLink } from "react-router-dom";
import { content } from "../content";

const routeFor = (id: string) => (id === "home" ? "/" : `/${id}`);

const useStyles = makeStyles({
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  link: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "4px 12px",
    borderRadius: "6px",
    textDecoration: "none",
    color: tokens.colorNeutralForeground2,
    transition: "background-color 0.15s ease, color 0.15s ease",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground2,
      color: tokens.colorNeutralForeground1,
    },
  },
  zh: {
    fontSize: "14px",
    fontWeight: "500",
    lineHeight: "1.2",
  },
  en: {
    fontSize: "11px",
    color: tokens.colorNeutralForeground3,
    lineHeight: "1.2",
  },
  active: {
    color: tokens.colorBrandForeground1,
    backgroundColor: tokens.colorBrandBackground2,
    ":hover": {
      color: tokens.colorBrandForeground1,
      backgroundColor: tokens.colorBrandBackground2,
    },
  },
});

export function Navigation() {
  const styles = useStyles();

  return (
    <nav className={styles.nav}>
      {content.nav.map((item) => (
        <NavLink
          key={item.id}
          to={routeFor(item.id)}
          end={item.id === "home"}
          className={({ isActive }) =>
            mergeClasses(styles.link, isActive && styles.active)
          }
        >
          <span className={styles.zh}>{item.label.zh}</span>
          <span className={styles.en}>{item.label.en}</span>
        </NavLink>
      ))}
    </nav>
  );
}
