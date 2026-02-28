import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { AnchorPlacement, ScrollAnimationOptions } from "../types";
import { DEFAULT_OPTIONS, DISTANCE } from "./config";
import { translate3d, scale, rotateX, rotateY, perspective } from "./tweenVars";

gsap.registerPlugin(ScrollTrigger);

export type AnimationFunction = (
  element: Element,
  contextSafe?: gsap.ContextSafeFunc,
  options?: ScrollAnimationOptions,
) => gsap.core.Tween;

type AnimationPreset = {
  from: gsap.TweenVars;
  to: gsap.TweenVars;
};

interface AnimationConfig extends AnimationPreset {
  preset: AnimationPreset;
}

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
} satisfies Record<string, AnimationPreset>;

/** 計算 ScrollTrigger start 語法 */
function scrollTriggerStart(
  anchorPlacement: AnchorPlacement,
  offset: number,
): string {
  const [v1, v2] = anchorPlacement.split("-");
  const anchor = `${v1} ${v2}`;

  if (offset === 0 || Number.isNaN(offset)) return anchor;

  const fix = `${offset > 0 ? "-" : "+"}=${Math.abs(offset)}`;
  return `${anchor}${fix}`;
}

/** 建立 ScrollTrigger 動畫 */
function createScrollTriggerTween(
  element: Element,
  preset: AnimationPreset,
  fromVars: gsap.TweenVars,
  toVars: gsap.TweenVars,
  options?: ScrollAnimationOptions,
) {
  const { offset, delay, duration, easing, once, mirror, anchorPlacement } = {
    ...DEFAULT_OPTIONS,
    ...options,
  };

  const container = element.parentElement?.hasAttribute("data-aos-container")
    ? element.parentElement
    : null;

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
        // markers: true,
        trigger: container || element,
        toggleActions: mirror
          ? "play play reverse none"
          : "play none none reverse",
        once,
        start: scrollTriggerStart(anchorPlacement, offset),
      },
      ease: easing,
      duration: duration / 1000,
      delay: delay / 1000,
    },
  );
}

const config = {
  fade: { preset: presets.fade, from: {}, to: {} },
  fadeUp: {
    preset: presets.fade,
    from: translate3d(0, DISTANCE, 0),
    to: {},
  },
  fadeDown: {
    preset: presets.fade,
    from: translate3d(0, -DISTANCE, 0),
    to: {},
  },
  fadeLeft: {
    preset: presets.fade,
    from: translate3d(DISTANCE, 0, 0),
    to: {},
  },
  fadeRight: {
    preset: presets.fade,
    from: translate3d(-DISTANCE, 0, 0),
    to: {},
  },
  fadeUpRight: {
    preset: presets.fade,
    from: translate3d(-DISTANCE, DISTANCE, 0),
    to: {},
  },
  fadeUpLeft: {
    preset: presets.fade,
    from: translate3d(DISTANCE, DISTANCE, 0),
    to: {},
  },
  fadeDownRight: {
    preset: presets.fade,
    from: translate3d(-DISTANCE, -DISTANCE, 0),
    to: {},
  },
  fadeDownLeft: {
    preset: presets.fade,
    from: translate3d(DISTANCE, -DISTANCE, 0),
    to: {},
  },
  flipUp: {
    preset: presets.flip,
    from: {
      ...perspective(2500),
      ...rotateX("-100deg"),
    },
    to: { ...perspective(2500), ...rotateX(0) },
  },
  flipDown: {
    preset: presets.flip,
    from: {
      ...perspective(2500),
      ...rotateX("100deg"),
    },
    to: { ...perspective(2500), ...rotateX(0) },
  },
  flipLeft: {
    preset: presets.flip,
    from: {
      ...perspective(2500),
      ...rotateY("-100deg"),
    },
    to: { ...perspective(2500), ...rotateY(0) },
  },
  flipRight: {
    preset: presets.flip,
    from: {
      ...perspective(2500),
      ...rotateY("100deg"),
    },
    to: { ...perspective(2500), ...rotateY(0) },
  },
  slideUp: {
    preset: presets.slide,
    from: translate3d(0, "100%", 0),
    to: {},
  },
  slideDown: {
    preset: presets.slide,
    from: translate3d(0, "-100%", 0),
    to: {},
  },
  slideLeft: {
    preset: presets.slide,
    from: translate3d("100%", 0, 0),
    to: {},
  },
  slideRight: {
    preset: presets.slide,
    from: translate3d("-100%", 0, 0),
    to: {},
  },
  zoomIn: { preset: presets.zoom, from: scale(0.6), to: {} },
  zoomInUp: {
    preset: presets.zoom,
    from: { ...translate3d(0, DISTANCE, 0), ...scale(0.6) },
    to: {},
  },
  zoomInDown: {
    preset: presets.zoom,
    from: { ...translate3d(0, -DISTANCE, 0), ...scale(0.6) },
    to: {},
  },
  zoomInLeft: {
    preset: presets.zoom,
    from: { ...translate3d(DISTANCE, 0, 0), ...scale(0.6) },
    to: {},
  },
  zoomInRight: {
    preset: presets.zoom,
    from: { ...translate3d(-DISTANCE, 0, 0), ...scale(0.6) },
    to: {},
  },
  zoomOut: { preset: presets.zoom, from: scale(1.2), to: {} },
  zoomOutUp: {
    preset: presets.zoom,
    from: {
      ...translate3d(0, DISTANCE, 0),
      ...scale(1.2),
    },
    to: {},
  },
  zoomOutDown: {
    preset: presets.zoom,
    from: {
      ...translate3d(0, -DISTANCE, 0),
      ...scale(1.2),
    },
    to: {},
  },
  zoomOutLeft: {
    preset: presets.zoom,
    from: {
      ...translate3d(DISTANCE, 0, 0),
      ...scale(1.2),
    },
    to: {},
  },
  zoomOutRight: {
    preset: presets.zoom,
    from: {
      ...translate3d(-DISTANCE, 0, 0),
      ...scale(1.2),
    },
    to: {},
  },
} satisfies Record<string, AnimationConfig>;

function createTweenMap<T extends Record<string, AnimationConfig>>(
  config: T,
): { [K in keyof T]: AnimationFunction } {
  const result = {} as Record<keyof T, AnimationFunction>;
  const keys = Object.keys(config) as Array<keyof T>;

  for (const key of keys) {
    const { preset, from, to } = config[key];

    result[key] = (element, contextSafe, options) => {
      return (
        contextSafe
          ? contextSafe(createScrollTriggerTween)
          : createScrollTriggerTween
      )(element, preset, from, to, options);
    };
  }

  return result;
}

const animations = createTweenMap(config);

export default animations;
