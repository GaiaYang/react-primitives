export function translate3d(
  x: number | string,
  y: number | string,
  z: number | string,
): Pick<gsap.TweenVars, "x" | "y" | "z"> {
  return { x, y, z };
}

export function rotateY(y: number | string): Pick<gsap.TweenVars, "rotateY"> {
  return { rotateY: y };
}

export function rotateX(x: number | string): Pick<gsap.TweenVars, "rotateX"> {
  return { rotateX: x };
}

export function scale(
  x: number,
  y?: number,
): Pick<gsap.TweenVars, "scale" | "scaleX" | "scaleY"> {
  if (typeof y === "number") {
    return {
      scaleX: x,
      scaleY: y,
    };
  }
  return {
    scale: x,
  };
}

export function perspective(value: number): gsap.TweenVars {
  return {
    perspective: value,
  };
}
