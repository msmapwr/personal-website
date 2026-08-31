# 如何添加一个新项目（Add a new project）

本文档说明如何**在没有上下文的情况下**，向个人网站添加一个新的项目展示。适用对象：未来的 AI 助手或维护者。

## 原理

- 所有文案集中在 `content/content.xml`，**按语言分块**：`<languages>` 列出可用语言，每个 `<locale id="...">` 是该语言的完整快照。
- 网页用 `src/content/parseContent.ts` 解析 XML，`src/i18n/LanguageContext.tsx` 的 `useT()` 返回当前语言的内容。
- **添加项目 = 在每个 `<locale>` 的 `<projects>` 下各加一个 `<project>` 节点**，无需改任何代码。

## 步骤

1. 打开 `content/content.xml`。
2. 找到每个 `<locale>`（如 `zh` 和 `en`）里的 `<projects>` 节点。
3. 在**每个语言**的 `<projects>` 下各新增一个 `<project id="...">`，中文写进 `zh`，英文写进 `en`。模板：

```xml
<project id="project-id">
  <name>项目名（该语言）</name>
  <tagline>一句话简介（该语言）</tagline>
  <description>详细描述（该语言，2~4 句）</description>
  <tags>
    <tag>技术标签 1</tag>
    <tag>技术标签 2</tag>
  </tags>
  <link>https://github.com/msmapwr/xxx</link>
  <demo>https://msmapwr.github.io/xxx/</demo>
</project>
```

4. `id` 用项目名（kebab-case），各语言必须一致；`<demo>` 可选，无在线演示就删除该行。
5. 保存后刷新网页（或重新构建），新卡片自动出现。

6. 执行 `npm run check-content`，确认所有语言的项目 ID 一致、链接格式有效，且 XML 没有结构错误。

## 新增语言

1. 在 `<languages>` 里加一条 `<language id="xx" label="语言名" />`。
2. 复制一个现有 `<locale>` 块，把 `id` 改成新语言，翻译所有文本。

## 获取项目信息

- 项目简介、技术栈可从 GitHub 仓库 README 获取。
- 辅助脚本 `scripts/fetch_repo.py` 可拉取指定仓库的 README 和元数据：

```bash
# 修改脚本里的 REPO 变量为「用户名/仓库名」，再运行：
python scripts/fetch_repo.py
```

## 提交

- 遵循 Conventional Commits，例如：`feat: 新增项目 xxx`
- 若项目正式发布，同步在 `CHANGELOG.md` 的 `## [未发布]` 下补充一条。

## 注意

- 每个 `<locale>` 是完整、自包含的语言快照；新增或修改文本时每个语言都要同步。
- 技术标签用 `<tag>`，可以有多个。
- 不要改动 `<site>` 之外的结构，也不要破坏 XML（`&` 要写成 `&amp;`）。
