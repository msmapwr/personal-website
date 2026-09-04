import { Spinner, makeStyles } from "@fluentui/react-components";

const useStyles = makeStyles({
  root: {
    minHeight: "240px",
    display: "grid",
    placeItems: "center",
    gap: "12px",
    alignContent: "center",
  },
});

export function RouteLoading() {
  const styles = useStyles();

  return (
    <section className={styles.root} aria-live="polite" aria-busy="true">
      <Spinner size="medium" />
    </section>
  );
}
