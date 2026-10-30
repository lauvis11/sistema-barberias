"use client";

import { useEffect, useRef } from "react";

// Curva ease-in-out (arranque y frenado suaves), equivalente a --ease-in-out de globals.css
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Intercepta los enlaces internos (href="#...") y desplaza la página con una animación propia.
// Con "reducir movimiento" activado (Windows: Efectos de animación desactivados) no hay recorrido:
// un velo oscurece la pantalla, la página salta a la sección y el velo se desvanece.
export function ScrollSuave() {
  const veloRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let frame = 0;
    let fundido: Animation | null = null;

    const cancelar = () => cancelAnimationFrame(frame);

    const saltarA = (destino: number) => {
      window.scrollTo({ top: destino, behavior: "instant" });
    };

    const fundirHasta = async (destino: number) => {
      const velo = veloRef.current;
      if (!velo) return saltarA(destino);

      fundido?.cancel();
      fundido = velo.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 150,
        easing: "ease-out",
        fill: "forwards",
      });

      try {
        await fundido.finished;
      } catch {
        return; // se canceló por otro click
      }

      saltarA(destino);
      fundido = velo.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 200,
        easing: "ease-out",
        fill: "forwards",
      });
    };

    const animarHasta = (destino: number) => {
      cancelar();
      const inicio = window.scrollY;
      const distancia = destino - inicio;
      if (Math.abs(distancia) < 2) return;

      // Duración según la distancia: entre 700ms y 1200ms
      const duracion = Math.min(1200, Math.max(700, Math.abs(distancia) * 0.6));
      const t0 = performance.now();

      const paso = (ahora: number) => {
        const progreso = Math.min(1, (ahora - t0) / duracion);
        saltarA(inicio + distancia * easeInOutCubic(progreso));
        if (progreso < 1) frame = requestAnimationFrame(paso);
      };

      frame = requestAnimationFrame(paso);
    };

    const alHacerClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey) return;

      const enlace = (e.target as Element).closest<HTMLAnchorElement>('a[href^="#"]');
      if (!enlace) return;

      const href = enlace.getAttribute("href") ?? "#";
      const destino = href === "#" ? null : document.querySelector<HTMLElement>(href);
      if (href !== "#" && !destino) return;

      e.preventDefault();
      // Respeta el scroll-margin-top de la sección (alto del nav fijo) para que no la tape
      const margen = destino ? parseFloat(getComputedStyle(destino).scrollMarginTop) || 0 : 0;
      const top = destino ? destino.getBoundingClientRect().top + window.scrollY - margen : 0;
      history.replaceState(null, "", href === "#" ? window.location.pathname : href);

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        fundirHasta(top);
      } else {
        animarHasta(top);
      }
    };

    // Si el usuario usa la rueda o el dedo, se corta la animación (interrumpible)
    window.addEventListener("wheel", cancelar, { passive: true });
    window.addEventListener("touchstart", cancelar, { passive: true });
    document.addEventListener("click", alHacerClick);

    return () => {
      cancelar();
      fundido?.cancel();
      window.removeEventListener("wheel", cancelar);
      window.removeEventListener("touchstart", cancelar);
      document.removeEventListener("click", alHacerClick);
    };
  }, []);

  // Velo para el fundido con movimiento reducido (no bloquea clicks)
  return (
    <div
      ref={veloRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-60 bg-[#120F0D] opacity-0"
    />
  );
}
