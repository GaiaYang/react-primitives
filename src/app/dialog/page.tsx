"use client";

import { useRef } from "react";

import { useDialogController } from "@/hooks/useDialog";

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
      <p>{`dialog ${isOpen ? "open" : "close"}`}</p>
      <p>{`dialog is ${phase}`}</p>
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
