import { useCallback, useMemo, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

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

export default function useAOSInitial() {
  const containerRef = useRef<HTMLElement | null>(null);

  const ref = useCallback((node: HTMLElement | null) => {
    function cleanup() {
      if (containerRef.current) {
        containerRef.current = null;
      }
    }
    if (node) {
      containerRef.current = node;
    } else {
      cleanup();
    }

    return cleanup;
  }, []);

  return useMemo(() => ({ ref }), [ref]);
}
