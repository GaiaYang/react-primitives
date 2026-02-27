import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import type { AnchorPlacement, ScrollAnimationOptions } from "../types";
import { DEFAULT_OPTIONS, DISTANCE } from "./config";
import { translate3d, scale, rotateX, rotateY, perspective } from "./tweenVars";

gsap.registerPlugin(ScrollTrigger);

export type AnimationFunction = (
  element: Element,
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
function scrollTriggerStart(anchorPlacement: AnchorPlacement, offset: number) {
  const [v1, v2] = anchorPlacement.split("-");
  const anchor = `${v1} ${v2}`;

  if (offset === 0 || Number.isNaN(offset)) return anchor;

  const fix = `${offset > 0 ? "-" : "+"}=${Math.abs(offset)}`;
  return `${anchor}${fix}`;
}

/** 將百分比轉成 0~1 數值 */
function percentToNumber(value: string) {
  return parseFloat(value.replace("%", "")) / 100;
}

/** 將角度轉成弧度 */
function degToRad(deg: string) {
  return (parseFloat(deg) * Math.PI) / 180;
}

/** 計算 rotate + perspective 投影占用的尺寸 */
function computeProjectedSize(
  size: number,
  rotate: string,
  perspective: number,
) {
  const rad = degToRad(rotate);
  const half = size / 2;
  const sin = Math.sin(rad);
  const cos = Math.cos(rad);
  const z = half * sin;
  const projected = half * cos * (perspective / (perspective - z)) * 2;
  return (size + projected) / 2;
}

/** 補償垂直方向造成的位置偏移 */
function offsetFixed(
  offset: number,
  vars: gsap.TweenVars,
  height: number,
  width: number,
) {
  let result = offset;

  const _y = vars.translateY ?? vars.y ?? 0;

  if (typeof _y === "number") {
    result -= _y;
  } else if (typeof _y === "string" && _y.includes("%")) {
    result -= height * percentToNumber(_y);
  }

  const _scale =
    [vars.scaleY, vars.scale].find((v) => typeof v === "number") ?? 1;

  if (_scale !== 1) {
    result -= (height * (1 - _scale)) / 2;
  }

  const _perspective =
    [vars.perspective, vars.transformPerspective].find(
      (v) => typeof v === "number",
    ) ?? 0;

  if (typeof vars.rotateX === "string") {
    result -= computeProjectedSize(height, vars.rotateX, _perspective);
  }

  if (vars.rotateY === "string") {
    result -= computeProjectedSize(width, vars.rotateY, _perspective);
  }

  return Math.floor(result);
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

  const rect = element.getBoundingClientRect();

  const _fromVars = {
    ...preset.from,
    ...fromVars,
  };

  return gsap.fromTo(element, _fromVars, {
    ...preset.to,
    ...toVars,
    scrollTrigger: {
      markers: true,
      trigger: element,
      toggleActions: mirror
        ? "play play reverse none"
        : "play none none reverse",
      once,
      start: scrollTriggerStart(
        anchorPlacement,
        offsetFixed(offset, _fromVars, rect.height, rect.width),
      ),
    },
    ease: easing,
    duration: duration / 1000,
    delay: delay / 1000,
  });
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

function createAnimations<T extends Record<string, AnimationConfig>>(
  config: T,
): { [K in keyof T]: AnimationFunction } {
  const result = {} as Record<keyof T, AnimationFunction>;
  const keys = Object.keys(config) as Array<keyof T>;

  for (const key of keys) {
    const { preset, from, to } = config[key];

    result[key] = (element, options) =>
      createScrollTriggerTween(element, preset, from, to, options);
  }

  return result;
}

const animations = createAnimations(config);

export default animations;
