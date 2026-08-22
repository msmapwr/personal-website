import { Body1, Title2, makeStyles, tokens } from "@fluentui/react-components";
import {
  Code20Regular,
  Mail20Regular,
  Play20Regular,
} from "@fluentui/react-icons";
import { Reveal } from "../components/Reveal";
import { content } from "../content";
import type { ContactItem } from "../content/types";

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
  titleEn: {
    color: tokens.colorNeutralForeground3,
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
    transition: "background-color 0.15s ease, transform 0.15s ease",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground2Hover,
      transform: "translateX(4px)",
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
  const inner = (
    <>
      <span className={styles.icon}>{kindIcon[item.kind]}</span>
      <span className={styles.label}>{item.label}</span>
      <span className={styles.value}>{valueFor(item)}</span>
    </>
  );

  if (!href) {
    return <div className={styles.row}>{inner}</div>;
  }

  const external = item.kind !== "email";
  return (
    <a
      href={href}
      className={styles.row}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {inner}
    </a>
  );
}

export function Contact() {
  const styles = useStyles();
  const { title, items } = content.contact;

  return (
    <section className={styles.root}>
      <Reveal>
        <Title2>{title.zh}</Title2>
        <Body1 className={styles.titleEn}>{title.en}</Body1>
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
