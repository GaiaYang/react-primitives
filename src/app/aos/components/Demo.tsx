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
  { label: "動態切換參數", value: "dynamic" },
  { label: "js的流動版面", value: "react-responsive" },
];

export default function Demo() {
  const [type, setType] = useState(options[0].value);

  const { containerRef } = useAOSInitial<HTMLDivElement>();

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col gap-4 overflow-hidden p-4"
    >
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
      <div className="bg-primary fixed bottom-30 left-0 h-px w-16" />
    </div>
  );
}

function renderAOS(type: string) {
  switch (type) {
    case "all":
      return <AllExhibit />;
    case "react-responsive":
      return <JsResponsive />;
    case "dynamic":
      return <DynamicChange />;
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

function DynamicChange() {
  const [animation, setAnimation] = useState(animations[0]);
  return (
    <div className="grid w-full gap-2">
      <div className="flex flex-wrap gap-[inherit]">
        {animations.map((item) => (
          <button
            key={item}
            onClick={() => {
              setAnimation(item);
            }}
            className={cn("btn", { "btn-primary": animation === item })}
          >
            {item}
          </button>
        ))}
      </div>
      {Array(10)
        .fill(null)
        .map((item, index) => (
          <div
            key={`${animation}-${index}`}
            data-aos={animation}
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
