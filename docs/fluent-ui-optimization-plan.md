# Fluent UI 样式进一步优化计划（拟 1.2.0）

> 依据：`docs/Frontend/` 下 4 份 Fluent 设计文档（Fluent UI.md / fluent-design-hard-prompt.md / fluent-design-design-spec.md / fluent-design-creative-brief.md）融合而来，对照现有 React + Fluent UI React v9 代码审计后制定。

---

## 一、融合后的核心准则（用于本次优化）

从 4 份文档提炼出对本项目最有约束力的规则：

1. **主色** `#0078d4`；辅色悬停 `#106ebe`、按下 `#005a9e`；状态色遵循 Fluent 调色板。
2. **亚克力选择性使用**（仅导航栏等少数表面），禁止滥用、禁止默认玻璃态。
3. **Reveal 光效**：hover 时高亮 + 边框增亮（`border-white/60`）。
4. **Z 轴深度**：hover 上浮 ≤4px，搭配柔和分层阴影。
5. **动效 ≤200ms**、`ease-out`，无 bounce/elastic；必须尊重 `prefers-reduced-motion`。
6. **按下反馈**：按钮 `active` scale `0.97`（触觉确认），按下归位。
7. **焦点态**：所有可交互元素 `focus-visible` 2px 品牌色 + 2px offset，不可忽略。
8. **柔和分层阴影**：禁用重阴影 / 硬边阴影（`shadow-[4px_4px_0]` 之类）。
9. **圆角** 8–12px（subtle rounding），禁 `rounded-none`。
10. **排版**：正文 15–16px、行高 1.6–1.7、行宽 65–75 字符；Segoe UI。
11. **无障碍**：对比度 WCAG AA（≥4.5:1）、键盘焦点、触控目标 ≥44px、reduced-motion 备选。

---

## 二、现状审计（代码 vs 准则）

| # | 准则 | 现状 | 结论 |
|---|---|---|---|
| 1 | 主色 #0078d4 | `theme/fluentTheme.ts` 品牌 ramp 以 #0078d4 为 80 档 | ✅ 符合 |
| 2 | 亚克力选择性 | 仅顶栏用了 `backdrop-filter` | ✅ 符合 |
| 3 | Reveal 光效 | 卡片有 spotlight（径向高亮），但**缺边框增亮** | ⚠️ 部分 |
| 4 | Z 轴深度 | 卡片 hover `translateY(-4px)`、导航 `-1px`、联系 `translateX(4px)` | ✅ 符合 |
| 5 | 动效 ≤200ms | `Reveal`/Hero 入场 `duration: 0.5`（500ms）**超标**；blob 呼吸 14s 过慢 | ❌ 需改 |
| 6 | 按下 scale 0.97 | Fluent Button 有 pressed 背景但**无 scale** | ❌ 需加 |
| 7 | 焦点态 | Fluent 组件有焦点环；**自定义 nav 链接/联系行/卡片链接无显式焦点态** | ❌ 需加 |
| 8 | 柔和阴影 | 卡片用 Fluent 默认阴影，整体柔和 | ✅ 符合 |
| 9 | 圆角 8–12px | Hero 用了 16px 圆角（略大）；卡片 12px spotlight | ⚠️ 微调 |
| 10 | 排版 | Segoe UI ✓；正文 Fluent Body1 默认 14px（略小） | ⚠️ 微调 |
| 11 | 无障碍 | reduced-motion ✓；触控目标/对比度基本 OK | ⚠️ 微调 |

---

## 三、更改清单（按优先级）

### P0 —— 风格硬伤（必改）

1. **动效时长对齐 ≤200ms**
   - `src/components/Reveal.tsx`：`duration: 0.5` → `0.2`。
   - `src/pages/Home.tsx`：入场 `duration: 0.5` → `0.2`，`staggerChildren` 0.12 → 0.05，使入场更利落。
   - `src/pages/Home.tsx`：blob 呼吸 `duration: 14` → 8s 且降低位移幅度（或改为静态），避免"缓慢漂移"观感。

2. **自定义可交互元素补焦点态**
   - `src/components/Navigation.tsx`（nav 链接）、`src/pages/Contact.tsx`（联系行）、`src/components/ProjectCard.tsx`（卡片内链接）：
     加 `:focus-visible { outline: 2px solid 品牌色; outline-offset: 2px }`（用 `tokens.colorBrandForeground1` + 2px offset，对齐文档的 focus-ring-offset-2）。

### P1 —— 增强（对齐 Fluent 签名交互）

3. **按下 scale 反馈**
   - 全局（`src/index.css`）或各按钮：`active` 时 `transform: scale(0.97)`，松手归位，制造触觉确认。
   - 卡片 `:active` 加 `scale(0.98)`。

4. **卡片 Reveal 边框增亮**
   - `src/components/ProjectCard.tsx`：hover 时在 spotlight 基础上让卡片描边变亮（`borderColor` 由中性 → 品牌浅色），模拟 Fluent Reveal 光照。

5. **图标悬停微缩放**
   - 联系图标容器、卡片链接图标：hover 时 `scale(1.05)`（对应文档 `group-hover:scale-105`）。

6. **圆角/字号微调**
   - Hero 圆角 16px → 12px。
   - 正文字号 14px → 15px（`Body1` 覆盖或自定义 token），行高维持 1.6 上下。

---

## 四、实施步骤

1. 改 `Reveal.tsx` + `Home.tsx` 动效时长（P0-1）。
2. 给 nav/contact/card 链接补焦点态（P0-2）。
3. 加按下 scale + 卡片边框增亮 + 图标缩放（P1-3/4/5）。
4. 圆角/字号微调（P1-6）。
5. `npm run build` 验证（沙箱需完整权限）。
6. 升版本 `1.1.1 → 1.2.0`，更新 `CHANGELOG.md`。
7. commit + push。

---

## 五、自检清单（交付前逐条核对）

- [ ] 无动画超过 200ms（Reveal/入场已降到 200ms）
- [ ] 按钮有 `active:scale(0.97)` 触觉反馈
- [ ] 所有可交互元素有可见焦点态（2px 品牌色 + offset）
- [ ] 卡片 hover 上浮 ≤4px + 柔和阴影 + 边框增亮
- [ ] 亚克力仅用于顶栏，未滥用
- [ ] 无重阴影/硬边阴影/渐变文字/嵌套卡片
- [ ] `prefers-reduced-motion` 备选仍在
- [ ] 对比度 WCAG AA、键盘可达、触控目标 ≥44px
- [ ] 构建通过、已提交推送
