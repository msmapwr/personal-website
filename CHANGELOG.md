# 更新日志

本项目遵循 [Keep a Changelog](https://keepachangelog.com/zh-CN/) 规范，版本号遵循[语义化版本](https://semver.org/lang/zh-CN/)。

当前版本 **1.6.0**。

## [Unreleased]

### 变更

- 项目路由改为按需加载，并增加不会造成布局跳动的加载占位
- Fluent UI 与图标依赖拆分为独立缓存 chunk，最大 JS chunk 降至约 492 KiB
- 项目卡片和详情页增加 AVIF → WebP → PNG 图片回退链
- 项目图片增加固定尺寸、`sizes` 和 640/1024 宽度响应式资源，降低布局跳动与移动端过度下载
- 建立共享动效 token，并限制 Reveal 位移、延迟和重复触发
- 优化首页背景动画和项目卡片 pointer 光效，后台暂停动画并合并高频更新
- 增加不阻塞路由的轻量页面过渡和 reduced motion 主题切换过渡
- 增加生产预览浏览器性能采样命令，记录导航、FCP 和资源传输基线
- 开始 1.7.0 性能与动效改良路线，记录构建和图片性能基线
- 新增 `npm run report:performance` 静态资源体积报告

## [1.6.0] - 2026-08-31

### 变更

- 统一 GitHub Pages 项目站点地址、SEO canonical 与 Open Graph 元数据说明
- 构建前自动校验多语言内容、ID、外链和内容源引用的本地资源
- 首页新增一个精选项目区，项目列表支持状态展示、精选/最近更新/名称排序和标签筛选
- 新增进行中的 Minecraft 整合包项目 Create: Stratosphere，并加入 GitHub、Modrinth 和项目截图
- 项目页增加关键词搜索、筛选清除按钮，并生成博客 RSS feed
- 增加统一的 404 恢复页面、空搜索结果提示和主内容焦点管理
- 增加 `parseContent` Vitest 单元测试与 Playwright Chromium smoke 测试
- 增加构建资源体积预算检查，CI 在部署前执行浏览器回归测试
- 项目图片增加 WebP 版本并切换为优先使用 WebP，保留 PNG 原图回退
- 将项目版本更新至 1.6.0

## [1.5.1] - 2026-08-22

### 修复

- 修复 PWA 缓存导致博客新文章不显示的问题（导航请求改为网络优先、升级 SW 缓存版本、强制检查更新）

## [1.5.0] - 2026-08-22

### 新增

- 项目 / 技能 / 博客详情页（点击卡片进入 `#/projects/:id`、`#/skills/:id`、`#/blog/:id`）
- 技能新增说明文字（13 语言）
- 博客新增文章《这个网站是怎么一步步做出来的》（自然语言版更新日志，zh/en）

## [1.4.0] - 2026-08-22

### 新增

- 博客板块（`#/blog`，含一篇「关于这个网站」文章，13 语言）
- 项目卡片配图（CardPreview + 项目截图）
- 项目详情弹窗（点击卡片查看全部截图与信息）
- PWA（manifest + service worker，可离线/安装）
- SEO（meta/OG/动态页面标题/sitemap.xml）
- 无障碍（跳到主内容链接、aria-hidden、landmark）
- 主题切换过渡动画
- 访问统计占位代码（`src/analytics.ts`，留空未启用）
- i18n 完整化（在线演示/学习中/切换按钮 aria-label 等 UI 文案收入 `content.xml`）

## [1.3.0] - 2026-08-22

### 优化

- 性能：进入时同时加载全部 5 个页面（移除路由懒加载与 Suspense，消除切换时的 Spinner 闪烁与额外请求）
- 无障碍：滚动进度条尊重 `prefers-reduced-motion`

## [1.2.1] - 2026-08-22

### 优化

- 正文字号 14px → 15px（对齐 Fluent 正文 15-16px 建议）
- 导航链接触控目标提升到 ≥44px

## [1.2.0] - 2026-08-22

### 优化

- 动效时长对齐 Fluent 规范（≤200ms：Reveal/入场 500ms→200ms，blob 呼吸放缓）
- 按钮/卡片按下 `scale` 触觉反馈（按钮 0.97、卡片 0.98）
- 自定义链接（导航/联系/卡片）补 `focus-visible` 焦点态
- 卡片 Reveal 边框增亮、联系图标悬停缩放
- Hero 圆角 16px → 12px

## [1.1.1] - 2026-08-22

### 修复

- 修复语言菜单无文字的问题（解析器未读取 `<language>` 的 `label` 属性）
- 语言菜单表面颜色显式跟随明暗主题

## [1.1.0] - 2026-08-22

### 新增

- Hero 头像展示与交错入场动画
- 亚克力（acrylic）顶栏 + 顶部滚动进度条
- 项目卡片 Fluent「Reveal」光效（鼠标跟随高亮）
- 导航激活指示与悬停微动、联系方式悬停位移动效
- 国际化（i18n）：支持 13 种语言（中、英、繁中×2、法、德、俄、日、韩、文言、葡、西、外星文），文案按语言分块

## [1.0.0] - 2026-08-22

### 新增

- Vite + React 18 + TypeScript 脚手架
- Fluent UI React v9 依赖接入
- 品牌色主题（`#0078D4`）与明暗双主题
- 主题切换（跟随系统 / 浅色 / 深色，localStorage 持久化）
- 中英双语文案内容源 `content/content.xml`
- 内容加载层（解析 `content.xml` 为结构化数据）
- AppShell 布局、Hash 路由与双语导航
- 五个区块内容（Hero 亚克力、关于我、项目卡片、技能分组、联系方式）
- 动效（滚动入场、Hero 入场、卡片悬停）与响应式（移动端汉堡菜单、reduced-motion 支持）
- 代码分割（vendor 分包 + 路由懒加载）与 GitHub Actions 自动部署
- 「添加新项目」维护文档 `docs/add-project.md`
- 开发计划 `docs/PLAN.md`
