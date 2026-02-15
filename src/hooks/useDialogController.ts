import { useState } from "react";

import useDialogObserver, {
  type DialogTarget,
  type DialogPhase,
} from "./useDialogObserver";

export default function useDialogController(target: DialogTarget) {
  const [phase, setPhase] = useState<DialogPhase>("empty");
  const { toggle } = useDialogObserver(target, { onPhaseChange: setPhase });

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
