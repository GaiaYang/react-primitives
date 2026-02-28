import type { AOSAnimation, ScrollAnimationOptions } from "../types";
import { anchorPlacements, easings } from "./config";

interface AOSDataAttributes extends Partial<
  Record<
    | "data-aos-offset"
    | "data-aos-delay"
    | "data-aos-duration"
    | "data-aos-easing"
    | "data-aos-mirror"
    | "data-aos-once"
    | "data-aos-anchor-placement",
    string
  >
> {
  "data-aos": AOSAnimation;
}

interface AOSProps extends Partial<ScrollAnimationOptions> {
  animation: AOSAnimation;
}

/** 將 options 轉成可直接使用的 AOS data attributes */
export default function toAOSProps(params: AOSProps) {
  const attrs: AOSDataAttributes = {
    "data-aos": params.animation,
    "data-aos-offset": toNumberAttr(params.offset),
    "data-aos-delay": toNumberAttr(params.delay),
    "data-aos-duration": toNumberAttr(params.duration),
    "data-aos-easing": toEnumAttr(easings, params.easing),
    "data-aos-mirror": toBooleanAttr(params.mirror),
    "data-aos-once": toBooleanAttr(params.once),
    "data-aos-anchor-placement": toEnumAttr(
      anchorPlacements,
      params.anchorPlacement,
    ),
  };

  return cleanAttrs(attrs);
}

function cleanAttrs<T extends object>(obj: T) {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== undefined),
  ) as {
    [K in keyof T as T[K] extends undefined ? never : K]: T[K];
  };
}

function toBooleanAttr(value?: boolean) {
  return typeof value === "boolean" ? String(value) : undefined;
}

function toNumberAttr(value?: number) {
  return typeof value === "number" ? String(value) : undefined;
}

function toEnumAttr<T>(list: readonly T[], value: unknown) {
  return list.includes(value as T) ? (value as T) : undefined;
}
