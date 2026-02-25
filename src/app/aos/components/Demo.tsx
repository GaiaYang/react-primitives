"use client";

import { useRef, useState } from "react";

import { type Animation } from "@/features/aos";
import cn from "@/utils/cn";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import initScrollAnimations from "@/features/aos/core/initScrollAnimations";

gsap.registerPlugin(useGSAP);

const animations: Animation[] = [
  "fade",
  "fade-up",
  "fade-down",
  "fade-left",
  "fade-right",
  "fade-up-right",
  "fade-up-left",
  "fade-down-right",
  "fade-down-left",
  "flip-up",
  "flip-down",
  "flip-left",
  "flip-right",
  "slide-up",
  "slide-down",
  "slide-left",
  "slide-right",
  "zoom-in",
  "zoom-in-up",
  "zoom-in-down",
  "zoom-in-left",
  "zoom-in-right",
  "zoom-out",
  "zoom-out-up",
  "zoom-out-down",
  "zoom-out-left",
  "zoom-out-right",
];

export default function Demo() {
  const [show, setShow] = useState(true);
  const [animation, setAnimation] = useState<Animation>("fade");
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
      {false && (
        <div className="flex flex-wrap gap-2">
          {animations.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setAnimation(item);
              }}
              className={cn("btn", { "btn-primary": animation === item })}
            >
              {item}
            </button>
          ))}
        </div>
      )}
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
    </div>
  );
}

const bgColors: string[] = [
  "bg-red-50",
  "bg-red-100",
  "bg-red-200",
  "bg-red-300",
  "bg-red-400",
  "bg-red-500",
  "bg-red-600",
  "bg-red-700",
  "bg-red-800",
  "bg-red-900",
  "bg-red-950",
  "bg-orange-50",
  "bg-orange-100",
  "bg-orange-200",
  "bg-orange-300",
  "bg-orange-400",
  "bg-orange-500",
  "bg-orange-600",
  "bg-orange-700",
  "bg-orange-800",
  "bg-orange-900",
  "bg-orange-950",
  "bg-amber-50",
  "bg-amber-100",
  "bg-amber-200",
  "bg-amber-300",
  "bg-amber-400",
  "bg-amber-500",
  "bg-amber-600",
  "bg-amber-700",
  "bg-amber-800",
  "bg-amber-900",
  "bg-amber-950",
];
