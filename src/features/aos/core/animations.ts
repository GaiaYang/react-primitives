import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { ScrollAnimationOptions } from "../types";
import { DEFAULT_OPTIONS, DISTANCE } from "./config";
import { translate3d, scale, rotateX, rotateY, perspective } from "./tweenVars";

gsap.registerPlugin(ScrollTrigger);

export type AnimationFunction = (
  element: Element,
  options?: ScrollAnimationOptions,
) => void;

type AnimationPreset = {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
};

type PresetMap = Record<string, AnimationPreset>;

/** 動畫預設配置 */
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
function createScrollTriggerTween(
  element: Element,
  preset: AnimationPreset,
  fromVars?: gsap.TweenVars,
  toVars?: gsap.TweenVars,
  options?: ScrollAnimationOptions,
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
        toggleActions: mirror
          ? "play play reverse none"
          : "play none none reverse",
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
    createScrollTriggerTween(element, presets.fade, {}, {}, options);
  },
  fadeUp(element, options) {
    createScrollTriggerTween(
      element,
      presets.fade,
      translate3d(0, DISTANCE, 0),
      {},
      options,
    );
  },
  fadeDown(element, options) {
    createScrollTriggerTween(
      element,
      presets.fade,
      translate3d(0, -DISTANCE, 0),
      {},
      options,
    );
  },
  fadeRight(element, options) {
    createScrollTriggerTween(
      element,
      presets.fade,
      translate3d(-DISTANCE, 0, 0),
      {},
      options,
    );
  },
  fadeLeft(element, options) {
    createScrollTriggerTween(
      element,
      presets.fade,
      translate3d(DISTANCE, 0, 0),
      {},
      options,
    );
  },
  fadeUpRight(element, options) {
    createScrollTriggerTween(
      element,
      presets.fade,
      translate3d(-DISTANCE, DISTANCE, 0),
      {},
      options,
    );
  },
  fadeUpLeft(element, options) {
    createScrollTriggerTween(
      element,
      presets.fade,
      translate3d(DISTANCE, DISTANCE, 0),
      {},
      options,
    );
  },
  fadeDownRight(element, options) {
    createScrollTriggerTween(
      element,
      presets.fade,
      translate3d(-DISTANCE, -DISTANCE, 0),
      {},
      options,
    );
  },
  fadeDownLeft(element, options) {
    createScrollTriggerTween(
      element,
      presets.fade,
      translate3d(DISTANCE, -DISTANCE, 0),
      {},
      options,
    );
  },
  zoomIn(element, options) {
    createScrollTriggerTween(element, presets.zoom, scale(0.6), {}, options);
  },
  zoomInUp(element, options) {
    createScrollTriggerTween(
      element,
      presets.zoom,
      { ...translate3d(0, DISTANCE, 0), ...scale(0.6) },
      {},
      options,
    );
  },
  zoomInDown(element, options) {
    createScrollTriggerTween(
      element,
      presets.zoom,
      { ...translate3d(0, -DISTANCE, 0), ...scale(0.6) },
      {},
      options,
    );
  },
  zoomInRight(element, options) {
    createScrollTriggerTween(
      element,
      presets.zoom,
      { ...translate3d(-DISTANCE, 0, 0), ...scale(0.6) },
      {},
      options,
    );
  },
  zoomInLeft(element, options) {
    createScrollTriggerTween(
      element,
      presets.zoom,
      { ...translate3d(DISTANCE, 0, 0), ...scale(0.6) },
      {},
      options,
    );
  },
  zoomOut(element, options) {
    createScrollTriggerTween(element, presets.zoom, scale(1.2), {}, options);
  },
  zoomOutUp(element, options) {
    createScrollTriggerTween(
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
    createScrollTriggerTween(
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
    createScrollTriggerTween(
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
    createScrollTriggerTween(
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
    createScrollTriggerTween(
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
    createScrollTriggerTween(
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
    createScrollTriggerTween(
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
    createScrollTriggerTween(
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
    createScrollTriggerTween(
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
    createScrollTriggerTween(
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
    createScrollTriggerTween(
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
    createScrollTriggerTween(
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
} satisfies Record<string, AnimationFunction>;

export default animations;
