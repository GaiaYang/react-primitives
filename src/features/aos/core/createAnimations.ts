import type { Options, Animation } from "../types";

import animations from "./animations";

export type DataKeys =
  | "offset"
  | "delay"
  | "duration"
  | "easing"
  | "once"
  | "mirror"
  | "anchor-placement";

const AOS_PROPS_MAP = {
  "data-aos-offset": "offset",
  "data-aos-delay": "delay",
  "data-aos-duration": "duration",
  "data-aos-easing": "easing",
  "data-aos-mirror": "mirror",
  "data-aos-once": "once",
  "data-aos-anchor-placement": "anchorPlacement",
} satisfies Record<`data-aos-${DataKeys}`, keyof Options>;

const animationsMap = {
  fade: animations.fade,
  "fade-up": animations.fadeUp,
  "fade-down": animations.fadeDown,
  "fade-left": animations.fadeLeft,
  "fade-right": animations.fadeRight,
  "fade-up-right": animations.fadeUpRight,
  "fade-up-left": animations.fadeUpLeft,
  "fade-down-right": animations.fadeDownRight,
  "fade-down-left": animations.fadeDownLeft,
  "flip-up": animations.flipUp,
  "flip-down": animations.flipDown,
  "flip-left": animations.flipLeft,
  "flip-right": animations.flipRight,
  "slide-up": animations.slideUp,
  "slide-down": animations.slideDown,
  "slide-left": animations.slideLeft,
  "slide-right": animations.slideRight,
  "zoom-in": animations.zoomIn,
  "zoom-in-up": animations.zoomInUp,
  "zoom-in-down": animations.zoomInDown,
  "zoom-in-left": animations.zoomInLeft,
  "zoom-in-right": animations.zoomInRight,
  "zoom-out": animations.zoomOut,
  "zoom-out-up": animations.zoomOutUp,
  "zoom-out-down": animations.zoomOutDown,
  "zoom-out-left": animations.zoomOutLeft,
  "zoom-out-right": animations.zoomOutRight,
} satisfies Record<Animation, (element: Element, options?: Options) => void>;

export default function createAnimations<E extends Element>(elements: E[]) {
  for (const element of elements) {
    const { animate, ...options } = parseOptions(element);

    if (!animate) continue;

    const handleAnimation = animationsMap[animate];

    if (handleAnimation) {
      handleAnimation(element, options);
    }
  }
}

function parseOptions<E extends Element>(element: E) {
  const options: Options = {
    offset: 120,
    delay: 0,
    duration: 400,
    easing: "none",
    once: false,
    mirror: false,
    anchorPlacement: "top-bottom",
  };
  const animate = element.getAttribute("data-aos") as Animation | null;

  for (const key of Object.keys(AOS_PROPS_MAP)) {
    const value = element.getAttribute(key);
    if (value) {
      const prop = AOS_PROPS_MAP[key as `data-aos-${DataKeys}`];

      switch (prop) {
        case "offset":
        case "delay":
        case "duration":
          options[prop] = parseInt(value, 10);
          break;
        case "easing":
          options[prop] = value as Options["easing"];
          break;
        case "once":
        case "mirror":
          options[prop] = value === "true";
          break;
        case "anchorPlacement":
          options[prop] = value as Options["anchorPlacement"];
          break;
      }
    }
  }

  return { ...options, animate };
}
