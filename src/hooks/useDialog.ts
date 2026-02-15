import {
  useState,
  useCallback,
  useEffect,
  useEffectEvent,
  useRef,
} from "react";

/**
 * dialog 狀態
 * - empty: 找不到元素
 * - opening: 開啟中
 * - opened: 開啟
 * - closing: 關閉中
 * - closed: 關閉
 */
export type DialogPhase = "empty" | "opening" | "opened" | "closing" | "closed";

type DialogTarget =
  | (() => HTMLDialogElement | null)
  | React.RefObject<HTMLDialogElement | null>
  | string;

/** 解析 dialog 元素 */
function resolveDialog(target?: DialogTarget): HTMLDialogElement | undefined {
  let el: HTMLElement | null | undefined;

  switch (typeof target) {
    case "function":
      el = target();
      break;
    case "string":
      el = document.getElementById(target);
      break;
    default:
      el = target?.current ?? undefined;
  }

  if (el instanceof HTMLDialogElement) return el;
  return undefined;
}

export function useDialogController(ref: DialogTarget) {
  const [phase, setPhase] = useState<DialogPhase>("empty");
  const { toggle } = useDialogObserver(ref, { onPhaseChange: setPhase });

  const isOpen = phase === "opened";

  return {
    /** dialog 是否開啟 */
    isOpen,
    /** 控制 dialog 開關 */
    toggle,
    /** dialog 狀態 */
    phase,
  } as const;
}

export function useDialogObserver(
  ref: DialogTarget,
  callbacks: {
    onPhaseChange?: (phase: DialogPhase) => void;
    onOpening?: () => void;
    onClosing?: () => void;
    onOpened?: () => void;
    onClosed?: () => void;
  } = {},
) {
  const phaseRef = useRef<DialogPhase>("empty");

  /** 更新 dialog 階段 */
  const updatePhase = useEffectEvent((next: DialogPhase) => {
    if (phaseRef.current === next) return;

    phaseRef.current = next;
    callbacks.onPhaseChange?.(phaseRef.current);

    switch (next) {
      case "opening":
        callbacks.onOpening?.();
        break;
      case "closing":
        callbacks.onClosing?.();
        break;
      case "opened":
        callbacks.onOpened?.();
        break;
      case "closed":
        callbacks.onClosed?.();
        break;
    }
  });

  const handleObserver = useEffectEvent((mutations: MutationRecord[]) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes" && mutation.attributeName === "open") {
        const dialog = mutation.target as HTMLDialogElement;

        updatePhase(dialog.open ? "opening" : "closing");
      }
    }
  });

  const handleTransitionEnd = useEffectEvent((event: TransitionEvent) => {
    if (event.target !== event.currentTarget) return;

    const dialog = event.currentTarget as HTMLDialogElement;

    updatePhase(dialog.open ? "opened" : "closed");
  });

  useEffect(() => {
    const dialog = resolveDialog(ref);
    if (!dialog) {
      updatePhase("empty");
      return;
    }

    updatePhase(dialog.open ? "opened" : "closed");

    const observer = new MutationObserver(handleObserver);
    observer.observe(dialog, { attributes: true, attributeFilter: ["open"] });

    dialog.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      observer.disconnect();
      dialog.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [ref]);

  const toggle = useCallback(
    (next?: boolean) => {
      const dialog = resolveDialog(ref);
      if (!dialog) return;

      const shouldOpen = typeof next === "boolean" ? next : !dialog.open;
      // 避免重複開關
      if (shouldOpen === dialog.open) return;

      if (shouldOpen) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    },
    [ref],
  );

  return { toggle };
}
