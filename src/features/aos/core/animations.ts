import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { Options } from "../types";

gsap.registerPlugin(ScrollTrigger);

type AnimationPreset = {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
};

type PresetMap = Record<string, AnimationPreset>;

/** 距離 `px` */
const DISTANCE = 100;

/** 預設選項 */
const DEFAULT_OPTIONS: Options = {
  offset: 120,
  delay: 0,
  duration: 400,
  easing: "ease",
  once: false,
  mirror: false,
  anchorPlacement: "top-bottom",
};

const presets = {
  fade: {
    from: {
      opacity: 0,
      transitionProperty: "opacity, transform",
    },
    to: {
      opacity: 1,
      transform: "none",
    },
  },
} satisfies PresetMap;

function translate3d(
  x: number,
  y: number,
  z: number,
): Pick<gsap.TweenVars, "x" | "y" | "z"> {
  return { x, y, z };
}

/** 建立 ScrollTrigger 動畫 */
function createScrollAnimation(
  element: Element,
  preset: AnimationPreset,
  fromVars?: gsap.TweenVars,
  toVars?: gsap.TweenVars,
  options?: Options,
) {
  const { offset, delay, duration, easing, once, mirror, anchorPlacement } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  return gsap.fromTo(
    element,
    {
      ...preset.from,
      ...fromVars,
    },
    {
      ...preset.to,
      ...toVars,
      scrollTrigger: {
        trigger: element,
        toggleActions: "play none none reverse",
      },
      duration: duration / 1000,
      delay: delay / 1000,
    },
  );
}

const animations = {
  fade(element, options) {
    createScrollAnimation(element, presets.fade, {}, {}, options);
  },
  fadeUp(element, options) {
    createScrollAnimation(
      element,
      presets.fade,
      translate3d(0, DISTANCE, 0),
      {},
      options,
    );
  },
  fadeDown(element, options) {
    createScrollAnimation(
      element,
      presets.fade,
      translate3d(0, -DISTANCE, 0),
      {},
      options,
    );
  },
  fadeRight(element, options) {
    createScrollAnimation(
      element,
      presets.fade,
      translate3d(-DISTANCE, 0, 0),
      {},
      options,
    );
  },
  fadeLeft(element, options) {
    createScrollAnimation(
      element,
      presets.fade,
      translate3d(DISTANCE, 0, 0),
      {},
      options,
    );
  },
  fadeUpRight(element, options) {
    createScrollAnimation(
      element,
      presets.fade,
      translate3d(-DISTANCE, DISTANCE, 0),
      {},
      options,
    );
  },
  fadeUpLeft(element, options) {
    createScrollAnimation(
      element,
      presets.fade,
      translate3d(DISTANCE, DISTANCE, 0),
      {},
      options,
    );
  },
  fadeDownRight(element, options) {
    createScrollAnimation(
      element,
      presets.fade,
      translate3d(-DISTANCE, -DISTANCE, 0),
      {},
      options,
    );
  },
  fadeDownLeft(element, options) {
    createScrollAnimation(
      element,
      presets.fade,
      translate3d(DISTANCE, -DISTANCE, 0),
      {},
      options,
    );
  },
} satisfies Record<string, (element: Element, options?: Options) => void>;

export default animations;
