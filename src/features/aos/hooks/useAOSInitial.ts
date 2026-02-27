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

export default function useAOSInitial<E extends HTMLElement = HTMLElement>() {
  const containerRef = useRef<E | null>(null);
  const observerRef = useRef<MutationObserver | null>(null);
  // 使用 WeakMap 記錄每個元素對應的動畫實例
  const elementAnimations = useRef<WeakMap<HTMLElement, gsap.core.Tween>>(
    new WeakMap(),
  );

  useGSAP(
    (context, contextSafe) => {
      if (!containerRef.current || !contextSafe || !context) return;

      // 初始化元素動畫，並存入 WeakMap
      const initAOSForElements = (elements: HTMLElement[]) => {
        const newElements = elements.filter(
          (element) => !elementAnimations.current.has(element),
        );
        if (newElements.length === 0) return;
        const anims = initScrollAnimations(newElements, contextSafe);
        newElements.forEach((element, index) => {
          elementAnimations.current.set(element, anims[index]);
        });
      };

      // 初次初始化 container 內的所有 [data-aos] 元素
      initAOSForElements(
        gsap.utils.toArray<HTMLElement>("[data-aos]", containerRef.current),
      );

      const handleMutation: MutationCallback = (mutations) => {
        const addedElements: HTMLElement[] = [];
        const removedElements: HTMLElement[] = [];

        for (const mutation of mutations) {
          if (
            mutation.type === "attributes" &&
            mutation.attributeName?.startsWith("data-aos")
          ) {
            if (mutation.target instanceof HTMLElement) {
              addedElements.push(mutation.target);
            }
          }

          if (mutation.type === "childList") {
            for (const node of mutation.addedNodes) {
              collectAOSNodes(node, addedElements);
            }
            for (const node of mutation.removedNodes) {
              collectAOSNodes(node, removedElements);
            }
          }
        }

        // 清理移除的元素動畫
        for (const element of removedElements) {
          const anim = elementAnimations.current.get(element);
          if (anim) {
            anim.kill();
            elementAnimations.current.delete(element);
          }
        }

        // 初始化新增元素動畫
        initAOSForElements(addedElements);
      };

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

function collectAOSNodes(node: Node, result: HTMLElement[]) {
  if (!(node instanceof HTMLElement)) return;

  if (node.matches("[data-aos]")) {
    result.push(node);
  }

  result.push(...Array.from(node.querySelectorAll<HTMLElement>("[data-aos]")));
}
