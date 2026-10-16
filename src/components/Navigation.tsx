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
import { useRef } from "react";
import { useT } from "../i18n/LanguageContext";
import { preloadRoute } from "../routeLoaders";
import { gsap, useGSAP } from "../animation/gsap";

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
    ":focus-visible": {
      outline: `2px solid ${tokens.colorBrandForeground1}`,
      outlineOffset: "2px",
    },
  },
  active: {
    color: tokens.colorBrandForeground1,
    backgroundColor: tokens.colorBrandBackground2,
    boxShadow: `inset 0 -2px 0 ${tokens.colorBrandForeground1}`,
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
  const navRef = useRef<HTMLElement>(null);
  const { contextSafe } = useGSAP(() => undefined, { scope: navRef });
  const handleEnter = contextSafe((event: { currentTarget: HTMLAnchorElement }) => {
    gsap.to(event.currentTarget, {
      y: -1,
      backgroundColor: tokens.colorNeutralBackground2,
      color: tokens.colorNeutralForeground1,
      duration: 0.22,
      ease: "power2.out",
      overwrite: "auto",
    });
  });
  const handleLeave = contextSafe((event: { currentTarget: HTMLAnchorElement }) => {
    gsap.to(event.currentTarget, {
      y: 0,
      backgroundColor: "transparent",
      color: event.currentTarget.getAttribute("aria-current") === "page"
        ? tokens.colorBrandForeground1
        : tokens.colorNeutralForeground2,
      duration: 0.3,
      ease: "power2.out",
      overwrite: "auto",
    });
  });

  return (
    <>
      <nav ref={navRef} className={styles.nav}>
        {t.nav.map((item) => (
          <NavLink
            key={item.id}
            to={routeFor(item.id)}
            end={item.id === "home"}
            className={({ isActive }) =>
              mergeClasses(styles.link, isActive && styles.active)
            }
            onMouseEnter={(event) => { preloadRoute(item.id); handleEnter(event); }}
            onMouseLeave={handleLeave}
            onFocus={(event) => { preloadRoute(item.id); handleEnter(event); }}
            onBlur={handleLeave}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      <Menu>
        <MenuTrigger disableButtonEnhancement>
          <MenuButton
            icon={<Navigation20Regular />}
            aria-label={t.ui.menu}
            className={styles.hamburger}
          />
        </MenuTrigger>
        <MenuPopover>
          <MenuList>
            {t.nav.map((item) => (
              <MenuItem
                key={item.id}
                onClick={() => navigate(routeFor(item.id))}
                onMouseEnter={() => preloadRoute(item.id)}
                onFocus={() => preloadRoute(item.id)}
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
