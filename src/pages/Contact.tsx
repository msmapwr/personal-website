import { Title2, makeStyles, tokens } from "@fluentui/react-components";
import {
  Code20Regular,
  Mail20Regular,
  Play20Regular,
} from "@fluentui/react-icons";
import { Reveal } from "../components/Reveal";
import type { ContactItem } from "../content/types";
import { useT } from "../i18n/LanguageContext";
import { useRef } from "react";
import { gsap, useGSAP } from "../animation/gsap";

const kindIcon = {
  github: <Code20Regular />,
  email: <Mail20Regular />,
  bilibili: <Play20Regular />,
} as const;

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "560px",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  row: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "16px",
    borderRadius: "8px",
    backgroundColor: tokens.colorNeutralBackground2,
    color: tokens.colorNeutralForeground1,
    textDecoration: "none",
    ":focus-visible": {
      outline: `2px solid ${tokens.colorBrandForeground1}`,
      outlineOffset: "2px",
    },
  },
  icon: {
    display: "flex",
    color: tokens.colorBrandForeground1,
  },
  label: {
    color: tokens.colorNeutralForeground2,
    minWidth: "72px",
  },
  value: {
    color: tokens.colorBrandForeground1,
  },
});

function hrefFor(item: ContactItem): string | undefined {
  if (item.url) return item.url;
  if (item.kind === "email" && item.value) return `mailto:${item.value}`;
  return undefined;
}

function valueFor(item: ContactItem): string {
  if (item.kind === "email") return item.value ?? "";
  if (item.kind === "bilibili") return item.name ?? item.url ?? "";
  return item.url ?? "";
}

function ContactRow({ item }: { item: ContactItem }) {
  const styles = useStyles();
  const href = hrefFor(item);
  const rowRef = useRef<HTMLElement | null>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const setRowRef = (node: HTMLElement | null) => { rowRef.current = node; };
  const { contextSafe } = useGSAP(() => undefined, { scope: rowRef });
  const handleEnter = contextSafe(() => {
    gsap.to(rowRef.current, { x: 6, backgroundColor: tokens.colorNeutralBackground2Hover, duration: 0.28, ease: "power3.out", overwrite: "auto" });
    gsap.to(iconRef.current, { scale: 1.15, rotation: 4, duration: 0.35, ease: "back.out(2)", overwrite: "auto" });
  });
  const handleLeave = contextSafe(() => {
    gsap.to(rowRef.current, { x: 0, backgroundColor: tokens.colorNeutralBackground2, duration: 0.35, ease: "power3.out", overwrite: "auto" });
    gsap.to(iconRef.current, { scale: 1, rotation: 0, duration: 0.35, ease: "elastic.out(1, 0.5)", overwrite: "auto" });
  });
  const inner = (
    <>
      <span ref={iconRef} className={styles.icon}>{kindIcon[item.kind]}</span>
      <span className={styles.label}>{item.label}</span>
      <span className={styles.value}>{valueFor(item)}</span>
    </>
  );

  if (!href) {
    return <div ref={setRowRef} className={styles.row} onMouseEnter={handleEnter} onMouseLeave={handleLeave} onFocus={handleEnter} onBlur={handleLeave}>{inner}</div>;
  }

  const external = item.kind !== "email";
  return (
    <a
      href={href}
      ref={setRowRef}
      className={styles.row}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocus={handleEnter}
      onBlur={handleLeave}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {inner}
    </a>
  );
}

export function Contact() {
  const styles = useStyles();
  const { title, items } = useT().contact;

  return (
    <section className={styles.root}>
      <Reveal>
        <Title2>{title}</Title2>
      </Reveal>
      <div className={styles.list}>
        {items.map((item, i) => (
          <Reveal key={item.kind} delay={i * 0.08}>
            <ContactRow item={item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
