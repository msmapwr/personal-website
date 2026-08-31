import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { XMLParser } from "fast-xml-parser";

const siteUrl = "https://msmapwr.github.io/personal-website";
const xml = readFileSync(resolve("content/content.xml"), "utf8");
const site = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "", trimValues: true }).parse(xml).site;
const zh = (Array.isArray(site.locale) ? site.locale : [site.locale]).find((locale) => locale.id === "zh");
const posts = zh?.posts?.post ? (Array.isArray(zh.posts.post) ? zh.posts.post : [zh.posts.post]) : [];
const escape = (value) => String(value ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
const entries = posts.map((post) => `
    <item>
      <title>${escape(post.title)}</title>
      <link>${siteUrl}/#/blog/${escape(post.id)}</link>
      <guid isPermaLink="true">${siteUrl}/#/blog/${escape(post.id)}</guid>
      <pubDate>${new Date(`${post.date}T00:00:00+08:00`).toUTCString()}</pubDate>
      <description>${escape(post.excerpt)}</description>
    </item>`).join("");
const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Msmapwr · 个人网站</title>
    <link>${siteUrl}/</link>
    <description>Msmapwr 的个人作品集与开发记录</description>
    <language>zh-CN</language>${entries}
  </channel>
</rss>
`;
writeFileSync(resolve("public/feed.xml"), feed, "utf8");
console.log(`RSS feed generated: ${posts.length} posts`);
