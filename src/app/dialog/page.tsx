"use client";

import { useState } from "react";

import useDialogController from "@/hooks/useDialogController";
import Article from "@/components/ui/Article";

export default function page() {
  return (
    <main className="py-10">
      <Article>
        <h1>Dialog Hook 測試</h1>
        <Basic />
        <DynamicDialog />
      </Article>
    </main>
  );
}

function Basic() {
  const { toggle, isOpen, phase, ref } = useDialogController();

  return (
    <section>
      <h2>單一 Dialog</h2>
      <button
        type="button"
        className="btn"
        onClick={() => {
          toggle();
        }}
      >
        切換 dialog 開關
      </button>
      <p>{`dialog 目前是${isOpen ? "打開" : "關閉"}`}</p>
      <p>{`dialog 現在處於${phase}階段`}</p>
      <dialog ref={ref} className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
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
    </section>
  );
}

function DynamicDialog() {
  const [visibleDialog, setVisibleDialog] = useState(true);
  const { toggle, isOpen, phase, ref } = useDialogController();

  return (
    <div>
      <h2>Dialog 在 dom 變化時的行為</h2>
      <button
        type="button"
        className="btn"
        onClick={() => {
          toggle();
        }}
      >
        切換 dialog 開關
      </button>
      <p>{`dialog 目前是${isOpen ? "打開" : "關閉"}`}</p>
      <p>{`dialog 現在處於${phase}階段`}</p>
      <button
        type="button"
        className="btn"
        onClick={() => {
          setVisibleDialog((e) => !e);
        }}
      >
        {`${visibleDialog ? "移除" : "加載"} dialog`}
      </button>
      {visibleDialog && (
        <dialog ref={ref} className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">第 1 個 dialog</h3>
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
      )}
    </div>
  );
}
