import type {
  ContactItem,
  LocalizedText,
  NavItem,
  Project,
  SiteContent,
  SkillGroup,
  SkillLevel,
} from "./types";

function single(el: Element, tag: string): Element {
  const found = el.getElementsByTagName(tag)[0];
  if (!found) throw new Error(`content.xml 缺少 <${tag}> 节点`);
  return found;
}

function firstText(el: Element, tag: string): string {
  return el.getElementsByTagName(tag)[0]?.textContent?.trim() ?? "";
}

function localized(el: Element): LocalizedText {
  return { zh: firstText(el, "zh"), en: firstText(el, "en") };
}

const opt = (s: string) => (s === "" ? undefined : s);

export function parseContent(xml: string): SiteContent {
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  if (doc.getElementsByTagName("parsererror").length > 0) {
    throw new Error("content.xml 解析失败，请检查 XML 格式");
  }

  const site = doc.documentElement;

  const meta = single(site, "meta");
  const name = firstText(meta, "name");
  const avatar = opt(firstText(meta, "avatar"));

  const nav: NavItem[] = Array.from(
    single(site, "nav").getElementsByTagName("item"),
  ).map((it) => ({
    id: it.getAttribute("id") ?? "",
    label: localized(it),
  }));

  const hero = single(site, "hero");

  const about = single(site, "about");
  const paragraphs = Array.from(about.getElementsByTagName("paragraph")).map(
    localized,
  );

  const skills = single(site, "skills");
  const groups: SkillGroup[] = Array.from(
    skills.getElementsByTagName("group"),
  ).map((g) => ({
    name: g.getAttribute("name") ?? "",
    label: localized(single(g, "label")),
    items: Array.from(g.getElementsByTagName("item")).map((it) => ({
      level: (it.getAttribute("level") as SkillLevel) ?? "proficient",
      label: localized(it),
    })),
  }));

  const contact = single(site, "contact");
  const items: ContactItem[] = (["github", "email", "bilibili"] as const).map(
    (kind) => {
      const el = single(contact, kind);
      return {
        kind,
        label: firstText(el, "label"),
        value: opt(firstText(el, "value")),
        url: opt(firstText(el, "url")),
        name: opt(firstText(el, "name")),
      };
    },
  );

  const projectsEl = single(site, "projects");
  const projects: Project[] = Array.from(
    projectsEl.getElementsByTagName("project"),
  ).map((p) => ({
    id: p.getAttribute("id") ?? "",
    name: localized(single(p, "name")),
    tagline: localized(single(p, "tagline")),
    description: localized(single(p, "description")),
    tags: Array.from(p.getElementsByTagName("tag")).map(
      (t) => t.textContent?.trim() ?? "",
    ),
    link: firstText(p, "link"),
    demo: opt(firstText(p, "demo")),
  }));

  return {
    name,
    avatar,
    nav,
    hero: {
      tagline: localized(single(hero, "tagline")),
      subtitle: localized(single(hero, "subtitle")),
      actions: {
        primary: localized(single(single(hero, "actions"), "primary")),
        secondary: localized(single(single(hero, "actions"), "secondary")),
      },
    },
    about: { title: localized(single(about, "title")), paragraphs },
    skills: { title: localized(single(skills, "title")), groups },
    contact: { title: localized(single(contact, "title")), items },
    projects: {
      title: localized(single(projectsEl, "title")),
      projects,
    },
  };
}
