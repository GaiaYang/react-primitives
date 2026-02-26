"use client";

import { useState } from "react";

import cn from "@/utils/cn";

import { useAOSInitial } from "@/features/aos";
import { animations, bgColors } from "./config";

interface Option {
  label: string;
  value: string;
}

const options: Option[] = [
  { label: "全部展示", value: "all" },
  { label: "js的流動版面", value: "react-responsive" },
];

export default function Demo() {
  const [type, setType] = useState(options[0].value);

  const { containerRef } = useAOSInitial<HTMLDivElement>();

  return (
    <div ref={containerRef} className="flex flex-col gap-4 overflow-hidden p-4">
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
    <div className="grid w-full gap-2">
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
