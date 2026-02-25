import type { ScrollAnimationOptions } from "../types";

/** 距離 `px` */
export const DISTANCE = 100;

/** 預設選項 */
export const DEFAULT_OPTIONS: ScrollAnimationOptions = {
  offset: 120,
  delay: 0,
  duration: 400,
  easing: "none",
  once: false,
  mirror: false,
  anchorPlacement: "top-bottom",
};
