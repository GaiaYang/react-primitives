"use client";

import { useState } from "react";

import cn from "@/utils/cn";

import useDialogController from "@/hooks/useDialogController";
import Article from "@/components/ui/Article";

export default function page() {
  return (
    <main className="py-10">
      <Article>
        <h1>Dialog Hook 測試</h1>
        <Original />
        <WithStyle />
      </Article>
    </main>
  );
}

function Template({
  title,
  renderDialog,
}: {
  title?: string;
  renderDialog?: (callback: {
    ref: (el: HTMLDialogElement | null) => () => void;
    toggle: (next?: boolean | undefined) => void;
  }) => React.ReactNode;
}) {
  const [visibleDialog, setVisibleDialog] = useState(true);
  const { toggle, isOpen, phase, ref } = useDialogController();

  return (
    <section>
      <h2>{title}</h2>
      <button
        type="button"
        className="btn"
        onClick={() => {
          toggle();
        }}
      >
        切換 dialog 開關
      </button>
      <p>{`Dialog 目前是${isOpen ? "打開" : "關閉"}`}</p>
      <p>{`Dialog 現在處於 ${phase} 階段`}</p>
      <button
        type="button"
        className={cn("btn", visibleDialog ? "btn-error" : "btn-info")}
        onClick={() => {
          setVisibleDialog((e) => !e);
        }}
      >
        {`${visibleDialog ? "移除" : "加載"} dialog`}
      </button>
      {visibleDialog && renderDialog?.({ ref, toggle })}
    </section>
  );
}

function Original() {
  return (
    <Template
      title="原生無樣式 Dialog"
      renderDialog={({ ref, toggle }) => (
        <dialog ref={ref}>
          <h3>Hello!</h3>
          <p>Press ESC key or click the button below to close</p>
          <button
            type="button"
            onClick={() => {
              toggle(false);
            }}
          >
            關閉
          </button>
        </dialog>
      )}
    />
  );
}

function WithStyle() {
  return (
    <Template
      title="帶有 transition 樣式的 Dialog"
      renderDialog={({ ref, toggle }) => (
        <dialog ref={ref} className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Hello!</h3>
            <p className="py-4">
              Press ESC key or click the button below to close
            </p>
            <div className="modal-action">
              <button
                className="btn"
                type="button"
                onClick={() => {
                  toggle(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    />
  );
}
