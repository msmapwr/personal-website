import { Body1, Title2 } from "@fluentui/react-components";
import { content } from "../content";

export function Skills() {
  return (
    <div>
      <Title2>{content.skills.title.zh}</Title2>
      <Body1>{content.skills.title.en}</Body1>
    </div>
  );
}
