export interface Options {
  offset: number;
  delay: number;
  duration: number;
  easing: Easing;
  once: boolean;
  mirror: boolean;
  anchorPlacement: AnchorPlacement;
}

export type FadeAnimation =
  | "fade"
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "fade-up-right"
  | "fade-up-left"
  | "fade-down-right"
  | "fade-down-left";

export type FlipAnimation =
  | "flip-up"
  | "flip-down"
  | "flip-left"
  | "flip-right";

export type SlideAnimation =
  | "slide-up"
  | "slide-down"
  | "slide-left"
  | "slide-right";

export type ZoomAnimation =
  | "zoom-in"
  | "zoom-in-up"
  | "zoom-in-down"
  | "zoom-in-left"
  | "zoom-in-right"
  | "zoom-out"
  | "zoom-out-up"
  | "zoom-out-down"
  | "zoom-out-left"
  | "zoom-out-right";

export type Animation =
  | FadeAnimation
  | FlipAnimation
  | SlideAnimation
  | ZoomAnimation;

export type AnchorPlacement =
  | "top-bottom"
  | "top-center"
  | "top-top"
  | "center-bottom"
  | "center-center"
  | "center-top"
  | "bottom-bottom"
  | "bottom-center"
  | "bottom-top";

export type Easing =
  | "linear"
  | "ease"
  | "ease-in"
  | "ease-out"
  | "ease-in-out"
  | "ease-in-back"
  | "ease-out-back"
  | "ease-in-out-back"
  | "ease-in-sine"
  | "ease-out-sine"
  | "ease-in-out-sine"
  | "ease-in-quad"
  | "ease-out-quad"
  | "ease-in-out-quad"
  | "ease-in-cubic"
  | "ease-out-cubic"
  | "ease-in-out-cubic"
  | "ease-in-quart"
  | "ease-out-quart"
  | "ease-in-out-quart";
