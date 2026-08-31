import {
  Caption1,
  Title2,
  makeStyles,
  tokens,
} from "@fluentui/react-components";
import { Link, useParams } from "react-router-dom";
import { useT } from "../i18n/LanguageContext";
import { RichText } from "../components/RichText";
import { StatusView } from "../components/StatusView";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    maxWidth: "720px",
  },
  back: {
    color: tokens.colorBrandForeground1,
    textDecoration: "none",
    fontSize: "14px",
    ":hover": {
      textDecoration: "underline",
    },
  },
  date: {
    color: tokens.colorNeutralForeground3,
  },
});

export function BlogPost() {
  const styles = useStyles();
  const { id } = useParams();
  const t = useT();
  const post = t.posts.posts.find((p) => p.id === id);
  const blogLabel = t.nav.find((n) => n.id === "blog")?.label ?? "Blog";

  if (!post) {
    return <StatusView title="404" message={t.ui.pageNotFound} backLabel={blogLabel} backTo="/blog" homeLabel={t.ui.backHome} />;
  }

  return (
    <div className={styles.root}>
      <Link to="/blog" className={styles.back}>
        ← {blogLabel}
      </Link>
      <Title2>{post.title}</Title2>
      <Caption1 className={styles.date}>{post.date}</Caption1>
      <RichText text={post.body} />
    </div>
  );
}
