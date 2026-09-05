/** 全站共享的动效节奏，避免每个组件各自定义一套动画参数。 */
export const motionTokens = {
  duration: {
    fast: 0.14,
    normal: 0.2,
    enter: 0.35,
  },
  distance: {
    small: 8,
    medium: 16,
  },
  stagger: {
    short: 0.03,
    maxItems: 8,
  },
  easing: "easeOut" as const,
};
