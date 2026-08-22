import {
  makeStyles,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  mergeClasses,
  tokens,
} from "@fluentui/react-components";
import { Navigation20Regular } from "@fluentui/react-icons";
import { NavLink, useNavigate } from "react-router-dom";
import { useT } from "../i18n/LanguageContext";

const routeFor = (id: string) => (id === "home" ? "/" : `/${id}`);

const useStyles = makeStyles({
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    "@media (max-width: 767px)": {
      display: "none",
    },
  },
  link: {
    display: "inline-flex",
    alignItems: "center",
    minHeight: "44px",
    padding: "6px 12px",
    borderRadius: "6px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "500",
    color: tokens.colorNeutralForeground2,
    transition:
      "background-color 0.15s ease, color 0.15s ease, transform 0.15s ease",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground2,
      color: tokens.colorNeutralForeground1,
      transform: "translateY(-1px)",
    },
    ":focus-visible": {
      outline: `2px solid ${tokens.colorBrandForeground1}`,
      outlineOffset: "2px",
    },
  },
  active: {
    color: tokens.colorBrandForeground1,
    backgroundColor: tokens.colorBrandBackground2,
    boxShadow: `inset 0 -2px 0 ${tokens.colorBrandForeground1}`,
    ":hover": {
      color: tokens.colorBrandForeground1,
      backgroundColor: tokens.colorBrandBackground2,
      transform: "none",
    },
  },
  hamburger: {
    display: "none",
    "@media (max-width: 767px)": {
      display: "inline-flex",
    },
  },
});

export function Navigation() {
  const styles = useStyles();
  const t = useT();
  const navigate = useNavigate();

  return (
    <>
      <nav className={styles.nav}>
        {t.nav.map((item) => (
          <NavLink
            key={item.id}
            to={routeFor(item.id)}
            end={item.id === "home"}
            className={({ isActive }) =>
              mergeClasses(styles.link, isActive && styles.active)
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <MenuButton
            icon={<Navigation20Regular />}
            aria-label="菜单"
            className={styles.hamburger}
          />
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            {t.nav.map((item) => (
              <MenuItem
                key={item.id}
                onClick={() => navigate(routeFor(item.id))}
              >
                {item.label}
              </MenuItem>
            ))}
          </MenuList>
        </MenuPopover>
      </Menu>
    </>
  );
}
