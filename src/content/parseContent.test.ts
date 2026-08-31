import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { JSDOM } from "jsdom";
import { describe, expect, it, beforeAll } from "vitest";
import { parseContent } from "./parseContent";

beforeAll(() => {
  const dom = new JSDOM();
  globalThis.DOMParser = dom.window.DOMParser;
});

describe("parseContent", () => {
  it("parses the localized site content", () => {
    const xmlPath = fileURLToPath(new URL("../../content/content.xml", import.meta.url));
    const site = parseContent(readFileSync(xmlPath, "utf8"));

    expect(site.languages).toHaveLength(13);
    expect(site.locales.zh.projects.projects).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "create-stratosphere",
          status: "in-progress",
        }),
      ]),
    );
    expect(site.locales.zh.projects.projects.filter((project) => project.featured)).toHaveLength(1);
  });

  it("rejects malformed XML", () => {
    expect(() => parseContent("<site><locale></site>")).toThrow("content.xml 解析失败");
  });

  it("keeps optional empty fields undefined", () => {
    const xml = `
      <site>
        <language id="zh" label="中文" />
        <locale id="zh">
          <meta><name>测试</name><avatar /></meta>
          <ui><demo>演示</demo><learning>学习中</learning></ui>
          <nav><item id="home">首页</item></nav>
          <hero><tagline>标题</tagline><subtitle>副标题</subtitle><actions><primary>主要</primary><secondary>次要</secondary></actions></hero>
          <about><title>关于</title><paragraph>内容</paragraph></about>
          <skills><group name="test"><label>技能</label><item id="one" level="proficient"><label>一</label><description>描述</description></item></group></skills>
          <contact><github><label>GitHub</label><value /><url /><name /></github><email><label>邮箱</label><value /></email><bilibili><label>Bilibili</label><value /></bilibili></contact>
          <projects title="项目"><project id="one"><name>项目</name><tagline>简介</tagline><description>描述</description><tags><tag>测试</tag></tags><link>https://example.com</link><demo /></project></projects>
          <posts title="文章"><post id="one"><title>文章</title><date>2026-01-01</date><excerpt>摘要</excerpt><body>正文</body></post></posts>
        </locale>
      </site>`;

    expect(parseContent(xml).locales.zh.projects.projects[0].demo).toBeUndefined();
    expect(parseContent(xml).locales.zh.avatar).toBeUndefined();
  });
});
