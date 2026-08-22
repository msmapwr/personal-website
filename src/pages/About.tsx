import { Body1, Title2 } from "@fluentui/react-components";
import { content } from "../content";

export function About() {
  return (
    <div>
      <Title2>{content.about.title.zh}</Title2>
      <Body1>{content.about.title.en}</Body1>
    </div>
  );
}
