"use client";

import { useState } from "react";

import cn from "@/utils/cn";

import { useAOSInitial } from "@/features/aos";
import { animations, eases, bgColors } from "./config";
import AnimationCategory from "./AnimationCategory";
import AnimationEaseing from "./AnimationEaseing";

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
  const [type, setAnimation] = useState(options[0].value);

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
              setAnimation(item.value);
            }}
            className={cn("tab", { "tab-active": type === item.value })}
          >
            {item.label}
          </button>
        ))}
      </div>
      {renderAOS(type)}
      <div className="bg-primary fixed bottom-30 left-0 h-px w-20">
        <span className="text-primary absolute font-semibold">{`當前觸發點`}</span>
      </div>
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
  const [easeing, setEaseing] = useState(eases[0]);

  return (
    <div className="grid w-full gap-4">
      <AnimationEaseing onChangeEaseing={setEaseing} />
      {animations.map((item, index) => (
        <div data-aos-container key={[item, easeing].join("-")}>
          <div
            data-aos={item}
            data-aos-easing={easeing}
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
  const [easeing, setEaseing] = useState(eases[0]);

  return (
    <div className="grid w-full gap-4">
      <AnimationEaseing onChangeEaseing={setEaseing} />
      <AnimationCategory onChangeAnimation={setAnimation} />
      {Array(10)
        .fill(null)
        .map((_, index) => (
          <div data-aos-container key={[animation, easeing, index].join("-")}>
            <div
              data-aos={animation}
              data-aos-easing={easeing}
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
                {animation}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
}
