export interface ScrollAnimationOptions {
  /**
   * 提前觸發動畫的距離 (px)
   *
   * @default 120
   */
  offset: number;
  /**
   * 延遲時間 (ms)
   *
   * @default 0
   */
  delay: number;
  /**
   * 持續時間 (ms)
   *
   * @default 400
   */
  duration: number;
  /**
   * 緩動曲線
   *
   * @default "none"
   */
  easing: Easing;
  /**
   * 是否只執行一次
   *
   * @default false
   */
  once: boolean;
  /**
   * 是否啟用動畫退場
   *
   * @default false
   */
  mirror: boolean;
  /**
   * 動畫在視窗的觸發位置
   *
   * [GSAP 文件](https://gsap.com/docs/v3/Eases)
   *
   * @default "top-bottom"
   */
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

export type AOSAnimation =
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

export type Easing = gsap.EaseString;
