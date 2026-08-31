# 个人网站开发计划（PLAN）

> 项目根目录：`H:\Codex file\Personal Website\personal-website-main`
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
| 4 | AppShell 布局 + Hash 路由 + 导航 | ✅ 完成 |
| 5 | 五个区块组件（Hero/About/Projects/Skills/Contact） | ✅ 完成 |
| 6 | 动效 + 响应式 | ✅ 完成 |
| 7 | 构建 + GitHub Pages 部署 | ✅ 完成 |
| 8 | 验收 + 后续调整 | ✅ 完成 |

---

## 9. 待办 / 待补

- [ ] 项目卡片配图：the-second-oasis / personal-website 暂无配图，先用品占位图，有截图再替换。
- [ ] 部署后核对 GitHub Pages 的 base path（仓库名为 `personal-website`，需配置 `base` 或自定义域名）。
- [ ] 后续如需博客/动态板块，可基于 `content.xml` 扩展 `<posts>` 节点。
- [ ] 优化打包体积：Fluent UI v9 + 图标使单 chunk 超过 500KB（gzip ~154KB），可 code-split / manualChunks 或按需导入。

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

---

## 12. 2026 改良路线图（后续执行基线）

本节根据当前代码、构建结果和 GitHub Pages 配置重新整理。旧章节保留作为历史记录；如果旧章节与本节冲突，以本节和实际代码为准。

### 12.1 改良目标

网站后续不以增加页面数量为主要目标，而是优化以下访问路径：

```text
进入首页 → 了解作者定位 → 看到代表项目 → 打开源码/演示 → 了解技能 → 联系作者
```

最终希望访客能够快速回答：

- 作者是谁，主要做什么；
- 最值得看的项目有哪些；
- 作者在项目中具体做了什么；
- 项目是否有源码、演示或截图；
- 如何联系作者；
- 网站内容是否持续更新。

### 12.2 当前基线

当前已经具备：

- React 18、TypeScript、Vite 和 Fluent UI v9 基础架构；
- 首页、关于、项目、技能、联系、博客及对应详情页；
- 13 种语言的内容切换；
- 系统、浅色、深色主题切换；
- Hash 路由、响应式导航、动效、PWA、sitemap 和 GitHub Actions 部署；
- 基础无障碍处理和 reduced motion 支持；
- 当前生产构建可以通过。

后续重点问题：

1. 文档部分仍停留在博客和详情页加入之前，需要与实际实现同步。
2. 部署说明同时存在项目站点和用户站点两种表述，需要统一最终地址。
3. XML 采用每种语言完整快照，容易出现语言缺字段、ID 不一致和格式错误。
4. 项目卡片偏重展示链接，还应突出问题、贡献、成果和项目状态。
5. 博客正文结构简单，长文阅读、标签、排序和 SEO 仍可增强。
6. 尚未建立内容检查、解析器测试和路由回归测试。
7. 未知项目、技能和文章的错误状态较简单。
8. Fluent UI 相关 chunk 较大，需在功能稳定后评估优化收益。

### 12.3 优先级

#### P0：先完成的基础工作

- [ ] 统一最终部署地址、base、sitemap、canonical、Open Graph 和 README；
- [ ] 更新本计划，使文档反映博客、详情页和 PWA 的现状；
- [ ] 增加 XML 内容完整性检查；
- [ ] 确认 GitHub Actions 可以稳定构建和部署；
- [ ] 统一 404、空数据、无图片和无演示链接的处理方式。

#### P1：直接提升网站质量

- [ ] 增强首页信息层级和精选项目入口；
- [ ] 完善项目字段、项目卡片和项目详情；
- [ ] 优化博客列表和文章阅读体验；
- [ ] 完成桌面、平板、手机、浅色、深色和键盘回归；
- [ ] 建立基础自动化测试和 CI 检查。

#### P2：稳定后再做

- [ ] 优化 Fluent UI 和图标导致的打包体积；
- [ ] 增加项目筛选、排序、搜索或 RSS；
- [ ] 在明确隐私策略后接入访问统计；
- [ ] 建立更自动化的 GitHub 项目信息同步流程。

---

## 13. 分阶段执行计划

### 阶段 A：部署、文档和线上基线（P0）

#### 任务

- [ ] 确认网站最终使用根地址还是仓库子路径；
- [ ] 根据选择检查 `vite.config.ts` 的 `base` 配置；
- [ ] 检查 sitemap、`index.html`、manifest 和 service worker 的路径；
- [ ] 统一 README、PLAN、Actions 注释和 CHANGELOG 的部署描述；
- [ ] 验证线上根路径、详情页刷新、图片、service worker 和分享 meta；
- [ ] 记录优化前的首屏体积和主要 chunk 大小。

#### 验收标准

- [ ] 线上目标地址能够正常加载；
- [ ] 首页、列表页和详情页刷新不出现资源路径错误；
- [ ] 图片和 service worker 都使用正确路径；
- [ ] sitemap 和 canonical 与最终线上地址一致；
- [ ] GitHub Actions 的 build 和 deploy job 均成功。

