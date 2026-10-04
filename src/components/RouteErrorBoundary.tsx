import { Component, type ReactNode } from "react";
import { Body1, Button, Title2, makeStyles } from "@fluentui/react-components";
import { useT } from "../i18n/LanguageContext";

const useStyles = makeStyles({
  root: { display: "flex", flexDirection: "column", gap: "16px", minHeight: "240px" },
  actions: { display: "flex", flexWrap: "wrap", gap: "12px" },
});

export function RouteLoadError() {
  const styles = useStyles();
  const t = useT();
  return (
    <section className={styles.root} role="alert" aria-labelledby="route-error-title">
      <Title2 as="h1" id="route-error-title">{t.ui.routeLoadFailed}</Title2>
      <Body1>{t.ui.routeLoadHelp}</Body1>
      <div className={styles.actions}>
        <Button appearance="primary" onClick={() => window.location.reload()}>{t.ui.retry}</Button>
        <Button onClick={() => {
          window.location.hash = "#/";
          window.location.reload();
        }}>{t.ui.backHome}</Button>
      </div>
    </section>
  );
}

export class RouteErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}
