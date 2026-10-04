import { Body1, Button, makeStyles, tokens } from "@fluentui/react-components";
import { useOnlineStatus } from "../hooks/useOnlineStatus";
import { useT } from "../i18n/LanguageContext";

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
    padding: "12px 16px",
    marginBottom: "24px",
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground2,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
});

export function OfflineNotice() {
  const styles = useStyles();
  const online = useOnlineStatus();
  const t = useT();
  if (online) return null;

  return (
    <div className={styles.root} role="status">
      <Body1>{t.ui.offlineNotice}</Body1>
      <Button onClick={() => window.location.reload()}>{t.ui.retry}</Button>
    </div>
  );
}
