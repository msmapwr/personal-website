import { Body1, Title2 } from "@fluentui/react-components";
import { content } from "../content";

export function Contact() {
  return (
    <div>
      <Title2>{content.contact.title.zh}</Title2>
      <Body1>{content.contact.title.en}</Body1>
    </div>
  );
}
