import {
  Body1,
  Button,
  Display,
  Title3,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { ArrowRight20Regular, Mail20Regular } from "@fluentui/react-icons";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { content } from "../content";
import { brandRamp } from "../theme/fluentTheme";

const useStyles = makeStyles({
  hero: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "16px",
    padding: "64px 48px",
    background: `linear-gradient(150deg, ${brandRamp[130]} 0%, ${brandRamp[150]} 50%, ${tokens.colorNeutralBackground1} 100%)`,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  blob: {
    position: "absolute",
    right: "-80px",
    top: "-80px",
    width: "320px",
    height: "320px",
    borderRadius: "50%",
    background: brandRamp[110],
    opacity: "0.4",
    filter: "blur(70px)",
    pointerEvents: "none",
  },
  name: {
    color: tokens.colorBrandForeground1,
    position: "relative",
  },
  taglineEn: {
    color: tokens.colorNeutralForeground2,
  },
  subtitle: {
    maxWidth: "680px",
    color: tokens.colorNeutralForeground2,
  },
  subtitleEn: {
    maxWidth: "680px",
    color: tokens.colorNeutralForeground3,
  },
  actions: {
    display: "flex",
    gap: "12px",
    marginTop: "8px",
    position: "relative",
  },
  link: {
    textDecoration: "none",
  },
});

export function Home() {
  const styles = useStyles();
  const reduce = useReducedMotion();
  const { name, hero } = content;

  return (
    <motion.div
      className={styles.hero}
      initial={reduce ? false : { opacity: 0, y: 16 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className={styles.blob}
        animate={reduce ? undefined : { scale: [1, 1.2, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <Display className={styles.name}>{name}</Display>
      <Title3>{hero.tagline.zh}</Title3>
      <Title3 className={styles.taglineEn}>{hero.tagline.en}</Title3>
      <Body1 className={styles.subtitle}>{hero.subtitle.zh}</Body1>
      <Body1 className={styles.subtitleEn}>{hero.subtitle.en}</Body1>
      <div className={styles.actions}>
        <Link to="/projects" className={styles.link}>
          <Button appearance="primary" icon={<ArrowRight20Regular />}>
            {hero.actions.primary.zh}
          </Button>
        </Link>
        <Link to="/contact" className={styles.link}>
          <Button appearance="secondary" icon={<Mail20Regular />}>
            {hero.actions.secondary.zh}
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}
