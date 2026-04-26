import type { PointerEvent } from "react";

type TiltOptions = {
  max?: number;
  scale?: number;
};

export function useTilt({ max = 8, scale = 1.015 }: TiltOptions = {}) {
  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse") return;

    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const middleX = rect.width / 2;
    const middleY = rect.height / 2;
    const rotateY = ((x - middleX) / middleX) * max;
    const rotateX = -((y - middleY) / middleY) * max;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    element.style.setProperty("--tilt-rx", `${rotateX.toFixed(2)}deg`);
    element.style.setProperty("--tilt-ry", `${rotateY.toFixed(2)}deg`);
    element.style.setProperty("--tilt-scale", String(scale));
    element.style.setProperty("--glare-x", `${glareX.toFixed(2)}%`);
    element.style.setProperty("--glare-y", `${glareY.toFixed(2)}%`);
    element.style.setProperty("--glare-opacity", "1");
  }

  function handlePointerLeave(event: PointerEvent<HTMLElement>) {
    const element = event.currentTarget;
    element.style.setProperty("--tilt-rx", "0deg");
    element.style.setProperty("--tilt-ry", "0deg");
    element.style.setProperty("--tilt-scale", "1");
    element.style.setProperty("--glare-opacity", "0");
  }

  return {
    onPointerMove: handlePointerMove,
    onPointerLeave: handlePointerLeave,
  };
}
