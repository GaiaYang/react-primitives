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
      if (context.selector) {
        const boxes = context.selector("[data-aos]") as HTMLDivElement[];
        initScrollAnimations(boxes);
      }
    },
    { scope: containerRef },
  );

  return { containerRef };
}