建议提交：

```text
docs(site): align deployment and project documentation
```

### 阶段 B：内容模型和内容质量（P0/P1）

#### 任务

- [ ] 明确项目、技能和博客的必填字段；
- [ ] 检查每个 locale 是否包含相同的导航、项目、技能和文章 ID；
- [ ] 检查 ID 是否重复；
- [ ] 检查项目链接、演示链接和图片引用；
- [ ] 检查必填文案是否为空；
- [ ] 为 XML 解析错误提供具体节点信息；
- [ ] 在 `docs/add-project.md` 中补充项目状态、精选项目和截图规范；
- [ ] 优先保证中文和英文内容完整，再逐步补齐其他语言。

#### 内容模型方向

后续可以为项目逐步增加 `problem`、`contribution`、`result`、`featured`、`status` 等字段，让访客清楚看到项目价值和作者贡献。字段扩展必须同步修改类型、解析器、所有语言内容、页面组件、文档和测试。

#### 验收标准

- [ ] 新增项目只需编辑内容源和资源文件；
- [ ] locale 缺少必要 ID 时，本地检查和 CI 都会失败；
- [ ] 无效链接和缺失图片能够被提前发现；
- [ ] 内容字段、ID 和图片映射保持一致；
- [ ] 改文案不需要修改页面组件。

### 阶段 C：首页和项目体验（P1）

#### 任务

- [ ] 首页增加精选项目摘要区；
- [ ] Hero 明确表达作者身份、主要方向和代表项目；
- [ ] 项目卡片区分查看详情、GitHub 和在线演示操作；
- [ ] 展示进行中、已完成、维护中等项目状态；
- [ ] 为图片缺失、演示缺失和链接不可用提供空状态；
- [ ] 评估按精选、手动排序或最近更新排序；
- [ ] 详情页增加截图说明、个人贡献、项目结果和相关项目入口；
- [ ] 检查卡片在手机端的按钮换行和文字溢出。

#### 验收标准

- [ ] 访客可以从首页快速打开代表项目源码或演示；
- [ ] 项目列表和详情页在 320px 以上宽度正常使用；
- [ ] 所有交互元素有清晰的 hover、focus 和 active 状态；
- [ ] 缺少可选信息时不会出现断裂布局；
- [ ] 键盘用户可以访问所有卡片操作。

### 阶段 D：博客和内容叙事（P1）

#### 任务

- [ ] 文章模型增加标签、更新时间、封面图和可选阅读时长；
- [ ] 列表按明确规则排序并显示摘要；
- [ ] 正文逐步支持段落、标题、列表、链接和代码等结构；
- [ ] 优化文章宽度、字号、行高和移动端排版；
- [ ] 长文增加章节导航或目录；
- [ ] 统一文章不存在、内容为空和图片加载失败状态；
- [ ] 为文章补充 title、description、canonical 和 Open Graph；
- [ ] 评估 RSS/Atom，只有维护成本可接受时加入。

#### 验收标准

- [ ] 新增文章不需要修改页面组件；
- [ ] 长文在手机端可读且没有水平溢出；
- [ ] 文章列表排序、标签和详情链接稳定；
- [ ] 分享文章时页面 meta 正确；
- [ ] 缺失文章显示本地化提示和返回入口。

### 阶段 E：响应式、无障碍和视觉一致性（P1）

#### 任务

- [ ] 统一页面最大宽度、间距、圆角、阴影和动效 token；
- [ ] 检查每页是否只有一个主要标题，并保持 heading 层级正确；
- [ ] 检查浅色和深色主题下所有文本对比度；
- [ ] 检查导航菜单的 Escape、焦点回收和键盘操作；
- [ ] 检查图片 alt、装饰图 `aria-hidden` 和外链名称；
- [ ] 验证 320px、375px、768px、1024px 和宽屏；
- [ ] 验证浏览器缩放 200% 和系统字体放大；
- [ ] 验证 reduced motion 下没有不必要的持续动画；
- [ ] 检查语言和主题切换不会造成明显布局跳动。

#### 验收标准

- [ ] 核心页面可以只使用键盘完成主要操作；
- [ ] 手机端没有水平滚动和遮挡；
- [ ] 主题模式下没有不可读内容；
- [ ] reduced motion 下仍保留必要状态反馈；
- [ ] 屏幕阅读器可以理解导航、标题、链接和按钮。

### 阶段 F：自动化测试和 CI（P0/P1）

#### 任务

- [ ] 为 `parseContent` 增加单元测试；
- [ ] 增加 `npm run check-content` 内容完整性检查；
- [ ] 增加 `npm run typecheck` 类型检查命令；
- [ ] 将类型检查、内容检查和生产构建接入 GitHub Actions；
- [ ] 视项目规模引入浏览器测试，优先覆盖导航、语言切换、主题切换、详情页和未知 ID；
- [ ] 建立发布前手动回归清单。

#### 推荐验证命令

```powershell
npm run typecheck
npm run check-content
npm run build
git diff --check
```

