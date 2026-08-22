STYLEKIT_STYLE_REFERENCE
style_name: 流利设计
style_slug: fluent-design
style_source: /styles/fluent-design

# Creative Brief

## 什么时候用
当你希望 AI 做方向探索、方案发散时使用。它保留核心风格识别度，但允许实现更灵活。

## 怎么用
- 还在探索方向时，把它复制到 AI 工具里。
- 补充页面类型、目标用户和参考约束。
- 先让 AI 给 2-3 个方向，确定方向后再用硬性提示词落地。

保持整体风格气质即可，允许实现细节灵活调整，但不要偏离核心视觉语言。

## Style Signals

- Fluent
- 微软
- 亚克力
- Reveal
- 光效
- 深度

## Prefer

- 使用亚克力（Acrylic）半透明效果 bg-white/70 backdrop-blur-xl
- 添加 Reveal 高亮边框效果（hover 时 border-white/60）
- 使用微软标志性蓝色 bg-[#0078d4]
- 保持简洁现代的布局

## Avoid

- 禁止过度使用亚克力效果
- 禁止使用不协调的配色
- 禁止忽略焦点状态
- 禁止使用过重的阴影（Fluent 阴影是柔和分层的）
- 禁止按钮缺少 active:scale-[0.97]（无触觉确认）
- 禁止 focus:ring 缺少 focus:ring-offset-2

## Output Guidance

- 先保证整体风格识别度，再优化细节。
- 避免过度炫技，保持可读性与可维护性。