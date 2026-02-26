"use client";

import { useRef, useState } from "react";

import cn from "@/utils/cn";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import initScrollAnimations from "@/features/aos/core/initScrollAnimations";

import { animations, bgColors } from "./config";

gsap.registerPlugin(useGSAP);

interface Option {
  label: string;
  value: string;
}

const options: Option[] = [
  { label: "全部展示", value: "all" },
  { label: "js的流動版面", value: "react-responsive" },
];

export default function Demo() {
  const [show, setShow] = useState(true);
  const [type, setType] = useState(options[0].value);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const boxes = gsap.utils.toArray("[data-aos]") as HTMLDivElement[];
      initScrollAnimations(boxes);
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="flex flex-col gap-4 p-4">
      {false && (
        <button
          type="button"
          onClick={() => setShow((e) => !e)}
          className="btn"
        >
          {`${show ? "隱藏" : "顯示"}`}
        </button>
      )}
      <div role="tablist" className="tabs tabs-box">
        {options.map((item) => (
          <button
            type="button"
            role="tab"
            key={item.value}
            onClick={() => {
              setType(item.value);
            }}
            className={cn("tab", { "tab-active": type === item.value })}
          >
            {item.label}
          </button>
        ))}
      </div>
      {renderAOS(type)}
    </div>
  );
}

function renderAOS(type: string) {
  switch (type) {
    case "all":
      return <AllExhibit />;
    case "react-responsive":
      return <JsResponsive />;
    default:
      return null;
  }
}

/** 展示所有AOS動畫 */
function AllExhibit() {
  return (
    <div className="grid w-full gap-2 overflow-hidden">
      {animations.map((item, index) => (
        <div
          key={item}
          data-aos={item}
          className={cn(
            "rounded-box border-base-content/50 h-80 border",
            bgColors[index],
            "flex items-center justify-center",
          )}
        >
          <p
            className={cn(
              "text-3xl font-semibold",
              index % 11 >= 5 ? "text-white" : "text-black",
            )}
          >
            {item}
          </p>
        </div>
      ))}
    </div>
  );
}

function JsResponsive() {
  return <div></div>;
}
