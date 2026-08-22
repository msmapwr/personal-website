# personal-website

> msmapwr 的个人网站 · 微软 Fluent Design 风格 · 中英双语

作品集 + 个人品牌主页，展示我的作品与 GitHub 仓库。

## 技术栈

- React 18 + TypeScript
- [Fluent UI React v9](https://react.fluentui.dev/)（`@fluentui/react-components`）
- Vite 5
- React Router（Hash 路由）
- Framer Motion（动效）

## 功能

- Fluent Design 风格，品牌色微软蓝 `#0078D4`
- 跟随系统明暗主题，支持手动切换（浅色 / 深色 / 跟随系统）
- 中英双语文案，集中管理于 `content/content.xml`
- 桌面优先，移动端可用

## 快速开始

```bash
npm install
npm run dev      # 开发预览 http://localhost:5173
npm run build    # 生产构建到 dist/
```

> 本机沙箱环境下 `npm run dev`/`build` 需要完整权限（esbuild 需 spawn 子进程）；正式构建走 GitHub Actions，无此限制。

## 项目结构

```
.
├── content/          # 文案内容源（content.xml，双语）
├── docs/             # 开发计划（PLAN.md）
├── scripts/          # 辅助脚本
├── src/
│   ├── components/   # UI 组件
│   ├── hooks/        # 自定义 hook
│   ├── theme/        # Fluent 主题与品牌色
│   ├── App.tsx
│   └── main.tsx
├── index.html
└── vite.config.ts
```

## 编辑文案

所有页面文字都在 `content/content.xml`，每段文字含 `<zh>`（中文）与 `<en>`（英文）两个节点。改完刷新页面即生效，无需改代码。

新增项目：在 `content.xml` 的 `<projects>` 节点下添加一个 `<project>` 即可（含名称、简介、技术标签、链接）。

## 部署

- 目标地址：<https://msmapwr.github.io/>
- 由 GitHub Actions 自动构建部署。

## 版本

当前版本 **indev**（开发中），全部阶段完成后发布 **1.0.0**。详见 [CHANGELOG.md](CHANGELOG.md)。
