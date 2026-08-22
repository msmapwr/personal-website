import {
  Body1,
  Button,
  Display,
  Title3,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { ArrowRight20Regular, Mail20Regular } from "@fluentui/react-icons";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { useT } from "../i18n/LanguageContext";
import { brandRamp } from "../theme/fluentTheme";

const useStyles = makeStyles({
  hero: {
    position: "relative",
    overflow: "hidden",
    borderRadius: "12px",
    padding: "56px 48px",
    background: `linear-gradient(150deg, ${brandRamp[130]} 0%, ${brandRamp[150]} 50%, ${tokens.colorNeutralBackground1} 100%)`,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
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
  avatar: {
    width: "96px",
    height: "96px",
    borderRadius: "50%",
    objectFit: "cover",
    border: `3px solid ${tokens.colorBrandForeground1}`,
    boxShadow: tokens.shadow16,
    position: "relative",
    zIndex: "1",
  },
  name: {
    color: tokens.colorBrandForeground1,
  },
  subtitle: {
    maxWidth: "680px",
    color: tokens.colorNeutralForeground2,
  },
  actions: {
    display: "flex",
    gap: "12px",
    marginTop: "8px",
  },
  link: {
    textDecoration: "none",
  },
});

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.03 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" } },
};

export function Home() {
  const styles = useStyles();
  const reduce = useReducedMotion();
  const { name, hero, avatar } = useT();

  return (
    <motion.div
      className={styles.hero}
      variants={container}
      initial={reduce ? false : "hidden"}
      animate={reduce ? undefined : "show"}
    >
      <motion.div
        className={styles.blob}
        animate={reduce ? undefined : { scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      {avatar && (
        <motion.img
          src={avatar}
          alt={name}
          className={styles.avatar}
          variants={item}
        />
      )}
      <motion.div variants={item}>
        <Display className={styles.name}>{name}</Display>
      </motion.div>
      <motion.div variants={item}>
        <Title3>{hero.tagline}</Title3>
      </motion.div>
      <motion.div variants={item}>
        <Body1 className={styles.subtitle}>{hero.subtitle}</Body1>
      </motion.div>
      <motion.div variants={item} className={styles.actions}>
        <Link to="/projects" className={styles.link}>
          <Button appearance="primary" icon={<ArrowRight20Regular />}>
            {hero.actions.primary}
          </Button>
        </Link>
        <Link to="/contact" className={styles.link}>
          <Button appearance="secondary" icon={<Mail20Regular />}>
            {hero.actions.secondary}
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
