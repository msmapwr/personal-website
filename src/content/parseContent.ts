import type {
  ContactItem,
  Language,
  LocaleContent,
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

const opt = (s: string) => (s === "" ? undefined : s);

function parseLocale(loc: Element): LocaleContent {
  const meta = single(loc, "meta");

  const nav: NavItem[] = Array.from(
    single(loc, "nav").getElementsByTagName("item"),
  ).map((it) => ({
    id: it.getAttribute("id") ?? "",
    label: it.textContent?.trim() ?? "",
  }));

  const hero = single(loc, "hero");
  const actions = single(hero, "actions");

  const about = single(loc, "about");
  const paragraphs = Array.from(about.getElementsByTagName("paragraph")).map(
    (p) => p.textContent?.trim() ?? "",
  );

  const skills = single(loc, "skills");
  const groups: SkillGroup[] = Array.from(
    skills.getElementsByTagName("group"),
  ).map((g) => ({
    name: g.getAttribute("name") ?? "",
    label: firstText(g, "label"),
    items: Array.from(g.getElementsByTagName("item")).map((it) => ({
      level: (it.getAttribute("level") as SkillLevel) ?? "proficient",
      label: it.textContent?.trim() ?? "",
    })),
  }));

  const contact = single(loc, "contact");
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

  const projectsEl = single(loc, "projects");
  const projects: Project[] = Array.from(
    projectsEl.getElementsByTagName("project"),
  ).map((p) => ({
    id: p.getAttribute("id") ?? "",
    name: firstText(p, "name"),
    tagline: firstText(p, "tagline"),
    description: firstText(p, "description"),
    tags: Array.from(p.getElementsByTagName("tag")).map(
      (t) => t.textContent?.trim() ?? "",
    ),
    link: firstText(p, "link"),
    demo: opt(firstText(p, "demo")),
  }));

  return {
    name: firstText(meta, "name"),
    avatar: opt(firstText(meta, "avatar")),
    nav,
    hero: {
      tagline: firstText(hero, "tagline"),
      subtitle: firstText(hero, "subtitle"),
      actions: {
        primary: firstText(actions, "primary"),
        secondary: firstText(actions, "secondary"),
      },
    },
    about: { title: firstText(about, "title"), paragraphs },
    skills: { title: firstText(skills, "title"), groups },
    contact: { title: firstText(contact, "title"), items },
    projects: { title: firstText(projectsEl, "title"), projects },
  };
}

export function parseContent(xml: string): SiteContent {
  const doc = new DOMParser().parseFromString(xml, "application/xml");
  if (doc.getElementsByTagName("parsererror").length > 0) {
    throw new Error("content.xml 解析失败，请检查 XML 格式");
  }

  const site = doc.documentElement;

  const languages: Language[] = Array.from(
    site.getElementsByTagName("language"),
  ).map((l) => ({
    id: l.getAttribute("id") ?? "",
    label: l.textContent?.trim() ?? "",
  }));

  const locales: Record<string, LocaleContent> = {};
  for (const loc of Array.from(site.getElementsByTagName("locale"))) {
    const id = loc.getAttribute("id");
    if (id) locales[id] = parseLocale(loc);
  }

  return { languages, locales };
}
