import { useState, useCallback, useEffect, useEffectEvent } from "react";

export type DialogPhase = "idle" | "opening" | "opened" | "closing" | "closed";

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

/** dialog 控制器 */
export function useDialogController(ref: DialogTarget) {
  const [phase, setPhase] = useState<DialogPhase>("idle");
  useDialogEvents(ref, {
    onInitial(open) {
      setPhase(open ? "opened" : "closed");
    },
    onOpening: () => {
      setPhase("opening");
    },
    onClosing: () => {
      setPhase("closing");
    },
    onOpened: () => {
      setPhase("opened");
    },
    onClosed: () => {
      setPhase("closed");
    },
  });

  const toggle = useCallback(
    (value?: boolean | null) => {
      const dialog = resolveDialog(ref);
      if (!dialog) return;

      if (typeof value === "boolean" ? value : !dialog.open) {
        dialog.showModal();
      } else {
        dialog.close();
      }
    },
    [ref],
  );

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

/** 監聽 dialog 事件 */
export function useDialogEvents(
  ref: DialogTarget,
  callbacks: {
    onInitial?: (open: boolean) => void;
    onOpening?: () => void;
    onClosing?: () => void;
    onOpened?: () => void;
    onClosed?: () => void;
  } = {},
) {
  const syncInitialState = useEffectEvent((open: boolean) => {
    callbacks.onInitial?.(open);
  });

  const handleObserver = useEffectEvent((mutations: MutationRecord[]) => {
    for (const mutation of mutations) {
      if (mutation.type === "attributes" && mutation.attributeName === "open") {
        const dialog = mutation.target as HTMLDialogElement;
        const isOpen = dialog.hasAttribute("open");
        if (isOpen) {
          callbacks.onOpening?.();
        } else {
          callbacks.onClosing?.();
        }
      }
    }
  });

  const handleTransitionEnd = useEffectEvent((event: TransitionEvent) => {
    const dialog = event.currentTarget as HTMLDialogElement;
    if (dialog.open) {
      callbacks.onOpened?.();
    } else {
      callbacks.onClosed?.();
    }
  });

  useEffect(() => {
    const dialog = resolveDialog(ref);
    if (!dialog) return;

    syncInitialState(dialog.open);

    const observer = new MutationObserver(handleObserver);
    observer.observe(dialog, { attributes: true, attributeFilter: ["open"] });

    dialog.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      observer.disconnect();
      dialog.removeEventListener("transitionend", handleTransitionEnd);
    };
  }, [ref]);
}
