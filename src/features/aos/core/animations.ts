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
  easing: "none",
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
  zoom: {
    from: {
      opacity: 0,
      transitionProperty: "opacity, transform",
    },
    to: {
      opacity: 1,
      ...translate3d(0, 0, 0),
      ...scale(1),
    },
  },
  slide: {
    from: {
      visibility: "hidden",
      transitionProperty: "transform",
    },
    to: {
      visibility: "visible",
      ...translate3d(0, 0, 0),
    },
  },
  flip: {
    from: {
      backfaceVisibility: "hidden",
      transitionProperty: "transform",
    },
    to: {},
  },
} satisfies PresetMap;

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
        once,
        markers: true,
        start: anchorPlacement.replace("-", " "),
        end: `+=${offset}`,
      },
      ease: easing,
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
  zoomIn(element, options) {
    createScrollAnimation(element, presets.zoom, scale(0.6), {}, options);
  },
  zoomInUp(element, options) {
    createScrollAnimation(
      element,
      presets.zoom,
      { ...translate3d(0, DISTANCE, 0), ...scale(0.6) },
      {},
      options,
    );
  },
  zoomInDown(element, options) {
    createScrollAnimation(
      element,
      presets.zoom,
      { ...translate3d(0, -DISTANCE, 0), ...scale(0.6) },
      {},
      options,
    );
  },
  zoomInRight(element, options) {
    createScrollAnimation(
      element,
      presets.zoom,
      { ...translate3d(-DISTANCE, 0, 0), ...scale(0.6) },
      {},
      options,
    );
  },
  zoomInLeft(element, options) {
    createScrollAnimation(
      element,
      presets.zoom,
      { ...translate3d(DISTANCE, 0, 0), ...scale(0.6) },
      {},
      options,
    );
  },
  zoomOut(element, options) {
    createScrollAnimation(element, presets.zoom, scale(1.2), {}, options);
  },
  zoomOutUp(element, options) {
    createScrollAnimation(
      element,
      presets.zoom,
      {
        ...translate3d(0, DISTANCE, 0),
        ...scale(1.2),
      },
      {},
      options,
    );
  },
  zoomOutDown(element, options) {
    createScrollAnimation(
      element,
      presets.zoom,
      {
        ...translate3d(0, -DISTANCE, 0),
        ...scale(1.2),
      },
      {},
      options,
    );
  },
  zoomOutRight(element, options) {
    createScrollAnimation(
      element,
      presets.zoom,
      {
        ...translate3d(-DISTANCE, 0, 0),
        ...scale(1.2),
      },
      {},
      options,
    );
  },
  zoomOutLeft(element, options) {
    createScrollAnimation(
      element,
      presets.zoom,
      {
        ...translate3d(DISTANCE, 0, 0),
        ...scale(1.2),
      },
      {},
      options,
    );
  },
  slideUp(element, options) {
    createScrollAnimation(
      element,
      presets.slide,
      {
        ...translate3d(0, "100%", 0),
      },
      {},
      options,
    );
  },
  slideDown(element, options) {
    createScrollAnimation(
      element,
      presets.slide,
      {
        ...translate3d(0, "-100%", 0),
      },
      {},
      options,
    );
  },
  slideRight(element, options) {
    createScrollAnimation(
      element,
      presets.slide,
      {
        ...translate3d("-100%", 0, 0),
      },
      {},
      options,
    );
  },
  slideLeft(element, options) {
    createScrollAnimation(
      element,
      presets.slide,
      {
        ...translate3d("100%", 0, 0),
      },
      {},
      options,
    );
  },
  flipLeft(element, options) {
    createScrollAnimation(
      element,
      presets.flip,
      {
        ...perspective(2500),
        ...rotateY("-100deg"),
      },
      { ...perspective(2500), ...rotateY(0) },
      options,
    );
  },
  flipRight(element, options) {
    createScrollAnimation(
      element,
      presets.flip,
      {
        ...perspective(2500),
        ...rotateY("100deg"),
      },
      { ...perspective(2500), ...rotateY(0) },
      options,
    );
  },
  flipUp(element, options) {
    createScrollAnimation(
      element,
      presets.flip,
      {
        ...perspective(2500),
        ...rotateX("-100deg"),
      },
      { ...perspective(2500), ...rotateX(0) },
      options,
    );
  },
  flipDown(element, options) {
    createScrollAnimation(
      element,
      presets.flip,
      {
        ...perspective(2500),
        ...rotateX("100deg"),
      },
      { ...perspective(2500), ...rotateX(0) },
      options,
    );
  },
} satisfies Record<string, (element: Element, options?: Options) => void>;

export default animations;

function translate3d(
  x: number | string,
  y: number | string,
  z: number | string,
): Pick<gsap.TweenVars, "x" | "y" | "z"> {
  return { x, y, z };
}

function rotateY(y: number | string): Pick<gsap.TweenVars, "rotateY"> {
  return { rotateY: y };
}

function rotateX(x: number | string): Pick<gsap.TweenVars, "rotateX"> {
  return { rotateX: x };
}

function scale(
  x: number,
  y?: number,
): Pick<gsap.TweenVars, "scale" | "scaleX" | "scaleY"> {
  if (typeof y === "number") {
    return {
      scaleX: x,
      scaleY: y,
    };
  }
  return {
    scale: x,
  };
}

function perspective(value: number): gsap.TweenVars {
  return {
    perspective: value,
  };
}
