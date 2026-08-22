这是一些综合的提示词

应用 Fluent 2 的柔和几何、轻盈层次、温和渐变和清晰轮廓。整体体验应该高效、令人安心、易于解析，适用于任务管理、日历、笔记或仪表板。

**布局与流程**
- Hero 区：38-52px 标题、简洁副标、主要 CTA（「开始整理」）+ 次要按钮（「查看演示」）。可选插图或抽象形状，背景使用浅色中性/柔和渐变。
- 功能网格：3-6 张卡片，突出任务、日历、协作、专注模式、通知。每张卡片包含图标、标题、2-3 行正文和一个小操作。
- 生产力条：并排模块（如「今日视图」+「我的优先事项」），或任务/日历/笔记标签页。包含迷你统计行（已完成任务、专注分钟数）。
- 协作区：头像/首字母标签、分享状态、权限徽章；显示小型时间线或评论卡片。
- 结尾 CTA：强调控制/隐私并邀请用户加入。

**视觉语言（Fluent 2）**
- 表面：浅色背景、低透明度 1px 描边、柔和高度（`shadow-sm/md`）、8-12px 圆角。避免生硬阴影和玻璃效果。
- 色彩：一个主强调色（蓝色/青色）配以微妙次要色调；状态色彩符合 Fluent 调色板（成功/信息/警告/危险）。渐变温和且对比度安全。
- 图标：简洁、双色或线条风格；图标始终与文字配对。

**排版**
- 标题字重 600-700；正文 15-16px，行高 1.6-1.7。标签使用小型大写或半粗体。数字/统计可使用等宽字体对齐。
- 长标题可用 `text-balance`；保持适中的行长。

**组件与状态**
- 按钮：药丸/方圆角半径；主按钮填充、次按钮透明。悬停 = 色调偏移；按下 = 轻微下压；焦点可见轮廓 2-3px 强调色。允许图标前置按钮如「添加任务」或「新建事件」。
- 卡片：`rounded-xl border border-slate-200/70 bg-white shadow-sm`，内边距 16-24px。可选添加微妙的顶部强调条或点。
- 标签/徽章：柔和圆角；用于状态（今日到期/进行中/已完成）。保留文字，而非仅靠颜色。
- 标签页/分段控件：清晰焦点环；悬停色调变化；活动态底线或药丸高亮。
- 列表/表格：`divide-y` 行，可选斑马纹。任务包含复选框、标题、标签、截止日期。尊重键盘焦点和 `prefers-reduced-motion`。

**动效**
- 沉稳且实用：淡入/位移 120-180ms ease-out；无弹跳。悬停上浮 ≤4px。切换/复选框动作平滑但微妙。尊重 `prefers-reduced-motion`。

**无障碍**
- 文字对比度 ≥ 4.5:1。所有输入框、标签页、按钮焦点样式可见。更大点击目标。不依赖仅颜色的状态；与文字/图标配对。
- 为控件提供 aria-labels；插图提供 alt 文字。确保键盘导航顺序合理。

**文案语气**
- 清晰、支持性、行动导向：「规划今天」、「保持同步」、「无摩擦专注」。避免夸大；强调控制和沉稳的生产力。
- CTA 示例：「开始整理」、「开启专注模式」、「邀请队友」。

**Tailwind 技巧（参考）**
- 容器：`max-w-5xl mx-auto px-6 lg:px-10 py-16 lg:py-24`
- 表面：`rounded-xl border border-slate-200/70 bg-white shadow-sm`
- 按钮：`rounded-full px-5 py-3 font-semibold transition hover:shadow-md active:translate-y-[1px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`
- 标签页/分段：`inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1.5`
- 列表：`divide-y divide-slate-200 text-sm leading-6`；复选框使用 `focus-visible:ring` 工具类。

following Microsoft Fluent Design principles featuring hero sections, feature showcases, testimonials, and call-to-action blocks. Use depth and layering with subtle shadow effects to create visual hierarchy and a sense of depth. Implement Fluent Design's signature acrylic material effects with translucent, frosted glass textures for navigation bars and content containers. Apply a modern color palette with vibrant accent colors against neutral backgrounds, following Microsoft's color system guidelines for accessibility. Include smooth, purposeful animations and transitions that respond to user interactions following Fluent's motion principles. Design navigation elements with consistent Fluent iconography and depth effects, buttons with subtle hover animations and depth changes, and feature highlights with Reveal highlight effects on interaction. Use Microsoft's Segoe UI font family with proper typographic hierarchy and generous spacing. Incorporate subtle parallax effects for hero elements and implement Fluent Design's responsive layout grid system that adapts seamlessly to different screen sizes. For Web3-specific elements, create clean visualizations of blockchain concepts, cryptocurrency features, or decentralized applications using Fluent Design's modern aesthetic. The overall layout should balance innovative technology presentation with clear marketing messaging, creating a contemporary landing page that effectively communicates Web3 value propositions while maintaining Microsoft's Fluent Design principles.

STYLEKIT_STYLE_REFERENCE
style_name: 流利设计
style_slug: fluent-design
style_source: /styles/fluent-design