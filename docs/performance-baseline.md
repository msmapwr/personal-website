# 性能基线

记录时间：2026-09-05

## 当前构建基线

数据来自当前 `dist/` 构建产物和 `public/images/` 静态资源。重新构建后可运行：

```powershell
npm run build
npm run report:performance
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
