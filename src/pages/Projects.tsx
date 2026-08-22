import { Body1, Title2 } from "@fluentui/react-components";
import { content } from "../content";

export function Projects() {
  return (
    <div>
      <Title2>{content.projects.title.zh}</Title2>
      <Body1>{content.projects.title.en}</Body1>
    </div>
  );
}
