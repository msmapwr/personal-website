# 性能基线

记录时间：2026-09-05

## 当前构建基线

数据来自当前 `dist/` 构建产物和 `public/images/` 静态资源。重新构建后可运行：

```powershell
npm run build
npm run report:performance
npm run test:performance
```

当前主要数据：

| 项目 | 当前值 |
|---|---:|
| 构建产物总大小 | 约 4.27 MB |
| 最大 JS chunk | 540.6 KiB |
| 最大 JS chunk gzip | 158.4 KiB |
| motion JS chunk | 118.7 KiB |
| 主入口 JS chunk | 135.3 KiB |
| 图片资源总大小 | 约 3.38 MB |
| 最大 PNG | 1.56 MB |
| 最大 WebP | 183.3 KB |

## 本地生产预览浏览器采样

2026-09-05 使用 Chromium 通过生产预览服务器采集：

| 指标 | 采样值 |
|---|---:|
| DOMContentLoaded | 36.5 ms |
| load | 36.9 ms |
| First Contentful Paint | 84 ms |
| 资源数量 | 7 |
| 浏览器报告传输大小 | 285.8 KB |

该采样只代表本机生产预览环境，不代表真实用户网络。后续 Lighthouse 阶段需要固定 CPU、网络、视口和浏览器版本后再设置严格预算。

## 浏览器基线采集

使用 Playwright Chromium 运行：

```powershell
npm run test:performance
```

测试会先构建生产版本，再通过 Vite preview 启动生产资源，输出 `PERFORMANCE_BASELINE` 记录，包含首页的 DOMContentLoaded、load、FCP、资源数量和浏览器报告的传输字节数。无头浏览器可能不提供 FCP Paint Timing，因此 FCP 为 0 时只能说明该指标不可用，不能当作真实的零耗时。正式预算仍应在部署后的固定浏览器、网络和设备条件下建立。

## 目前已知情况

- Fluent UI 相关 chunk 是最大 JavaScript 资源；
- Vite 会提示存在超过 500 KiB 的 chunk；
- 图片已经有 WebP 版本，但还没有多尺寸 `srcset`；
- 当前尚未在 CI 中运行 Lighthouse，LCP、CLS、INP 需要使用固定浏览器环境补测；
- 当前性能报告只做静态体积统计，不代替真实浏览器性能测试。

## 目标

- 最大单个 JS chunk 控制在 400 KiB 左右；
- 首屏 JS gzip 相比本基线减少至少 30%；
- 项目图片使用响应式尺寸和 WebP/AVIF；
- LCP ≤ 2.5 秒、CLS < 0.1、INP ≤ 200 ms；
- 关键交互在中端移动设备上保持稳定帧率；
- 每次构建都能发现资源体积回归。
