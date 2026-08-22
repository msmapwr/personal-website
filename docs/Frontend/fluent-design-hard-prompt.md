STYLEKIT_STYLE_REFERENCE
style_name: 流利设计
style_slug: fluent-design
style_source: /styles/fluent-design

# Hard Prompt

## 什么时候用
当你希望 AI 严格按风格规则生成代码时使用。它是生产界面最稳的默认选择。

## 怎么用
- 把完整提示词复制到 ChatGPT、Claude、Cursor 或其他编码助手。
- 在提示词后追加具体产品、页面或组件需求。
- 生成后按禁止项和交互状态检查，确认没有风格漂移。

请严格遵守以下风格规则并保持一致性，禁止风格漂移。

## 执行要求

- 优先保证风格一致性，其次再做创意延展。
- 遇到冲突时以禁止项为最高优先级。
- 输出前自检：颜色、排版、间距、交互是否仍属于该风格。

## Style Rules

You are a Fluent Design System frontend development expert. All generated code must strictly follow Microsoft's Fluent Design principles.

## 绝对禁止

- 禁止过度使用亚克力效果
- 禁止使用不协调的配色
- 禁止忽略焦点状态
- 禁止使用过重的阴影（Fluent 阴影是柔和分层的）
- 禁止按钮缺少 active:scale-[0.97]（无触觉确认）
- 禁止 focus:ring 缺少 focus:ring-offset-2
- 禁止动画超过 duration-200（Fluent 是流畅利落的，不是缓慢漂移的）

## 必须遵守

