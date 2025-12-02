import { JSX, useEffect } from "react";

export function SmokeCursor(): JSX.Element {
  useEffect(() => {
    function createSmokeTrail(x: number, y: number): void {
      const smoke = document.createElement("div");
      smoke.style.position = "fixed";
      smoke.style.left = x + "px";
      smoke.style.top = y + "px";
      smoke.style.width = "40px";
      smoke.style.height = "40px";
      smoke.style.borderRadius = "50%";
      smoke.style.background = `radial-gradient(circle, rgba(255,0,150,0.5) 0%, transparent 80%)`;
      smoke.style.filter = "blur(10px)";
      smoke.style.pointerEvents = "none";
      smoke.style.zIndex = "9999";
      smoke.style.animation = "fadeOut 2s forwards";
      document.body.appendChild(smoke);

      setTimeout(() => {
        smoke.remove();
      }, 2000);
    }

    function onMouseMove(e: MouseEvent): void {
      createSmokeTrail(e.pageX, e.pageY);
    }

    globalThis.addEventListener("mousemove", onMouseMove);
    return () => globalThis.removeEventListener("mousemove", onMouseMove);
  }, []);

  return (
    <style>{`
        @keyframes fadeOut {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(2); }
        }
      `}</style>
  );
}
