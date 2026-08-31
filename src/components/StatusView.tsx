import { Body1, Button, Title2, makeStyles } from "@fluentui/react-components";
import { ArrowLeft20Regular, Home20Regular } from "@fluentui/react-icons";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "640px",
  },
  actions: {
    display: "flex",
    flexWrap: "wrap",
    gap: "12px",
  },
  link: {
    textDecoration: "none",
  },
});

interface StatusViewProps {
  title: string;
  message: string;
  backLabel: string;
  backTo: string;
  homeLabel: string;
}

export function StatusView({
  title,
  message,
  backLabel,
  backTo,
  homeLabel,
}: StatusViewProps) {
  const styles = useStyles();
  return (
    <section className={styles.root} aria-labelledby="status-title">
      <Title2 id="status-title">{title}</Title2>
      <Body1>{message}</Body1>
      <div className={styles.actions}>
        <Link to={backTo} className={styles.link}>
          <Button appearance="secondary" icon={<ArrowLeft20Regular />}>
            {backLabel}
          </Button>
        </Link>
        <Link to="/" className={styles.link}>
          <Button appearance="subtle" icon={<Home20Regular />}>
            {homeLabel}
          </Button>
        </Link>
      </div>
    </section>
  );
}
