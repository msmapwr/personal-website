import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { XMLParser, XMLValidator } from "fast-xml-parser";

const contentPath = resolve("content/content.xml");
const publicPath = resolve("public");
const errors = [];

const asArray = (value) => (Array.isArray(value) ? value : value ? [value] : []);
const text = (value) => {
  if (typeof value === "string") return value.trim();
  if (value && typeof value === "object" && typeof value["#text"] === "string") {
    return value["#text"].trim();
  }
  return "";
};

function fail(message) {
  errors.push(message);
}

function required(value, path) {
  if (!text(value)) fail(`${path} 不能为空`);
}

function uniqueIds(items, path) {
  const seen = new Set();
  for (const item of items) {
    const id = text(item?.id);
    if (!id) {
      fail(`${path} 存在缺少 id 的条目`);
      continue;
    }
    if (seen.has(id)) fail(`${path} 存在重复 id: ${id}`);
    seen.add(id);
  }
  return seen;
}

function expectSameIds(actual, expected, path) {
  for (const id of expected) {
    if (!actual.has(id)) fail(`${path} 缺少 id: ${id}`);
  }
  for (const id of actual) {
    if (!expected.has(id)) fail(`${path} 存在基准语言没有的 id: ${id}`);
  }
}

function validUrl(value, path) {
  const url = text(value);
  if (!url) {
    fail(`${path} 不能为空`);
    return;
  }

  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      fail(`${path} 必须使用 http 或 https 协议`);
    }
  } catch {
    fail(`${path} 不是有效 URL: ${url}`);
  }
}

function checkLocalAsset(value, path) {
  const asset = text(value);
  if (!asset) return;
  if (asset.startsWith("http://") || asset.startsWith("https://")) return;

  const filePath = resolve(publicPath, asset);
  if (!filePath.startsWith(publicPath) || !existsSync(filePath)) {
    fail(`${path} 指向的本地资源不存在: ${asset}`);
  }
}

function checkLocale(locale, index) {
  const prefix = `locale[${locale.id || index}]`;
  required(locale.id, `${prefix}.@id`);
  required(locale.meta?.name, `${prefix}.meta.name`);
  checkLocalAsset(locale.meta?.avatar, `${prefix}.meta.avatar`);

  const uiFields = [
    "demo",
    "learning",
    "switchLanguage",
    "switchTheme",
    "menu",
    "close",
    "skipToContent",
  ];
  for (const field of uiFields) required(locale.ui?.[field], `${prefix}.ui.${field}`);

  const nav = asArray(locale.nav?.item);
  if (nav.length === 0) fail(`${prefix}.nav 至少需要一个导航项`);
  uniqueIds(nav, `${prefix}.nav.item`);
  for (const item of nav) required(item, `${prefix}.nav.item[${item.id}]`);

  required(locale.hero?.tagline, `${prefix}.hero.tagline`);
  required(locale.hero?.subtitle, `${prefix}.hero.subtitle`);
  required(locale.hero?.actions?.primary, `${prefix}.hero.actions.primary`);
  required(locale.hero?.actions?.secondary, `${prefix}.hero.actions.secondary`);

  required(locale.about?.title, `${prefix}.about.title`);
  if (asArray(locale.about?.paragraph).length === 0) {
    fail(`${prefix}.about 至少需要一个 paragraph`);
  }

  required(locale.skills?.title, `${prefix}.skills.title`);
  const skills = asArray(locale.skills?.group).flatMap((group) => asArray(group.item));
  if (skills.length === 0) fail(`${prefix}.skills 至少需要一个技能`);
  uniqueIds(skills, `${prefix}.skills.group.item`);
  for (const skill of skills) {
    required(skill.label, `${prefix}.skills.item[${skill.id}].label`);
    required(skill.description, `${prefix}.skills.item[${skill.id}].description`);
    if (skill.level !== "proficient" && skill.level !== "learning") {
      fail(`${prefix}.skills.item[${skill.id}].@level 必须为 proficient 或 learning`);
    }
  }

  required(locale.contact?.title, `${prefix}.contact.title`);
  for (const kind of ["github", "email", "bilibili"]) {
    const contact = locale.contact?.[kind];
    required(contact?.label, `${prefix}.contact.${kind}.label`);
    if (kind === "email") {
      const email = text(contact?.value);
      if (!email.includes("@")) fail(`${prefix}.contact.email.value 不是有效邮箱地址`);
    } else {
      validUrl(contact?.url, `${prefix}.contact.${kind}.url`);
    }
  }

  required(locale.projects?.title, `${prefix}.projects.title`);
  const projects = asArray(locale.projects?.project);
  uniqueIds(projects, `${prefix}.projects.project`);
  for (const project of projects) {
    const projectPath = `${prefix}.projects.project[${project.id}]`;
    required(project.name, `${projectPath}.name`);
    required(project.tagline, `${projectPath}.tagline`);
    required(project.description, `${projectPath}.description`);
    if (asArray(project.tags?.tag).length === 0) fail(`${projectPath}.tags 至少需要一个 tag`);
    validUrl(project.link, `${projectPath}.link`);
    if (text(project.demo)) validUrl(project.demo, `${projectPath}.demo`);
  }

  required(locale.posts?.title, `${prefix}.posts.title`);
  const posts = asArray(locale.posts?.post);
  uniqueIds(posts, `${prefix}.posts.post`);
  for (const post of posts) {
    const postPath = `${prefix}.posts.post[${post.id}]`;
    required(post.title, `${postPath}.title`);
    required(post.date, `${postPath}.date`);
    required(post.excerpt, `${postPath}.excerpt`);
    required(post.body, `${postPath}.body`);
  }

  return {
    id: text(locale.id),
    nav: uniqueIds(nav, `${prefix}.nav.item`),
    skills: uniqueIds(skills, `${prefix}.skills.group.item`),
    projects: uniqueIds(projects, `${prefix}.projects.project`),
    posts: uniqueIds(posts, `${prefix}.posts.post`),
  };
}

if (!existsSync(contentPath)) {
  fail(`找不到内容文件: ${contentPath}`);
} else {
  const xml = readFileSync(contentPath, "utf8");
  const validation = XMLValidator.validate(xml);

  if (validation !== true) {
    fail(`content.xml 不是有效 XML: ${validation.err.msg}（第 ${validation.err.line} 行）`);
  } else {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: "",
      trimValues: true,
    });
    const site = parser.parse(xml).site;
    const languages = asArray(site?.languages?.language);
    const locales = asArray(site?.locale);

    const languageIds = uniqueIds(languages, "languages.language");
    for (const language of languages) required(language.label, `language[${language.id}].@label`);

    const localeIds = uniqueIds(locales, "site.locale");
    expectSameIds(localeIds, languageIds, "site.locale");

    const summaries = locales.map(checkLocale);
    const base = summaries[0];
    if (base) {
      for (const locale of summaries.slice(1)) {
        expectSameIds(locale.nav, base.nav, `locale[${locale.id}].nav.item`);
        expectSameIds(locale.skills, base.skills, `locale[${locale.id}].skills.group.item`);
        expectSameIds(locale.projects, base.projects, `locale[${locale.id}].projects.project`);
        // 博客文章可以按语言逐步发布；每种语言内部仍会校验重复 ID 和必填字段。
      }
    }
  }
}

if (errors.length > 0) {
  console.error(`内容检查失败，共 ${errors.length} 项：`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("内容检查通过：XML、语言、ID、链接和本地资源均有效。");
}
