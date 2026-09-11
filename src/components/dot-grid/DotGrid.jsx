import { useEffect, useRef } from "react";
import "./DotGrid.css";

export default function DotGrid() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    let pointer = null;
    let frameId;
    let isScheduled = false;
    let width = 0;
    let height = 0;

    function draw() {
      isScheduled = false;
      context.clearRect(0, 0, width, height);
      context.fillStyle = getComputedStyle(document.documentElement)
        .getPropertyValue("--fg")
        .trim();
      context.globalAlpha = 0.2;

      const gridSize = 24;
      const influenceRadius = 160;
      const warpStrength = 12;

      for (let y = 0; y <= height; y += gridSize) {
        for (let x = 0; x <= width; x += gridSize) {
          let dotX = x;
          let dotY = y;

          if (pointer) {
            const deltaX = x - pointer.x;
            const deltaY = y - pointer.y;
            const distance = Math.hypot(deltaX, deltaY);
            const influence = Math.max(0, 1 - distance / influenceRadius) ** 2;

            if (influence && distance) {
              dotX += (deltaX / distance) * influence * warpStrength;
              dotY += (deltaY / distance) * influence * warpStrength;
            }
          }

          context.beginPath();
          context.arc(dotX, dotY, 1, 0, Math.PI * 2);
          context.fill();
        }
      }
    }

    function scheduleDraw() {
      if (!isScheduled) {
        isScheduled = true;
        frameId = window.requestAnimationFrame(draw);
      }
    }

    function resize() {
      const pixelRatio = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * pixelRatio);
      canvas.height = Math.round(height * pixelRatio);
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      scheduleDraw();
    }

    function handlePointerMove(event) {
      if (event.pointerType === "touch") {
        return;
      }

      pointer = { x: event.clientX, y: event.clientY };
      scheduleDraw();
    }

    function clearPointer() {
      pointer = null;
      scheduleDraw();
    }

    const themeObserver = new MutationObserver(scheduleDraw);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("resize", resize);
    window.addEventListener("blur", clearPointer);
    document.addEventListener("pointerleave", clearPointer);
    resize();

    return () => {
      window.cancelAnimationFrame(frameId);
      themeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", resize);
      window.removeEventListener("blur", clearPointer);
      document.removeEventListener("pointerleave", clearPointer);
    };
  }, []);

  return <canvas ref={canvasRef} className="dot-grid" aria-hidden="true" />;
}
