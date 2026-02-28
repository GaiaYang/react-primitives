import type { AOSAnimation } from "./types";

import animations, { type AnimationFunction } from "./animations";
import {
  DEFAULT_OPTIONS,
  AOS_ATTRIBUTE_MAP,
  anchorPlacements,
  easings,
  type AOSDataAttributeKeys,
} from "./constants";

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
      const prop = AOS_ATTRIBUTE_MAP[key as AOSDataAttributeKeys];

      switch (prop) {
        case "offset":
        case "delay":
        case "duration": {
          const numberValue = parseNumber(value);
          if (!Number.isNaN(numberValue)) {
            options[prop] = numberValue;
          }
          break;
        }
        case "easing": {
          const easing = parseEnum(easings, value);
          if (easing) {
            options[prop] = easing;
          }
          break;
        }
        case "once":
        case "mirror": {
          const booleanValue = parseBoolean(value);
          if (typeof booleanValue === "boolean") {
            options[prop] = booleanValue;
          }
          break;
        }
        case "anchorPlacement": {
          const anchorPlacement = parseEnum(anchorPlacements, value);
          if (anchorPlacement) {
            options[prop] = anchorPlacement;
          }
          break;
        }
      }
    }
  }

  return options;
}

function parseEnum<T>(list: readonly T[], value: string): T | undefined {
  return list.includes(value as T) ? (value as T) : undefined;
}

function parseBoolean(value: string) {
  switch (value) {
    case "true":
      return true;
    case "false":
      return false;
    default:
      break;
  }
}

function parseNumber(value: string) {
  return parseInt(value, 10);
}
