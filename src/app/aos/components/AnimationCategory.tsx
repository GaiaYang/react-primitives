import { useState } from "react";

import type { AOSAnimation } from "@/features/aos";

import { animations } from "@/features/aos/constants";
import cn from "@/utils/cn";

const categories = Array.from(
  new Set(animations.map((item) => item.split("-")[0])),
);
export default function AnimationCategory({
  onChangeAnimation,
}: {
  onChangeAnimation: React.Dispatch<React.SetStateAction<AOSAnimation>>;
}) {
  const [animation, setAnimation] = useState(animations[0]);
  const [category, setCategory] = useState(categories[0]);

  return (
    <div className="card card-border card-sm">
      <div className="card-body">
        <div className="flex flex-wrap gap-2">
          {categories.map((item) => (
            <button
              key={item}
              onClick={() => {
                setCategory(item);
                const nextAnimation =
                  animations.find((i) => i.startsWith(item)) || animations[0];
                setAnimation(nextAnimation);
                onChangeAnimation(nextAnimation);
              }}
              className={cn("btn", {
                "btn-primary": category === item,
              })}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="divider my-0" />
        <div className="flex flex-wrap gap-2">
          {animations
            .filter((item) => item.startsWith(category))
            .map((item) => (
              <button
                key={item}
                onClick={() => {
                  setAnimation(item);
                  onChangeAnimation(item);
                }}
                className={cn("btn", { "btn-primary": animation === item })}
              >
                {item}
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
