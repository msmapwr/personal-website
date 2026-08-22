# 流利设计 设计规范

style_slug: fluent-design

## 什么时候用
- 实现前需要统一团队或 AI 对这个风格的理解时使用。
- 把任务交给 AI 前，用它确定颜色、布局、组件、动效和可访问性的边界。
- 审核结果时，用它判断生成界面是否仍然属于这个风格。

## 怎么用
- 先读"概览"和"视觉系统"，理解这个风格的识别点。
- 把"布局规则"和"组件规则"当作实现边界。
- 交付前按"交付检查"逐条自检。

## 概览
微软推出的设计系统，融合了光效、深度、动效、材质和缩放五大元素，打造自然直观的跨平台体验。

## 设计意图
Fluent Design System（流利设计系统）是微软于 2017 年推出的设计语言，旨在创造跨设备的一致体验。

## 视觉系统
- Primary: #0078d4
- Secondary: #106ebe
- Accents: #ffb900, #e81123, #00cc6a, #3bf022
- Signature cues: Fluent、微软、亚克力、Reveal、光效、深度、动效、modern

## 布局规则
- 区块节奏：`py-10 md:py-16 lg:py-24`
- 容器内边距：`px-4 md:px-6 lg:px-8`
- 卡片内边距：`p-4 md:p-5`
- 默认间距：`gap-3 md:gap-4`
- 圆角：`rounded-md md:rounded-lg`

## 组件规则
- 使用亚克力（Acrylic）半透明效果 bg-white/70 backdrop-blur-xl
- 添加 Reveal 高亮边框效果（hover 时 border-white/60）
- 使用微软标志性蓝色 bg-[#0078d4]
- 保持简洁现代的布局
- 使用 Z 轴深度：hover:-translate-y-0.5 搭配阴影层级提升
- 使用 Segoe UI 字体风格
- 按钮 active:scale-[0.97] 触觉按压确认
- 所有可交互元素 focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2

## 交互与动效
- 过渡：`transition-all duration-150 ease-out`
- 悬停：`hover:scale-[1.01]`
- 按下：`active:scale-[0.99]`
- 聚焦：`focus:shadow-[0_3.2px_7.2px_rgba(0,0,0,0.13),0_0.6px_1.8px_rgba(0,0,0,0.1)]`
- 动效不得引发布局位移或抢走焦点。

## 可访问性
- 文字对比度保持 WCAG AA 或更高。
- 每个可交互元素都必须保留清晰键盘焦点。
- 移动端触控目标不低于 44px，并尊重 reduced-motion。

## 禁止项
- 禁止过度使用亚克力效果
- 禁止使用不协调的配色
- 禁止忽略焦点状态
- 禁止使用过重的阴影（Fluent 阴影是柔和分层的）
- 禁止按钮缺少 active:scale-[0.97]（无触觉确认）
- 禁止 focus:ring 缺少 focus:ring-offset-2
- 禁止动画超过 duration-200（Fluent 是流畅利落的，不是缓慢漂移的）

## 交付检查
- 替换示例内容后，页面仍应一眼识别为 流利设计。
- 按钮、卡片、输入、空状态、错误、加载状态应共享同一套视觉语言。
- 上面"禁止项"里的任何一条都没有被通用组件库的默认样式带进来。