# 如何添加一个新项目（Add a new project）

本文档说明如何**在没有上下文的情况下**，向个人网站添加一个新的项目展示。适用对象：未来的 AI 助手或维护者。

## 原理

- 项目数据是**静态配置**，全部存在 `content/content.xml` 的 `<projects>` 节点下。
- 网页用 `src/content/parseContent.ts` 解析该 XML，渲染成项目卡片（`src/components/ProjectCard.tsx`）。
- **添加项目 = 在 XML 里加一个 `<project>` 节点，无需改任何代码。**

## 步骤

1. 打开 `content/content.xml`。
2. 找到 `<projects>` 节点，在已有 `<project>` 之后新增一个 `<project id="...">`。
3. 按下面模板填写（所有文本都要中英双语）：

```xml
<project id="project-id">
  <name>
    <zh>项目中文名</zh>
    <en>Project English Name</en>
  </name>
  <tagline>
    <zh>一句话简介（中文）</zh>
    <en>One-line tagline (English)</en>
  </tagline>
  <description>
    <zh>详细描述（中文，2~4 句）</zh>
    <en>Detailed description (English)</en>
  </description>
  <tags>
    <tag>技术标签 1</tag>
    <tag>技术标签 2</tag>
  </tags>
  <link>https://github.com/msmapwr/xxx</link>
  <demo>https://msmapwr.github.io/xxx/</demo>
</project>
```

4. `id` 用项目名（kebab-case）；`<demo>` 可选，无在线演示就删除该行。
5. 保存后刷新网页（或重新构建），新卡片自动出现。

## 获取项目信息

- 项目简介、技术栈等信息可从 GitHub 仓库的 README 获取。
- 仓库内有辅助脚本 `scripts/fetch_repo.py`，可拉取指定仓库的 README 和元数据：

```bash
# 修改脚本里的 REPO 变量为「用户名/仓库名」，再运行：
python scripts/fetch_repo.py
```

## 提交

- 遵循 Conventional Commits，例如：`feat: 新增项目 xxx`
- 若项目正式发布，同步在 `CHANGELOG.md` 的 `## [indev]` 下补充一条。

## 注意

- 每个文本节点必须有 `<zh>`（中文）和 `<en>`（英文）两个子节点。
- 技术标签用 `<tag>`，可以有多个。
- 不要改动 `<site>` 之外的结构，也不要用特殊字符破坏 XML（`&` 要写成 `&amp;`）。
