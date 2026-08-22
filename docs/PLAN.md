# 个人网站开发计划（PLAN）

> 项目根目录：`B:\dsh file\personal-website-main`
> 作者：msmapwr · 风格：微软 Fluent Design · 部署：GitHub Pages

---

## 1. 目标

做一个 **作品集 + 个人品牌主页**，面向普通路人/粉丝，突出作品与 GitHub 仓库。
核心诉求：专业简洁、Fluent 风格、微软蓝 `#0078D4`、跟随系统明暗主题、动效丰富、中英双语、桌面优先。

---

## 2. 技术栈

| 项 | 选型 | 说明 |
|---|---|---|
| 框架 | React 18 | 与 Fluent UI React 官方绑定最紧 |
| UI 库 | `@fluentui/react-components` (v9) | 微软官方 Fluent 组件 |
| 构建 | Vite | 快、GitHub Pages 友好 |
| 语言 | TypeScript | 类型安全 |
| 路由 | `react-router-dom`（Hash 路由） | 避免 GitHub Pages 刷新 404 |
| 动效 | Framer Motion + Fluent Motion | 滚动入场、视差、微交互 |
| 内容 | `content.xml`（运行时解析） | 单一内容源，改文案不改代码 |

---

## 3. 内容源机制（已定）

- 所有页面文字集中在根目录 `content.xml`，每段文字含 `<zh>` / `<en>` 双语节点。
- 网页通过 Vite `?raw` 导入 XML 文本，用 `DOMParser` 解析成结构化对象后渲染。
- 改 `content.xml` → 刷新网页即生效；文案改动不触碰组件代码。
- 项目数据为**静态配置**，仅收录 `the-second-oasis` 与 `personal-website` 两个项目。

---

## 4. 页面结构

| 路由 | 区块 | 内容 |
|---|---|---|
| `#/` | Hero | 名字 + 定位语 + 副标题，蓝调亚克力背景，CTA 按钮 |
| `#/about` | 关于我 | 3 段简介（学生 / Minecraft / 第二绿洲） |
| `#/projects` | 项目展示 | 2 张项目卡片（名称、tagline、描述、技术标签、GitHub/演示链接） |
| `#/skills` | 技能 | 4 组技能卡片（掌握 / 学习中） |
| `#/contact` | 联系 | GitHub / Email / Bilibili |

> 导航项：首页 / 关于我 / 项目 / 技能 / 联系（中英双语，来自 `content.xml` 的 `<nav>`）。

---

## 5. 设计规范（Fluent）

- **主题**：Fluent v9 theme token，`colorScheme="system"` 跟随系统明暗，保留手动切换。
- **品牌色**：微软蓝 `#0078D4`（brand ramp 主色）。
- **视觉**：大量留白、卡片圆角 + 柔和阴影、亚克力（acrylic）材质背景。
- **排版**：Fluent 字体栈（Segoe UI / 系统字体），标题大号、正文克制。
- **响应式**：桌面优先，移动端可用（导航折叠为汉堡菜单）。

---

## 6. 动效方案

- 首屏 Hero：亚克力背景 + 淡入上移。
- 区块滚动入场：`whileInView` 淡入 + 位移。
- 项目卡片：悬停微抬起 + 阴影加深。
- 导航：平滑滚动 + 当前项高亮。
- 保持 `prefers-reduced-motion` 降级。

---

## 7. 项目结构（规划）

```
personal-website-main/
├── content.xml              # 文案内容源（双语，已建）
├── PLAN.md                  # 本文件
├── index.html               # Vite 入口
├── package.json
├── vite.config.ts
├── tsconfig.json
├── public/                  # 静态资源（图标、占位图等）
└── src/
    ├── main.tsx
    ├── App.tsx              # 路由 + 主题 Provider
    ├── content/
    │   ├── content.xml      # 或从根目录 ?raw 导入
    │   └── parseContent.ts  # XML → 结构化对象
    ├── theme/
    │   └── fluentTheme.ts   # 主题 + 品牌色
    ├── components/
    │   ├── AppShell.tsx     # 布局 + 导航 + 页脚
    │   ├── Hero.tsx
    │   ├── About.tsx
    │   ├── Projects.tsx
    │   ├── Skills.tsx
    │   └── Contact.tsx
    └── hooks/
        └── useContent.ts    # 加载并解析内容
```

---

## 8. 实施步骤

| 阶段 | 内容 | 状态 |
|---|---|---|
| 0 | 需求澄清 + 内容素材（`content.xml` 已建） | ✅ 完成 |
| 1 | Vite + React + TS 脚手架，装依赖 | ✅ 完成 |
| 2 | Fluent 主题接入 + 品牌色 + 明暗切换 | ✅ 完成 |
| 3 | 内容加载层（解析 `content.xml`） | ✅ 完成 |
| 4 | AppShell 布局 + Hash 路由 + 导航 | ⬜ 待做 |
| 5 | 五个区块组件（Hero/About/Projects/Skills/Contact） | ⬜ 待做 |
| 6 | 动效 + 响应式 | ⬜ 待做 |
| 7 | 构建 + GitHub Pages 部署 | ⬜ 待做 |
| 8 | 验收 + 后续调整 | ⬜ 待做 |

---

## 9. 待办 / 待补

- [ ] 项目卡片配图：the-second-oasis / personal-website 暂无配图，先用品占位图，有截图再替换。
- [ ] 部署后核对 GitHub Pages 的 base path（仓库名为 `personal-website`，需配置 `base` 或自定义域名）。
- [ ] 后续如需博客/动态板块，可基于 `content.xml` 扩展 `<posts>` 节点。

---

## 10. 网络与环境注意（本机）

- npm 走镜像 `https://registry.npmmirror.com`（`.npmrc` 已配）。
- GitHub 直连不稳时，用 `api.github.com` + `python` urllib 取数据（已用于读取 README）。
## 11.用户要求,特别注意⚠️

- 这是用户写的
- 要有一个 GitHub Actions 来自动构建
- 位置直接放在 https://msmapwr.github.io/ 
- 要有一个 Skill/说明 ，用途：在没有上下文时将新项目添加到个人网页中
- 文件结构清晰，根目录不要放太多文件
- 代码尽量拆开，易于维护