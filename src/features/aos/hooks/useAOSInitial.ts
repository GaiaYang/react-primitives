import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import initScrollAnimations from "../core/initScrollAnimations";

gsap.registerPlugin(useGSAP);

const AOS_PROPS_KEY = [
  "data-aos",
  "data-aos-offset",
  "data-aos-delay",
  "data-aos-duration",
  "data-aos-easing",
  "data-aos-mirror",
  "data-aos-once",
  "data-aos-anchor-placement",
];

export default function useAOSInitial<E extends HTMLElement>() {
  const containerRef = useRef<E | null>(null);

  useGSAP(
    (context) => {
      const container = containerRef.current;
      if (!container) return;

      let animations: gsap.core.Tween[] = [];

      function cleanAnimations() {
        animations.forEach((anim) => anim.kill());
      }

      function init() {
        cleanAnimations();
        animations = [];

        const selector = context.selector;
        if (!selector) return;

        const boxes = selector("[data-aos]") as HTMLElement[];
        if (!boxes.length) return;

        animations = initScrollAnimations(boxes);
      }

      // 初始執行
      init();

      // 監聽子元素變化
      const observer = new MutationObserver(init);

      observer.observe(container, {
        childList: true,
        subtree: true,
      });

      // 清理
      return () => {
        observer.disconnect();
        cleanAnimations();
      };
    },
    { scope: containerRef },
  );

  return { containerRef };
}
