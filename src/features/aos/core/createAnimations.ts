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
  "flip-up": animations.fade,
  "flip-down": animations.fade,
  "flip-left": animations.fade,
  "flip-right": animations.fade,
  "slide-up": animations.fade,
  "slide-down": animations.fade,
  "slide-left": animations.fade,
  "slide-right": animations.fade,
  "zoom-in": animations.fade,
  "zoom-in-up": animations.fade,
  "zoom-in-down": animations.fade,
  "zoom-in-left": animations.fade,
  "zoom-in-right": animations.fade,
  "zoom-out": animations.fade,
  "zoom-out-up": animations.fade,
  "zoom-out-down": animations.fade,
  "zoom-out-left": animations.fade,
  "zoom-out-right": animations.fade,
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
