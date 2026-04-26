import { useEffect, useRef, useState } from "react";

type CursorState = {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
  active: boolean;
  visible: boolean;
  pressed: boolean;
  variant: "dot" | "merge" | "soft";
};

const defaultSize = 22;

export function useCustomCursor() {
  const frameRef = useRef<number | null>(null);
  const nextCursorRef = useRef<CursorState | null>(null);
  const activeElementRef = useRef<HTMLElement | null>(null);
  const activeRectRef = useRef<DOMRect | null>(null);
  const activeRadiusRef = useRef(999);
  const [cursor, setCursor] = useState<CursorState>({
    x: 0,
    y: 0,
    width: defaultSize,
    height: defaultSize,
    radius: 999,
    active: false,
    visible: false,
    pressed: false,
    variant: "dot",
  });

  useEffect(() => {
    const interactiveSelector = "a, button, [data-cursor]";
    const buttonLikeSelector = "button, .btn, .menu-btn, .nav-talk, .video-play, .contact-form button";
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

    if (!finePointer.matches) return;

    function clearActiveCache() {
      activeElementRef.current = null;
      activeRectRef.current = null;
      activeRadiusRef.current = 999;
    }

    function commitCursor(nextCursor: CursorState) {
      nextCursorRef.current = nextCursor;

      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        if (nextCursorRef.current) {
          setCursor(nextCursorRef.current);
        }
      });
    }

    function updateCursor(event: PointerEvent) {
      if (event.pointerType !== "mouse") return;

      const target = event.target instanceof Element ? event.target : null;
      const interactive = target?.closest(interactiveSelector) as HTMLElement | null;

      if (interactive) {
        const mode = interactive.dataset.cursor === "soft" || !interactive.matches(buttonLikeSelector) ? "soft" : "merge";
        if (mode === "soft") {
          clearActiveCache();
        }

        if (mode === "soft") {
          commitCursor({
            x: event.clientX,
            y: event.clientY,
            width: 46,
            height: 46,
            radius: 999,
            active: true,
            visible: true,
            pressed: event.buttons > 0,
            variant: "soft",
          });
          return;
        }

        if (activeElementRef.current !== interactive || !activeRectRef.current) {
          activeElementRef.current = interactive;
          activeRectRef.current = interactive.getBoundingClientRect();
          activeRadiusRef.current = Number.parseFloat(getComputedStyle(interactive).borderRadius) || 999;
        }

        const rect = activeRectRef.current;
        commitCursor({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: rect.width + 10,
          height: rect.height + 10,
          radius: activeRadiusRef.current,
          active: true,
          visible: true,
          pressed: event.buttons > 0,
          variant: "merge",
        });
        return;
      }

      clearActiveCache();
      commitCursor({
        x: event.clientX,
        y: event.clientY,
        width: defaultSize,
        height: defaultSize,
        radius: 999,
        active: false,
        visible: true,
        pressed: event.buttons > 0,
        variant: "dot",
      });
    }

    function hideCursor() {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
      nextCursorRef.current = null;
      clearActiveCache();
      setCursor((current) => ({ ...current, visible: false }));
    }

    function setPressed(pressed: boolean) {
      setCursor((current) => ({ ...current, pressed }));
    }

    const handlePointerDown = () => setPressed(true);
    const handlePointerUp = () => setPressed(false);

    window.addEventListener("pointermove", updateCursor, { passive: true });
    window.addEventListener("pointerleave", hideCursor);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("scroll", clearActiveCache, { passive: true });
    window.addEventListener("resize", clearActiveCache);

    return () => {
      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.removeEventListener("pointermove", updateCursor);
      window.removeEventListener("pointerleave", hideCursor);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("scroll", clearActiveCache);
      window.removeEventListener("resize", clearActiveCache);
    };
  }, []);

  return cursor;
}
