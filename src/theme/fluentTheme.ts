import {
  BrandVariants,
  createDarkTheme,
  createLightTheme,
} from "@fluentui/react-components";

/** 品牌色（微软蓝 #0078D4）的色阶 ramp */
export const brandRamp: BrandVariants = {
  10: "#061724",
  20: "#082338",
  30: "#0a2e4a",
  40: "#0c3b5e",
  50: "#0e4775",
  60: "#0f5c8f",
  70: "#0e6fae",
  80: "#0078d4",
  90: "#2b88d8",
  100: "#4a9ae0",
  110: "#6ab0e8",
  120: "#8ec4f0",
  130: "#b0d6f5",
  140: "#cfe6f9",
  150: "#e5f1fb",
  160: "#f5f9fd",
};

export const lightTheme = {
  ...createLightTheme(brandRamp),
  fontSizeBase300: "15px",
  lineHeightBase300: "22px",
};
export const darkTheme = {
  ...createDarkTheme(brandRamp),
  fontSizeBase300: "15px",
  lineHeightBase300: "22px",
};
