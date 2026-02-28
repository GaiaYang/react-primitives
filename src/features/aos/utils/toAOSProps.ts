import type { AOSAnimation, ScrollAnimationOptions } from "../types";
import { anchorPlacements, easings } from "../constants";

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

interface AOSAttributeOptions extends Partial<ScrollAnimationOptions> {
  animation: AOSAnimation;
}

/** 將 options 轉成可直接使用的 AOS data attributes */
export default function toAOSProps(options: AOSAttributeOptions) {
  const attrs: AOSDataAttributes = {
    "data-aos": options.animation,
    "data-aos-offset": toNumberAttr(options.offset),
    "data-aos-delay": toNumberAttr(options.delay),
    "data-aos-duration": toNumberAttr(options.duration),
    "data-aos-easing": validateEnumValue(easings, options.easing),
    "data-aos-mirror": toBooleanAttr(options.mirror),
    "data-aos-once": toBooleanAttr(options.once),
    "data-aos-anchor-placement": validateEnumValue(
      anchorPlacements,
      options.anchorPlacement,
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

function validateEnumValue<T>(list: readonly T[], value: unknown) {
  return list.includes(value as T) ? (value as T) : undefined;
}
