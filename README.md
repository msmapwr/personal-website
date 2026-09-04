# personal-website

msmapwr 的个人作品集与开发记录网站。

这个网站用来介绍作者本人、展示正在维护和已经完成的项目，也记录网站和其他项目的开发过程。内容和配置都保存在仓库中，修改后由 GitHub Actions 构建并发布到 GitHub Pages。

线上地址：<https://msmapwr.github.io/personal-website/>

## 网站内容

目前网站包含以下页面：

- 首页：介绍作者定位、提供项目和联系方式入口，并展示一个精选项目；
- 关于我：介绍个人背景、兴趣和创作方向；
- 项目：展示名称、简介、技术标签、状态、截图、源码和在线演示；
- 项目详情：查看单个项目的完整介绍和截图；
- 技能：按类别展示游戏创作、编程语言、桌面开发和工具链；
- 技能详情：查看单项技能的说明和当前学习状态；
- 博客：记录项目开发、网站改动和其他技术内容；
- 联系：提供 GitHub、Email 和 Bilibili 联系方式。

项目列表支持：

- 按精选项目排序；
- 按最近更新时间排序；
- 按项目名称排序；
- 按技术标签筛选。

博客还提供 RSS feed：<https://msmapwr.github.io/personal-website/feed.xml>。它由构建脚本根据中文文章内容生成。

当前展示的项目包括：

- 第二绿洲：已完成的回合制网页策略桌游项目；
- personal-website：正在优化的个人网站项目；
- Create: Stratosphere：进行中的 Minecraft 整合包项目。

## 设计方向

网站采用微软 Fluent Design 风格，使用微软蓝 `#0078D4` 作为品牌色。页面使用卡片、圆角、柔和阴影、亚克力感背景和轻量动效，但内容仍然放在首要位置。

视觉方向主要包括：

- 使用 Fluent UI React v9 的主题 token 管理颜色、字体和阴影；
- 支持浅色、深色和跟随系统三种主题模式；
- 使用较大的首屏标题和清晰的内容层级；
- 项目图片使用较大的预览区域，帮助访客快速区分项目；
- 卡片、按钮和导航提供 hover、active 与 focus 状态；
- 在移动端折叠导航，避免桌面布局挤压小屏幕；
- 尊重 `prefers-reduced-motion`，在用户关闭动态效果时降低动画。

动效主要用于页面进入、卡片交互和滚动位置，不影响项目介绍、链接和导航的直接使用。

## 技术栈

