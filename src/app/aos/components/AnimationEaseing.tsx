import { useEffect, useState } from "react";

import type { Easing } from "@/features/aos";

import cn from "@/utils/cn";
import { eases } from "./config";

const easingCategories = Array.from(new Set(eases.map((e) => e.split(".")[0])));

type EaseType = "default" | "in" | "out" | "inOut";

const easeVariants: EaseType[] = ["default", "in", "out", "inOut"];
const easeVariantMap: Record<EaseType, string> = {
  default: "",
  in: "in",
  out: "out",
  inOut: "inOut",
};

export default function AnimationEasingSelector({
  onChangeEaseing,
}: {
  onChangeEaseing: React.Dispatch<React.SetStateAction<Easing>>;
}) {
  const [selectedCategory, setSelectedCategory] = useState(eases[0]);
  const [selectedVariant, setSelectedVariant] = useState(easeVariants[0]);

  useEffect(() => {
    onChangeEaseing(
      `${selectedCategory}${selectedVariant === "default" ? "" : "."}${easeVariantMap[selectedVariant] || ""}`,
    );
  }, [onChangeEaseing, selectedCategory, selectedVariant]);

  return (
    <div className="card card-border card-sm">
      <div className="card-body">
        <div className="flex flex-wrap gap-2">
          {easingCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => {
                setSelectedCategory(category);
                setSelectedVariant(easeVariants[0]);
              }}
              className={cn("btn", {
                "btn-primary": category === selectedCategory,
              })}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="divider my-0" />
        <div className="flex flex-wrap gap-2">
          {selectedCategory !== "none"
            ? easeVariants.map((variant) => (
                <button
                  key={variant}
                  type="button"
                  onClick={() => setSelectedVariant(variant)}
                  className={cn("btn", {
                    "btn-primary": variant === selectedVariant,
                  })}
                >
                  {variant}
                </button>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
