import type { ScrollAnimationOptions, AOSAnimation } from "../types";

import animations, { type AnimationFunction } from "./animations";
import { DEFAULT_OPTIONS } from "./config";

type DataKeys =
  | "offset"
  | "delay"
  | "duration"
  | "easing"
  | "once"
  | "mirror"
  | "anchor-placement";

const AOS_ATTRIBUTE_MAP = {
  "data-aos-offset": "offset",
  "data-aos-delay": "delay",
  "data-aos-duration": "duration",
  "data-aos-easing": "easing",
  "data-aos-mirror": "mirror",
  "data-aos-once": "once",
  "data-aos-anchor-placement": "anchorPlacement",
} satisfies Record<`data-aos-${DataKeys}`, keyof ScrollAnimationOptions>;

const ANIMATION_REGISTRY: Record<AOSAnimation, AnimationFunction> = {
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
};

/** 建立動畫元素 */
export function createAnimation<E extends Element>(
  element: E,
  contextSafe?: gsap.ContextSafeFunc,
) {
  const animate = element.getAttribute("data-aos") as AOSAnimation | null;
  if (!animate) return;

  const handleAnimation = ANIMATION_REGISTRY[animate];
  if (!handleAnimation) return;

  const options = parseAttributes(element);
  return handleAnimation(element, contextSafe, options);
}

/** 迴圈建立動畫元素 */
export function createAnimations<E extends Element>(
  elements: E[],
  contextSafe?: gsap.ContextSafeFunc,
) {
  const result = [];

  for (const element of elements) {
    const animation = createAnimation(element, contextSafe);
    if (animation) {
      result.push(animation);
    }
  }

  return result;
}

function parseAttributes<E extends Element>(element: E) {
  const options = { ...DEFAULT_OPTIONS };

  for (const key of Object.keys(AOS_ATTRIBUTE_MAP)) {
    const value = element.getAttribute(key);

    if (value) {
      const prop = AOS_ATTRIBUTE_MAP[key as `data-aos-${DataKeys}`];

      switch (prop) {
        case "offset":
        case "delay":
        case "duration":
          options[prop] = parseInt(value, 10);
          break;
        case "easing":
          options[prop] = value as ScrollAnimationOptions["easing"];
          break;
        case "once":
        case "mirror":
          options[prop] = value === "true";
          break;
        case "anchorPlacement":
          options[prop] = value as ScrollAnimationOptions["anchorPlacement"];
          break;
      }
    }
  }

  return options;
}
