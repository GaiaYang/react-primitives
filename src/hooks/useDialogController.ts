import { useMemo, useState } from "react";

import useDialogObserver, { type DialogPhase } from "./useDialogObserver";

export type { DialogPhase };

/**
 * 用於 `<dialog />` 的控制器，可以取得當前狀態、是否開啟、切換開啟
 *
 * ```ts
  function Component() {
    const { toggle, ref, isOpen, phase } = useDialogObserver()

    return (
      <dialog ref={ref} className="modal">
        <div className="modal-box"></div>
      </dialog>
    ) 
  }
 * ```
 */
export default function useDialogController() {
  const [phase, setPhase] = useState<DialogPhase>("none");
  const { toggle, ref } = useDialogObserver({
    onPhaseChange: setPhase,
  });

  return useMemo(
    () => ({
      /** dialog 是否開啟 */
      isOpen: phase === "opened",
      /** 控制 dialog 開關 */
      toggle,
      /** dialog 狀態 */
      phase,
      /** 方便綁定 dialog 的 ref */
      ref,
    }),
    [toggle, phase, ref],
  );
}