引入新的测试框架前，必须检查依赖必要性、兼容性和 lockfile 变化。

#### 验收标准

- [ ] XML 损坏时检查能明确失败；
- [ ] locale 缺字段或 ID 不一致时检查能明确失败；
- [ ] TypeScript 和生产构建通过；
- [ ] push 到 `main` 时 CI 能自动验证；
- [ ] 测试失败不会被隐藏或绕过。

### 阶段 G：性能、PWA 和 SEO（P2）

#### 任务

- [ ] 对比优化前后的首屏体积和 gzip 体积；
- [ ] 分析 Fluent UI 与图标包实际使用量；
- [ ] 评估按需导入、manual chunks 和路由级加载；
- [ ] 优化图片尺寸、格式、loading 和 decoding；
- [ ] 检查 service worker 缓存版本、更新和离线 fallback；
- [ ] 检查 manifest 图标、主题色和安装体验；
- [ ] 完善页面级 title、description、canonical 和 Open Graph；
- [ ] 只有在明确隐私方案后启用访问统计。

#### 验收标准

- [ ] 性能优化有可量化结果，或记录保持现状的理由；
- [ ] 不影响首屏核心内容和路由切换；
- [ ] 新版本能够正确更新旧 service worker 缓存；
- [ ] SEO、PWA 和资源路径检查无明显错误；
- [ ] 统计不收集不必要的个人信息。

---

## 14. 目录和代码维护约定

```text
content/                 # 多语言内容源
docs/                    # 计划和维护文档
scripts/                 # 辅助脚本和质量检查脚本
src/components/          # 跨页面复用组件
src/pages/               # 路由页面
src/content/             # 类型、解析器、图片映射
src/i18n/                # 语言状态和当前内容
src/theme/               # Fluent 主题
src/hooks/               # 可复用状态逻辑
public/                  # 静态资源、manifest、sitemap、SW
```

新增代码时：

- 页面逻辑放在 `src/pages/`，不要继续堆入 `App.tsx`；
- 两个或以上页面复用的 UI 才抽到 `src/components/`；
- 新字段先改类型，再改解析器、内容源和页面；
- 优先使用 Fluent tokens，不在页面里散落颜色和阴影常量；
- 路由 ID、内容 ID 和图片映射 ID 必须一致；
- 根目录不新增没有明确职责的文件；
- 不提交 API Key、Token、密码、`.env` 或其他敏感信息。

---

## 15. 每次改动的执行流程

### 开始前

```powershell
git status
git branch --show-current
git remote -v
```

确认已有修改归属后，再阅读相关代码、README、CHANGELOG 和本计划。

### 开发和验证

1. 判断改动规模；
2. 大更新拆成多个独立小更新；
3. 完成一个小更新后运行最小必要验证；
4. UI 改动检查桌面、移动端、主题、键盘和 reduced motion；
5. 内容改动检查 XML、多语言 ID、图片和链接。

### 提交前

```powershell
npm run build
git diff --check
git status
```

确认改动只属于当前任务，没有意外构建产物、敏感信息或用户已有修改。

### Commit 与 Push

推荐格式：

```text
feat(home): add featured projects section
fix(content): reject duplicated project ids
refactor(content): split locale validation
docs(plan): update improvement roadmap
test(content): cover locale consistency checks
```

通过验证后，按照当前已配置的 GitHub remote 推送：

```powershell
git push origin main
```

禁止 force push、擅自修改 remote、覆盖已有修改或提交敏感信息。

---

## 16. 最近推荐的三次迭代

### 迭代 1：部署与文档对齐

- 解决根地址与仓库子路径的冲突；
- 更新 README、PLAN、sitemap、meta 和 Actions 说明；
- 验证线上资源、路由、PWA 和分享信息。

### 迭代 2：内容完整性检查

- 增加 XML 结构和 locale 一致性检查；
- 检查重复 ID、空字段、无效链接和缺失图片；
- 将检查接入本地脚本和 GitHub Actions。

### 迭代 3：首页与项目展示升级

- 丰富个人定位和项目成果描述；
- 增加精选项目区；
- 改善项目卡片动作和项目详情结构；
- 完成移动端、无障碍和多语言回归。

三次迭代完成后，再根据实际需求决定是否投入博客增强、性能优化、搜索筛选、RSS 和统计功能。

---

## 17. 阶段完成标准

一个改良阶段只有同时满足以下条件才算完成：

- [ ] 目标功能或内容已经实现；
- [ ] 桌面、移动端和主题模式已验证；
- [ ] 语言切换无缺失或结构错位；
- [ ] TypeScript 检查和生产构建通过；
- [ ] 相关测试或内容检查通过；
- [ ] 已知错误状态得到处理；
- [ ] README、文档和 CHANGELOG 已同步；
- [ ] Git diff 只包含当前阶段必要修改；
- [ ] 已创建职责清晰的 Conventional Commit；
- [ ] GitHub Actions 成功运行；
- [ ] 线上目标地址已完成手动回归。
