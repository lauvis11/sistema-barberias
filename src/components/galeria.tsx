"use client";

import Image from "next/image";
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { siteConfig } from "@/config/site.config";

// Patrón de rotaciones alternadas pronunciadas fiel a la plantilla de Figma (-9.8° / +6° / -9.9°)
const ROTACIONES_DESKTOP = [-9.5, 7.5, -9.0, 8.0, -9.2, 7.8, -8.8, 7.5];
const ROTACIONES_TABLET = [-6.5, 6.0, -6.5, 6.0, -6.5, 6.0, -6.5, 6.0];
const ROTACIONES_MOBILE = [-4.5, 4.5, -4.5, 4.5, -4.5, 4.5, -4.5, 4.5];

export function Galeria() {
  const { fotos, titulo } = siteConfig.galeria;
  const seccionRef = useRef<HTMLElement | null>(null);
  const [seccionVisible, setSeccionVisible] = useState(false);
  const [indiceSlide, setIndiceSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  // Observer de intersección para animación simple de aparición al hacer scroll a la sección
  useEffect(() => {
    const nodo = seccionRef.current;
    if (!nodo) return;

    if (typeof IntersectionObserver === "undefined") {
      setSeccionVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeccionVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(nodo);
    return () => observer.disconnect();
  }, []);

  // Detección de breakpoint para ajustar tarjetas visibles
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 640);
      setIsTablet(width >= 640 && width < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Tarjetas visibles por slide: 4 en Desktop, 2 en Tablet, 1 en Móvil
  const tarjetasVisibles = useMemo(() => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 4;
  }, [isMobile, isTablet]);

  // Número máximo de posiciones de slide
  const maxIndice = useMemo(() => {
    return Math.max(0, fotos.length - tarjetasVisibles);
  }, [fotos.length, tarjetasVisibles]);

  // Navegación del carrusel
  const irAnterior = useCallback(() => {
    setIndiceSlide((prev) => (prev > 0 ? prev - 1 : maxIndice));
  }, [maxIndice]);

  const irSiguiente = useCallback(() => {
    setIndiceSlide((prev) => (prev < maxIndice ? prev + 1 : 0));
  }, [maxIndice]);

  // Soporte de gestos táctiles (Swipe)
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        irAnterior();
      } else {
        irSiguiente();
      }
    }
    setTouchStartX(null);
  };

  // Soporte de navegación por teclado (flechas izquierda/derecha)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") irSiguiente();
      if (e.key === "ArrowLeft") irAnterior();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [irSiguiente, irAnterior]);

  return (
    <section
      ref={seccionRef}
      id="galeria"
      className="relative flex min-h-svh lg:h-dvh w-full flex-col justify-center items-center overflow-x-clip overflow-y-visible bg-[#0A0A0A] text-[#F5F0E6] scroll-mt-18 sm:scroll-mt-20 py-8 lg:py-0 select-none"
    >
      {/* 1. Fondo atmosférico de barbería extraído de Figma (our-works-bg.png) con iluminación clara y sin sombras excesivas */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
      >
        <Image
          src="/our-works-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-85 brightness-95"
        />
        {/* Fundido muy suave solo en los bordes para transición limpia con las secciones adyacentes */}
        <div className="absolute inset-0 bg-linear-to-b from-[#0A0A0A]/60 via-transparent to-[#0A0A0A]/65" />
      </div>

      {/* 2. Flecha Izquierda (tamaño sutil y reducido, pegada al borde izquierdo del DOM, centrada con las tarjetas) */}
      <button
        type="button"
        onClick={irAnterior}
        aria-label="Trabajo anterior"
        style={{ transitionDelay: "450ms" }}
        className={`absolute left-1 sm:left-1.5 md:left-2 lg:left-3 top-[calc(50%-0.5rem)] sm:top-[calc(50%-0.75rem)] lg:top-[calc(50%-1.5rem)] -translate-y-1/2 z-30 flex items-center justify-center p-1 sm:p-1.5 text-white/50 hover:text-white transition-colors duration-200 cursor-pointer [-webkit-tap-highlight-color:transparent] ${
          seccionVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 -translate-x-3 pointer-events-none"
        }`}
      >
        <svg
          className="w-4 h-7 sm:w-4.5 sm:h-8 lg:w-5 lg:h-9 stroke-current drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          viewBox="0 0 24 48"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="17 10 7 24 17 38" />
        </svg>
      </button>

      {/* 3. Flecha Derecha (tamaño sutil y reducido, pegada al borde derecho del DOM, centrada con las tarjetas) */}
      <button
        type="button"
        onClick={irSiguiente}
        aria-label="Siguiente trabajo"
        style={{ transitionDelay: "450ms" }}
        className={`absolute right-1 sm:right-1.5 md:right-2 lg:right-3 top-[calc(50%-0.5rem)] sm:top-[calc(50%-0.75rem)] lg:top-[calc(50%-1.5rem)] -translate-y-1/2 z-30 flex items-center justify-center p-1 sm:p-1.5 text-white/50 hover:text-white transition-colors duration-200 cursor-pointer [-webkit-tap-highlight-color:transparent] ${
          seccionVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-3 pointer-events-none"
        }`}
      >
        <svg
          className="w-4 h-7 sm:w-4.5 sm:h-8 lg:w-5 lg:h-9 stroke-current drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"
          viewBox="0 0 24 48"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="7 10 17 24 7 38" />
        </svg>
      </button>

      {/* 4. Contenido principal centrado (con todo el contenido elevado más arriba) */}
      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1640px] flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 -mt-10 sm:-mt-14 lg:-mt-24">
        {/* Título en tipografía condensada acorde al diseño global del sitio, dejando su posición intacta y ampliando la separación hacia abajo */}
        <div
          className={`mb-12 sm:mb-16 lg:mb-24 text-center shrink-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            seccionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <h2 className="font-condensed text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white uppercase drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
            {titulo || "NUESTROS TRABAJOS"}
          </h2>
        </div>

        {/* 5. Carrusel de 4 tarjetas sin límites verticales (evita cualquier recorte arriba y abajo) */}
        <div
          className="relative w-full overflow-visible"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Contenedor con clip únicamente horizontal y visible verticalmente */}
          <div className="w-full overflow-x-clip overflow-y-visible py-4 sm:py-6 lg:py-8 -my-4 sm:-my-6 lg:-my-8">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] will-change-transform"
              style={{
                transform: `translate3d(-${indiceSlide * (100 / tarjetasVisibles)}%, 0, 0)`,
              }}
            >
              {fotos.map((foto, index) => {
                // Cálculo de la rotación correspondiente
                const rotacion = isMobile
                  ? ROTACIONES_MOBILE[index % ROTACIONES_MOBILE.length]
                  : isTablet
                  ? ROTACIONES_TABLET[index % ROTACIONES_TABLET.length]
                  : ROTACIONES_DESKTOP[index % ROTACIONES_DESKTOP.length];

                return (
                  <div
                    key={foto.id || index}
                    className={`shrink-0 px-2 sm:px-2.5 lg:px-3 xl:px-3.5 py-6 sm:py-8 lg:py-10 flex justify-center items-center transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                      seccionVisible
                        ? "opacity-100 translate-y-0 scale-100"
                        : "opacity-0 translate-y-8 scale-[0.94]"
                    }`}
                    style={{
                      width: `${100 / tarjetasVisibles}%`,
                      transitionDelay: `${100 + (index % 4) * 80}ms`,
                    }}
                  >
                    {/* Tarjeta estática con rotación completa visible sin recortes arriba ni abajo */}
                    <div
                      className="relative w-full max-w-53.75 sm:max-w-60 lg:max-w-41.25 xl:max-w-52.5 2xl:max-w-61.25 aspect-9/13 overflow-hidden rounded-xs bg-neutral-900 shadow-[0_24px_50px_rgba(0,0,0,0.85)] ring-1 ring-white/10"
                      style={{
                        transform: `rotate(${rotacion}deg)`,
                      }}
                    >
                      <Image
                        src={foto.src}
                        alt={foto.alt}
                        fill
                        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 45vw, 350px"
                        className="object-cover object-center select-none"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
