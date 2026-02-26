import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import initScrollAnimations from "../core/initScrollAnimations";

gsap.registerPlugin(useGSAP);

export default function useAOSInitial<E extends HTMLElement>() {
  const containerRef = useRef<E | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  const animationsRef = useRef<gsap.core.Tween[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;

      function cleanAnimations() {
        animationsRef.current.forEach((anim) => anim.kill());
        animationsRef.current = [];
      }

      function cleanMutation() {
        if (observerRef.current) {
          observerRef.current.disconnect();
          observerRef.current = null;
        }
      }

      function init() {
        cleanAnimations();

        const elements = gsap.utils.toArray<HTMLElement>(
          "[data-aos]",
          containerRef.current,
        );

        if (!elements.length) return;

        animationsRef.current = initScrollAnimations(elements);
      }

      const handleMutation: MutationCallback = (mutations) => {
        for (const mutation of mutations) {
          const allNodes = [...mutation.addedNodes, ...mutation.removedNodes];

          if (containsAOSNode(allNodes)) {
            init();
            break;
          }
        }
      };

      init();

      observerRef.current = new MutationObserver(handleMutation);
      observerRef.current.observe(containerRef.current, {
        childList: true,
        subtree: true,
      });

      return () => {
        cleanAnimations();
        cleanMutation();
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