- React 18 + TypeScript
- [Fluent UI React v9](https://react.fluentui.dev/)（`@fluentui/react-components`）
- Vite 5
- React Router 6，使用 Hash 路由
- Framer Motion
- fast-xml-parser，仅用于构建前的内容检查
- Vitest + jsdom，用于内容解析单元测试
- Playwright，用于 Chromium 浏览器级 smoke 测试
- GitHub Actions
- GitHub Pages

## 运行方式

需要安装 Node.js 和 npm。安装依赖后，启动本地开发服务器：

```bash
npm install
npm run dev
```

开发服务器默认地址是 `http://localhost:5173`。修改 React 代码或 `content/content.xml` 后，页面会通过 Vite 热更新。

生产构建使用：

```bash
npm run build
```

构建会自动执行类型检查、内容检查、单元测试、RSS 生成、Vite 打包和资源体积预算检查。单独运行测试：

```bash
npm run test
npm run test:browser
npm run report:performance
```

首次运行浏览器测试前，需要安装 Chromium：

```bash
npx playwright install chromium
```

`npm run report:performance` 需要先完成生产构建，会输出 JS/CSS 和图片资源的总大小、gzip 估算以及最大的资源，方便比较性能优化前后的变化。

构建会依次执行 TypeScript 类型检查、多语言内容检查和 Vite 生产构建。

也可以单独运行检查：

```bash
npm run typecheck
npm run check-content
```

本地预览生产构建：

```bash
npm run preview
```

构建输出位于 `dist/`，它是构建产物，不应手动编辑。

## 内容维护

网站文案集中在 `content/content.xml`。这个文件包含语言列表和多个 `<locale>` 节点，每个 locale 保存该语言下的一份完整内容快照。

内容层的处理流程如下：

```text
content/content.xml
        ↓
Vite ?raw 导入 XML 文本
        ↓
src/content/parseContent.ts 使用 DOMParser 解析
        ↓
src/content/types.ts 提供 TypeScript 类型
        ↓
src/i18n/LanguageContext.tsx 返回当前语言内容
        ↓
页面和组件渲染
```

当前内容包括中文、英文、繁体中文、法语、德语、俄语、日语、韩语、文言、葡萄牙语、西班牙语和外星文，共 13 种语言。

修改普通文案时，一般只需要编辑 `content/content.xml`，不需要修改页面组件。新增或修改内容时需要注意：

- 所有语言的导航、项目和技能 ID 应保持一致；
- 项目、技能和文章 ID 应保持稳定，避免破坏详情页链接；
- XML 中的 `&` 必须写成 `&amp;`；
- 外链应使用完整的 `http` 或 `https` 地址；
- 图片路径要对应 `public/` 下真实存在的文件；
- 博客文章可以先在部分语言发布，之后再补充其他语言；
- 内容修改后运行 `npm run check-content`。

更完整的项目添加流程见 [docs/add-project.md](docs/add-project.md)。

## 项目图片

项目图片没有放在 XML 中，因为图片不需要翻译。项目 ID 与图片路径的对应关系集中在 `src/content/projectImages.ts`。当前页面优先使用 WebP，PNG 原图仍保留，方便兼容、重新压缩或后续生成其他格式。

新增项目图片时：

1. 将图片放入 `public/images/<project-id>/`；
2. 在 `src/content/projectImages.ts` 中增加相同 ID；
3. 如需压缩，生成同名 `.webp` 文件并保留 PNG 原图；
4. 将项目截图按展示顺序写入数组；
5. 运行内容检查和生产构建；
6. 检查图片在浅色、深色和手机布局下的显示效果。

当前项目图片包括第二绿洲、个人网站和 Create: Stratosphere 的截图。

## 主题和语言切换

主题状态由 `src/hooks/useThemeMode.ts` 管理：

- `system`：跟随操作系统；
- `light`：浅色主题；
- `dark`：深色主题。

主题选择会保存到浏览器 `localStorage`。系统主题发生变化时，跟随系统模式会自动更新。

语言状态由 `src/i18n/LanguageContext.tsx` 管理。语言选择同样会保存到 `localStorage`，刷新页面后继续使用上一次选择。切换语言时，页面的 `html lang` 属性也会同步更新。

## 路由

网站使用 Hash 路由，适合 GitHub Pages 项目站点，不需要额外的服务器端路由配置。

| 路由 | 用途 |
|---|---|
| `#/` | 首页 |
| `#/about` | 关于我 |
| `#/projects` | 项目列表 |
| `#/projects/:id` | 项目详情 |
| `#/skills` | 技能列表 |
| `#/skills/:id` | 技能详情 |
| `#/contact` | 联系方式 |
| `#/blog` | 博客列表 |
| `#/blog/:id` | 博客详情 |

详情页通过项目、技能或文章 ID 查找内容。ID 不存在时，页面会显示 404 状态，并提供返回列表页的链接。

## PWA 和缓存

网站包含 `public/manifest.json` 和 `public/sw.js`，支持安装到设备并提供离线访问能力。

Service Worker 当前采用两种策略：

- 页面导航使用网络优先，网络失败时回退到缓存，确保博客和页面更新可以及时获取；
- 静态资源使用缓存优先，首次访问后可以在网络不可用时继续加载已缓存内容。

如果调整缓存策略或缓存资源，需要同步检查缓存版本和更新流程。发布新版本后，应确认 Service Worker 能够激活并清理旧缓存。

## 无障碍与响应式

当前已经包含：

- 跳转到主内容的快捷链接；
- 键盘焦点样式；
- 导航、语言切换和主题切换的可理解标签；
- 至少 44px 的主要导航触控目标；
- 图片替代文本；
- 装饰性元素不参与屏幕阅读；
- reduced motion 支持。

修改 UI 时，建议检查 320px、375px、768px、1024px 和宽屏桌面，并同时检查浅色主题、深色主题、键盘操作、浏览器缩放和长文本换行。页面不应依赖 hover 才能完成核心操作。

## 目录结构

```text
.
├── content/
│   └── content.xml             # 多语言内容源
├── docs/
│   ├── PLAN.md                 # 改良计划
│   └── add-project.md          # 新增项目说明
├── public/
│   ├── images/                 # 头像和项目截图
│   ├── manifest.json           # PWA 配置
│   ├── sitemap.xml             # 搜索引擎站点地图
│   └── sw.js                   # Service Worker
├── scripts/
│   ├── check-content.mjs       # 构建前内容检查
│   ├── fetch_repo.py           # 获取 GitHub 仓库信息的辅助脚本
│   └── ...
├── src/
│   ├── components/             # 跨页面复用组件
│   ├── content/                # 内容类型、解析器和图片映射
│   ├── hooks/                  # 自定义 hooks
│   ├── i18n/                   # 语言状态和当前文案
│   ├── pages/                  # 路由页面
│   ├── theme/                  # Fluent 主题和品牌色
│   ├── App.tsx                 # Provider、路由和应用入口
│   └── main.tsx                # React 挂载、统计和 Service Worker 注册
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

组件和页面保持分离。`App.tsx` 负责应用级 Provider 和路由，页面逻辑放在 `src/pages/`，跨页面复用的界面放在 `src/components/`。

## GitHub Pages 部署

推送到 `main` 后，`.github/workflows/deploy.yml` 会执行以下流程：

```text
Checkout
  ↓
安装 Node.js 20
  ↓
npm ci
  ↓
npm run build
  ↓
上传 dist artifact
  ↓
部署到 GitHub Pages
```

项目站点使用相对 `base` 配置和 Hash 路由，目标地址是：

<https://msmapwr.github.io/personal-website/>

仓库的 Settings → Pages 中需要将部署来源设为 GitHub Actions。

## SEO 和分享信息

`index.html` 提供站点描述、主题色、canonical、Open Graph 类型、标题、描述和分享图片。`public/sitemap.xml` 提供站点地图。

如果站点地址、页面结构或分享图片发生变化，需要同步检查 canonical、Open Graph URL、分享图片、sitemap、manifest 的 `start_url` 和 `scope`，以及 Service Worker 的缓存路径。

## 内容检查

`scripts/check-content.mjs` 使用 `fast-xml-parser` 检查内容源。当前会检查：

- XML 是否有效；
- 语言 ID 是否重复；
- locale 是否与语言列表对应；
- 导航、项目、技能和文章 ID 是否重复；
- 各语言的导航、项目和技能 ID 是否一致；
- 新增 UI 文案是否完整；
- 项目、技能和文章的必要字段；
- 项目状态和更新时间；
- GitHub、Modrinth 等外链格式；
- 头像等本地资源是否存在。

博客文章可以按语言逐步发布，因此不同语言的文章数量不需要完全相同。

## 开发约定

开发时遵循以下习惯：

- 修改前先检查 `git status`；
- 不覆盖工作区中已有的用户改动；
- 优先使用项目现有依赖；
- 修改内容源时同步运行 `npm run check-content`；
- 修改代码时至少运行 `npm run build`；
- 修改 UI 时检查移动端、主题、键盘和 reduced motion；
- 修改公共数据结构时同步更新类型、解析器、内容和文档；
- 不将密钥、Token、密码或 `.env` 文件提交到仓库；
- 每个独立功能使用清晰的 Conventional Commit；
- 提交前运行 `git diff --check`；
- 确认 remote 和分支正确后再 push。

推荐的提交格式：

```text
feat(projects): add project filtering
fix(content): reject duplicate locale ids
docs(readme): expand project documentation
refactor(theme): centralize design tokens
```

## 后续计划

### P0

- 保持部署路径、SEO、PWA 和文档一致；
- 继续完善内容检查；
- 统一错误页、空状态和资源缺失状态。

### P1

- 继续完善首页项目叙事；
- 补充项目贡献、结果和项目状态信息；
- 改善博客文章结构和阅读体验；
- 增加解析器、内容层和关键路由测试；
- 完成移动端、键盘和屏幕阅读器回归。

### P2

- 分析 Fluent UI chunk 体积并评估拆包；
- 优化项目图片和首屏资源；
- 评估项目搜索、筛选增强和 RSS；
- 在明确隐私方案后决定是否启用访问统计。

详细任务拆解和验收标准见 [docs/PLAN.md](docs/PLAN.md)。

## 版本

当前版本详见 [CHANGELOG.md](CHANGELOG.md)。
