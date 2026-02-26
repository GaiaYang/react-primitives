import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import initScrollAnimations from "../core/initScrollAnimations";

gsap.registerPlugin(useGSAP);

const AOS_PROPS_KEYS = [
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
  const observerRef = useRef<MutationObserver | null>(null);
  // const animationsRef = useRef<gsap.core.Tween[]>([]);

  useGSAP(
    (context, contextSafe) => {
      if (!containerRef.current || !contextSafe || !context) return;

      const init = () => {
        context.kill();

        const elements = gsap.utils.toArray<HTMLElement>(
          "[data-aos]",
          containerRef.current,
        );

        contextSafe(initScrollAnimations)(elements);
      };

      const handleMutation: MutationCallback = (mutations) => {
        let shouldInit = false;
        for (const mutation of mutations) {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName?.startsWith("data-aos")
          ) {
            shouldInit = true;
            break;
          }

          if (mutation.type === "childList") {
            const allNodes = [...mutation.addedNodes, ...mutation.removedNodes];

            if (containsAOSNode(allNodes)) {
              shouldInit = true;
              break;
            }
          }
        }

        if (shouldInit) {
          init();
        }
      };

      init();

      observerRef.current = new MutationObserver(handleMutation);
      observerRef.current.observe(containerRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: AOS_PROPS_KEYS,
      });

      return () => {
        if (observerRef.current) {
          observerRef.current.disconnect();
          observerRef.current = null;
        }
      };
    },
    { scope: containerRef, dependencies: [] },
  );

  return { containerRef };
}

function containsAOSNode(nodes: Node[]) {
  for (const node of nodes) {
    if (!(node instanceof HTMLElement)) continue;

    if (node.matches?.("[data-aos]") || node.querySelector?.("[data-aos]")) {
      return true;
    }
  }

  return false;
}