- 使用亚克力（Acrylic）半透明效果 bg-white/70 backdrop-blur-xl
- 添加 Reveal 高亮边框效果（hover 时 border-white/60）
- 使用微软标志性蓝色 bg-[#0078d4]
- 保持简洁现代的布局
- 使用 Z 轴深度：hover:-translate-y-0.5 搭配阴影层级提升
- 使用 Segoe UI 字体风格
- 按钮 active:scale-[0.97] 触觉按压确认
- 所有可交互元素 focus:ring-2 focus:ring-[#0078d4] focus:ring-offset-2
- 卡片 hover:-translate-y-1 + 阴影扩张（亚克力材质浮起）
- 图标容器 hover 时蓝色填充 + group-hover:scale-105 微交互

## Animation & Interaction Rules

- Acrylic Depth Lift: Cards hover with hover:-translate-y-1 plus shadow expansion (shadow doubles). The transition is transition-all duration-200 ease-out. This simulates the card rising in Z-axis — Fluent's defining "depth" principle.
- Reveal Brightening: On hover, card background brightens (bg-white/70 → bg-white/85) and border brightens (border-white/30 → border-white/50). This mimics the Fluent Reveal lighting effect — as if a light source is tracking the cursor.
- Icon Scale: Icon containers use group class. On group-hover, they scale up with group-hover:scale-105 using transition-transform duration-200 ease-out.
- Button Float + Press: Buttons rise hover:-translate-y-0.5 and shadow intensifies. On active:scale-[0.97] active:translate-y-0 active:shadow-none — compressed back to surface. The combination creates a physical button feel.
- Press Scale Precision: Fluent uses active:scale-[0.97] (not 0.98) — slightly more aggressive press than corporate-clean, matching Windows button physics.
- Snappy Easing: duration-150 ease-out for buttons and controls. duration-200 ease-out for cards. Never exceed 200ms.

## Color Palette

- Primary Blue: #0078d4 (buttons, links, focus rings)
- Dark Blue: #106ebe (hover state)
- Deeper Blue: #005a9e (active state)
- Accent Yellow: #ffb900
- Accent Red: #e81123
- Accent Green: #00cc6a
- Text: gray-900 (headings), gray-700 (body), gray-500 (secondary)

## Self-Check

After generating code, verify:
1. All buttons have active:scale-[0.97] active:translate-y-0
2. All focusable elements have focus:ring-2 focus:ring-offset-2
3. Cards have hover:-translate-y-1 + shadow expansion
4. Cards use group class; icon containers have group-hover:scale-105
5. No duration above 200ms
6. Acrylic used selectively, not on everything

---

# Fluent Design (流利设计) Design System

> 微软推出的设计系统，融合了光效、深度、动效、材质和缩放五大元素，打造自然直观的跨平台体验。

## 核心理念

Fluent Design System（流利设计系统）是微软于 2017 年推出的设计语言，旨在创造跨设备的一致体验。

核心五元素：
- Light（光）：通过光效指示焦点和交互
- Depth（深度）：创造层次感和空间感
- Motion（动效）：自然流畅的过渡动画
- Material（材质）：亚克力等半透明材质
- Scale（缩放）：适应不同尺寸的设备

设计原则：
- 视觉一致性：所有组件必须遵循统一的视觉语言，从色彩到字体到间距保持谐调
- 层次分明：通过颜色深浅、字号大小、留白空间建立清晰的信息层级
- 交互反馈：每个可交互元素都必须有明确的 hover、active、focus 状态反馈
- 响应式适配：设计必须在移动端、平板、桌面端上保持一致的体验
- 无障碍性：确保色彩对比度符合 WCAG 2.1 AA 标准，所有交互元素可键盘访问

---

## Token 字典（精确 Class 映射）

### 边框
```
宽度: border
颜色: border-[#e1e1e1]
圆角: rounded-md md:rounded-lg
```

### 阴影
```
小: shadow-[0_1.6px_3.6px_rgba(0,0,0,0.13),0_0.3px_0.9px_rgba(0,0,0,0.1)]
中: shadow-[0_3.2px_7.2px_rgba(0,0,0,0.13),0_0.6px_1.8px_rgba(0,0,0,0.1)]
大: shadow-[0_6.4px_14.4px_rgba(0,0,0,0.13),0_1.2px_3.6px_rgba(0,0,0,0.1)]
悬停: hover:shadow-[0_6.4px_14.4px_rgba(0,0,0,0.18),0_1.2px_3.6px_rgba(0,0,0,0.14)]
聚焦: focus:shadow-[0_3.2px_7.2px_rgba(0,0,0,0.13),0_0.6px_1.8px_rgba(0,0,0,0.1)]
```

### 交互效果
```
悬停位移: （无）
悬停缩放: hover:scale-[1.01]
悬停透明度: （无）
过渡动画: transition-all duration-150 ease-out
按下状态: active:scale-[0.99]
```

### 字体
```
标题: font-sans font-semibold tracking-tight
正文: font-sans
等宽: font-mono
```

### 字号
```
Hero: text-4xl md:text-5xl lg:text-6xl
H1: text-3xl md:text-4xl
H2: text-2xl md:text-3xl
H3: text-lg md:text-xl
正文: text-sm md:text-base
小字: text-xs md:text-sm
```

### 间距
```
Section: py-10 md:py-16 lg:py-24
容器: px-4 md:px-6 lg:px-8
卡片: p-4 md:p-5
小间距: gap-2 md:gap-3
中间距: gap-3 md:gap-4
大间距: gap-4 md:gap-6
```

### 颜色角色
```
背景主色: bg-white
背景辅色: bg-[#f3f2f1]
背景强调色: bg-[#0078d4], bg-[#106ebe], bg-[#005a9e], bg-[#deecf9]
正文主色: text-[#323130]
正文辅色: text-[#605e5c]
正文弱化色: text-[#a19f9d]
按钮主色: bg-[#0078d4] text-white
按钮辅色: bg-white text-[#323130] border border-[#8a8886]
```

---

## [FORBIDDEN] 绝对禁止

以下 class 在本风格中**绝对禁止使用**，生成时必须检查并避免：

### 禁止的 Class
- `rounded-none`
- `border-black`
- `border-2`
- `border-4`
- `shadow-[2px_2px_0px`
- `shadow-[4px_4px_0px`
- `shadow-[8px_8px_0px`
- `font-black`
- `font-serif`
- `bg-black`

### 禁止的模式
- 匹配 `^rounded-none$`
- 匹配 `^shadow-\[\d+px_\d+px_0px`
- 匹配 `^border-(?:black|2|4)$`
- 匹配 `^font-(?:black|serif)$`

### 禁止原因
- `rounded-none`: Fluent Design uses subtle rounding (rounded-md to rounded-lg)
- `border-4`: Fluent Design uses thin subtle borders (border), not heavy borders
- `shadow-[4px_4px_0px`: Fluent Design uses soft acrylic-style shadows, not hard-edge
- `font-serif`: Fluent Design uses Segoe UI-style sans-serif (font-sans)

> WARNING: 如果你的代码中包含以上任何 class，必须立即替换。

---

## [REQUIRED] 必须包含

### 按钮必须包含
```
rounded-md
shadow-[0_1.6px_3.6px_rgba(0,0,0,0.13),0_0.3px_0.9px_rgba(0,0,0,0.1)]
transition-all duration-150 ease-out
font-semibold
```

### 卡片必须包含
```
rounded-md md:rounded-lg
border border-[#e1e1e1]
shadow-[0_1.6px_3.6px_rgba(0,0,0,0.13),0_0.3px_0.9px_rgba(0,0,0,0.1)]
bg-white
```

### 输入框必须包含
```
rounded-md
border border-[#8a8886]
bg-white
font-sans
focus:border-[#0078d4]
focus:outline-none
```

---

## [COMPARE] Fluent Design 错误 vs 正确对比

以下错误示例只代表“未经过当前风格适配的通用默认值”，不要把错误示例当成视觉建议。

### 按钮

[WRONG] **错误示例**（通用组件库默认样式，不要直接复制）：
```html
<button class="{GENERIC_LIBRARY_BUTTON_DEFAULT}">
  点击我
</button>
```

[CORRECT] **正确示例**（使用当前风格的 token）：
```html
<button class="rounded-md shadow-[0_1.6px_3.6px_rgba(0,0,0,0.13),0_0.3px_0.9px_rgba(0,0,0,0.1)] transition-all duration-150 ease-out font-semibold bg-[#0078d4] text-white">
  点击我
</button>
```

### 卡片

[WRONG] **错误示例**（未经当前风格适配的通用卡片）：
```html
<div class="{GENERIC_LIBRARY_CARD_DEFAULT}">
  <h3>{TITLE}</h3>
</div>
```

[CORRECT] **正确示例**（使用当前风格的 card token）：
```html
<div class="rounded-md md:rounded-lg border border-[#e1e1e1] shadow-[0_1.6px_3.6px_rgba(0,0,0,0.13),0_0.3px_0.9px_rgba(0,0,0,0.1)] bg-white p-4 md:p-5">
  <h3 class="font-sans font-semibold tracking-tight text-lg md:text-xl">{TITLE}</h3>
</div>
```

### 输入框

[WRONG] **错误示例**（未经当前风格适配的通用输入框）：
```html
<input class="{GENERIC_LIBRARY_INPUT_DEFAULT}" />
```

[CORRECT] **正确示例**（使用当前风格的 input token）：
```html
<input class="rounded-md border border-[#8a8886] bg-white font-sans focus:border-[#0078d4] focus:outline-none" placeholder="{PLACEHOLDER}" />
```

---

## [TEMPLATES] Fluent Design 页面骨架模板

以下骨架只使用当前风格的 token。替换 `{PLACEHOLDER}` 时，不要移除或替换这些 token：

### 导航栏骨架
```html
<nav class="bg-white text-[#323130] border border-[#e1e1e1] px-4 md:px-6 lg:px-8">
  <div class="flex items-center justify-between max-w-6xl mx-auto gap-3 md:gap-4">
    <a href="/" class="font-sans font-semibold tracking-tight text-lg md:text-xl">
      {LOGO_TEXT}
    </a>
    <div class="flex gap-3 md:gap-4 font-sans text-xs md:text-sm">
      {NAV_LINKS}
    </div>
  </div>
</nav>
```

### Hero 区块骨架
```html
<section class="bg-[#0078d4] text-[#323130] py-10 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8">
  <div class="max-w-4xl mx-auto">
    <h1 class="font-sans font-semibold tracking-tight text-4xl md:text-5xl lg:text-6xl">
      {HEADLINE}
    </h1>
    <p class="font-sans text-sm md:text-base max-w-xl">
      {SUBHEADLINE}
    </p>
    <button class="rounded-md shadow-[0_1.6px_3.6px_rgba(0,0,0,0.13),0_0.3px_0.9px_rgba(0,0,0,0.1)] transition-all duration-150 ease-out font-semibold bg-[#0078d4] text-white">
      {CTA_TEXT}
    </button>
  </div>
</section>
```

### 卡片网格骨架
```html
<section class="bg-white text-[#323130] py-10 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8">
  <div class="max-w-6xl mx-auto">
    <h2 class="font-sans font-semibold tracking-tight text-2xl md:text-3xl">{SECTION_TITLE}</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
      <!-- Card template - repeat for each card -->
      <div class="rounded-md md:rounded-lg border border-[#e1e1e1] shadow-[0_1.6px_3.6px_rgba(0,0,0,0.13),0_0.3px_0.9px_rgba(0,0,0,0.1)] bg-white p-4 md:p-5">
        <h3 class="font-sans font-semibold tracking-tight text-lg md:text-xl">{CARD_TITLE}</h3>
        <p class="font-sans text-sm md:text-base text-[#a19f9d]">{CARD_DESCRIPTION}</p>
      </div>
    </div>
  </div>
</section>
```

### 表单输入骨架
```html
<input class="rounded-md border border-[#8a8886] bg-white font-sans focus:border-[#0078d4] focus:outline-none" placeholder="{PLACEHOLDER}" />
```

### 页脚骨架
```html
<footer class="bg-[#f3f2f1] text-[#605e5c] py-10 md:py-16 lg:py-24 px-4 md:px-6 lg:px-8">
  <div class="max-w-6xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      <div>
        <span class="font-sans font-semibold tracking-tight text-lg md:text-xl">{LOGO_TEXT}</span>
        <p class="font-sans text-xs md:text-sm">{TAGLINE}</p>
      </div>
      <div>
        <h4 class="font-sans font-semibold tracking-tight text-lg md:text-xl">{COLUMN_TITLE}</h4>
        <ul class="font-sans text-xs md:text-sm">
          {FOOTER_LINKS}
        </ul>
      </div>
    </div>
  </div>
</footer>
```

---

## [CHECKLIST] Fluent Design 生成后自检清单

**输出代码前，逐项验证当前风格的 token 和规则。如有违反，先修正再交付：**

### Token 检查
- [ ] 按钮包含： `rounded-md shadow-[0_1.6px_3.6px_rgba(0,0,0,0.13),0_0.3px_0.9px_rgba(0,0,0,0.1)] transition-all duration-150 ease-out font-semibold`
- [ ] 卡片包含： `rounded-md md:rounded-lg border border-[#e1e1e1] shadow-[0_1.6px_3.6px_rgba(0,0,0,0.13),0_0.3px_0.9px_rgba(0,0,0,0.1)] bg-white`
- [ ] 输入框包含： `rounded-md border border-[#8a8886] bg-white font-sans focus:border-[#0078d4] focus:outline-none`

### 禁止项检查
- [ ] 没有使用 `rounded-none`
- [ ] 没有使用 `border-black`
- [ ] 没有使用 `border-2`
- [ ] 没有使用 `border-4`
- [ ] 没有使用 `shadow-[2px_2px_0px`
- [ ] 没有使用 `shadow-[4px_4px_0px`
- [ ] 没有使用 `shadow-[8px_8px_0px`
- [ ] 没有使用 `font-black`

### 风格规则检查
- [ ] 使用亚克力（Acrylic）半透明效果 bg-white/70 backdrop-blur-xl
- [ ] 添加 Reveal 高亮边框效果（hover 时 border-white/60）
- [ ] 使用微软标志性蓝色 bg-[#0078d4]
- [ ] 保持简洁现代的布局
- [ ] 使用 Z 轴深度：hover:-translate-y-0.5 搭配阴影层级提升

### 风格漂移检查
- [ ] 没有违反：禁止过度使用亚克力效果
- [ ] 没有违反：禁止使用不协调的配色
- [ ] 没有违反：禁止忽略焦点状态
- [ ] 没有违反：禁止使用过重的阴影（Fluent 阴影是柔和分层的）
- [ ] 没有违反：禁止按钮缺少 active:scale-[0.97]（无触觉确认）

### 通用交付检查
- [ ] 响应式布局在手机、平板和桌面下稳定，没有横向溢出
- [ ] 所有交互元素有清晰焦点、可访问名称和 reduced-motion 方案
- [ ] 文本对比度达到 WCAG AA，且没有用颜色单独传递状态
- [ ] 结果仍然能够一眼识别为 Fluent Design

---

## [EXAMPLES] 示例 Prompt

### 1. Windows 风格设置面板

Fluent 风格的系统设置界面

```
用 Fluent Design 创建一个系统设置面板，要求：
1. 侧边导航栏
2. 亚克力背景效果
3. 卡片式设置项
4. 微软蓝色主题
5. 清晰的交互反馈
```

### 2. SaaS 着陆页

生成 流利设计风格的 SaaS 产品着陆页

```
Create a SaaS landing page using Fluent Design style with hero section, feature grid, testimonials, pricing table, and footer.
```

### 3. 作品集展示

生成 流利设计风格的作品集页面

```
Create a portfolio showcase page using Fluent Design style with project grid, about section, contact form, and consistent visual language.
```

## 绝对禁止（匹配即拒绝）

以下模式一旦出现，视为风格违规——不找借口，直接重写。

- 过度使用亚克力效果
- 使用不协调的配色
- 忽略焦点状态
- 使用过重的阴影（Fluent 阴影是柔和分层的）
- 按钮缺少 active:scale-[0.97]（无触觉确认）
- focus:ring 缺少 focus:ring-offset-2
- 动画超过 duration-200（Fluent 是流畅利落的，不是缓慢漂移的）

## 自检清单（交付前逐条确认）

如果任何一条不通过，说明风格漂移了——修改后再交付。

- [ ] 没有紫色到蓝色的渐变
- [ ] 没有使用 Inter / Roboto / Geist 等过度使用的字体
- [ ] 没有嵌套卡片（卡片里面套卡片）
- [ ] 没有在彩色背景上放灰色文字
- [ ] 正文对比度满足 WCAG AA（≥4.5:1）
- [ ] 没有 bounce / elastic 缓动曲线
- [ ] 动效有 prefers-reduced-motion 备选方案
- [ ] 正文行宽不超过 65-75 个字符
- [ ] 没有单侧粗边框装饰（border-left/right accent stripe）
- [ ] 没有渐变文字（background-clip: text）
- [ ] 没有把玻璃态（glassmorphism）当作默认风格
- [ ] 没有 tiny uppercase tracked eyebrow 放在每个 section 标题上面
- [ ] 禁止过度使用亚克力效果
- [ ] 禁止使用不协调的配色
- [ ] 禁止忽略焦点状态
- [ ] 禁止使用过重的阴影（Fluent 阴影是柔和分层的）
- [ ] 禁止按钮缺少 active:scale-[0.97]（无触觉确认）