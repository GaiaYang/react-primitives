"use client";

import { useDialogController } from "@/hooks/useDialog";
import { useRef } from "react";

export default function page() {
  return (
    <main className="py-10">
      <Basic />
    </main>
  );
}

function Basic() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { toggle, isOpen, phase } = useDialogController(dialogRef);

  return (
    <div>
      <button
        type="button"
        className="btn"
        onClick={() => {
          toggle();
        }}
      >
        toggle dialog
      </button>
      <p>{`dialog open: ${isOpen ? "true" : "false"}`}</p>
      <p>{`dialog phase: ${phase}`}</p>
      <dialog ref={dialogRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">
            Press ESC key or click the button below to close
          </p>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
