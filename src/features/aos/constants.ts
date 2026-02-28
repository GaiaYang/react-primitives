import type {
  AnchorPlacement,
  AOSAnimation,
  Easing,
  ScrollAnimationOptions,
} from "./types";

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

/** 動畫種類 */
export const animations: AOSAnimation[] = [
  "fade",
  "fade-up",
  "fade-down",
  "fade-left",
  "fade-right",
  "fade-up-right",
  "fade-up-left",
  "fade-down-right",
  "fade-down-left",
  "flip-up",
  "flip-down",
  "flip-left",
  "flip-right",
  "slide-up",
  "slide-down",
  "slide-left",
  "slide-right",
  "zoom-in",
  "zoom-in-up",
  "zoom-in-down",
  "zoom-in-left",
  "zoom-in-right",
  "zoom-out",
  "zoom-out-up",
  "zoom-out-down",
  "zoom-out-left",
  "zoom-out-right",
];

/** 動畫曲線 */
export const easings: Easing[] = [
  "none",
  "power1",
  "power1.in",
  "power1.out",
  "power1.inOut",
  "power2",
  "power2.in",
  "power2.out",
  "power2.inOut",
  "power3",
  "power3.in",
  "power3.out",
  "power3.inOut",
  "power4",
  "power4.in",
  "power4.out",
  "power4.inOut",
  "back",
  "back.in",
  "back.out",
  "back.inOut",
  "bounce",
  "bounce.in",
  "bounce.out",
  "bounce.inOut",
  "circ",
  "circ.in",
  "circ.out",
  "circ.inOut",
  "elastic",
  "elastic.in",
  "elastic.out",
  "elastic.inOut",
  "expo",
  "expo.in",
  "expo.out",
  "expo.inOut",
  "sine",
  "sine.in",
  "sine.out",
  "sine.inOut",
];

/** 動畫錨點 */
export const anchorPlacements: AnchorPlacement[] = [
  "top-bottom",
  "top-center",
  "top-top",
  "center-bottom",
  "center-center",
  "center-top",
  "bottom-bottom",
  "bottom-center",
  "bottom-top",
];

export type DataKeys =
  | "offset"
  | "delay"
  | "duration"
  | "easing"
  | "once"
  | "mirror"
  | "anchor-placement";

export type AOSDataAttributeKeys = `data-aos-${DataKeys}`;

/** AOS 屬性對應 */
export const AOS_ATTRIBUTE_MAP = {
  "data-aos-offset": "offset",
  "data-aos-delay": "delay",
  "data-aos-duration": "duration",
  "data-aos-easing": "easing",
  "data-aos-mirror": "mirror",
  "data-aos-once": "once",
  "data-aos-anchor-placement": "anchorPlacement",
} satisfies Record<AOSDataAttributeKeys, keyof ScrollAnimationOptions>;
