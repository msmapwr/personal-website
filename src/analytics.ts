/**
 * 隐私友好访问统计（占位实现）。
 * 使用方式：在 analytics.websiteId / scriptUrl 填入 Umami 或 Plausible 的
 * website id 与脚本地址，并把 enabled 改为 true，即可启用。
 * 默认关闭，此时 initAnalytics() 是一个无操作。
 */
export const analytics = {
  enabled: false,
  websiteId: "",
  scriptUrl: "",
};

export function initAnalytics(): void {
  if (!analytics.enabled || !analytics.scriptUrl || !analytics.websiteId) return;
  const script = document.createElement("script");
  script.async = true;
  script.src = analytics.scriptUrl;
  script.setAttribute("data-website-id", analytics.websiteId);
  document.head.appendChild(script);
}
