"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { siteConfig } from "@/config/site.config";

export function Galeria() {
  const { fotos } = siteConfig.galeria;
  const [indiceActivo, setIndiceActivo] = useState<number | null>(null);
  const [direccion, setDireccion] = useState<"adelante" | "atras" | null>(null);
  const [estaCerrando, setEstaCerrando] = useState(false);

  const totalImagenes = 9;
  const fotosGaleria = fotos.slice(0, totalImagenes);

  const abrirModal = (index: number) => {
    setEstaCerrando(false);
    setDireccion(null);
    setIndiceActivo(index);
  };

  const siguienteFoto = useCallback(() => {
    if (indiceActivo === null || estaCerrando) return;
    setDireccion("adelante");
    setIndiceActivo((prev) => ((prev ?? 0) + 1) % totalImagenes);
  }, [indiceActivo, estaCerrando, totalImagenes]);

  const anteriorFoto = useCallback(() => {
    if (indiceActivo === null || estaCerrando) return;
    setDireccion("atras");
    setIndiceActivo((prev) => ((prev ?? 0) - 1 + totalImagenes) % totalImagenes);
  }, [indiceActivo, estaCerrando, totalImagenes]);

  const cerrarModal = useCallback(() => {
    if (estaCerrando) return;
    setEstaCerrando(true);
    setTimeout(() => {
      setIndiceActivo(null);
      setEstaCerrando(false);
      setDireccion(null);
    }, 200);
  }, [estaCerrando]);

  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const manejarTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const manejarTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) anteriorFoto();
      else siguienteFoto();
    }
    setTouchStartX(null);
  };

  // Manejo de teclado (Esc, Flechas) y bloqueo de scroll al abrir el visor
  useEffect(() => {
    if (indiceActivo === null) return;

    const manejarTeclado = (e: KeyboardEvent) => {
      if (e.key === "Escape") cerrarModal();
      if (e.key === "ArrowRight") siguienteFoto();
      if (e.key === "ArrowLeft") anteriorFoto();
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", manejarTeclado);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", manejarTeclado);
    };
  }, [indiceActivo, cerrarModal, siguienteFoto, anteriorFoto]);

  const fotoActual = indiceActivo !== null ? fotosGaleria[indiceActivo] : null;

  return (
    <section
      id="galeria"
      className="relative flex w-full flex-col bg-[#0A0A0A] px-4 pt-6 pb-10 text-[#F5F0E6] sm:px-8 sm:pt-8 sm:pb-12 lg:h-dvh lg:max-h-dvh lg:overflow-hidden lg:px-12 lg:py-0 scroll-mt-16"
    >
      {/* Efecto de niebla cálida marrón que se desvanece desde el top hacia abajo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 sm:h-96 md:h-110 overflow-hidden"
      >
        {/* Capa de bruma difusa ambiental */}
        <div className="absolute inset-x-0 top-0 h-48 sm:h-64 bg-[linear-gradient(180deg,rgba(200,157,84,0.18)_0%,rgba(200,157,84,0.06)_60%,transparent_100%)] blur-2xl sm:blur-3xl" />
        {/* Manto de niebla lineal continuo desvaneciéndose hacia abajo */}
        <div className="absolute inset-x-0 top-0 h-full bg-[linear-gradient(180deg,rgba(200,157,84,0.16)_0%,rgba(200,157,84,0.08)_35%,rgba(200,157,84,0.02)_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 mx-auto flex h-full w-full max-w-6xl xl:max-w-295 flex-col justify-center lg:justify-start lg:pt-14 xl:pt-16">
        {/* 1. Título a la izquierda en formato natural */}
        <div className="mb-6 shrink-0 text-left sm:mb-8 lg:mb-10 xl:mb-12">
          <h2 className="font-condensed text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Algunos de nuestros trabajos
          </h2>
        </div>

        {/* 2. Cuadrícula dividida en 2 mitades con el mismo espaciado en todas las líneas */}
        <div className="grid w-full flex-1 min-h-0 grid-cols-1 gap-2 sm:gap-2.5 lg:max-h-135 xl:max-h-145 lg:grid-cols-2 items-stretch">
          {/* ================= COLUMNA IZQUIERDA (4 imágenes) ================= */}
          <div className="flex h-full min-h-0 flex-col gap-2 sm:gap-2.5">
            {/* Imagen 1: Primera imagen dejada como está (gran formato panorámico superior) */}
            <button
              type="button"
              onClick={() => abrirModal(0)}
              aria-label={`Ver trabajo 1: ${fotosGaleria[0].alt}`}
              className="group relative h-[38%] min-h-22.5 w-full cursor-pointer overflow-hidden rounded-lg bg-neutral-900 transition-transform duration-300 ease-out [-webkit-tap-highlight-color:transparent] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marron"
            >
              <Image
                src={fotosGaleria[0].src}
                alt={fotosGaleria[0].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center grayscale contrast-110 brightness-95 transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-105 will-change-transform"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-black/10 transition-colors duration-500 ease-out group-hover:bg-transparent"
              />
            </button>

            {/* Debajo: 2 imágenes una debajo de otra (subcolumna 1) + 1 rectángulo vertical al lado (subcolumna 2) */}
            <div className="grid h-[62%] min-h-35 grid-cols-2 gap-2 sm:gap-2.5 items-stretch">
              {/* Subcolumna 1: 2 imágenes apiladas verticalmente */}
              <div className="flex h-full min-h-0 flex-col gap-2 sm:gap-2.5">
                {/* Imagen 2 */}
                <button
                  type="button"
                  onClick={() => abrirModal(1)}
                  aria-label={`Ver trabajo 2: ${fotosGaleria[1].alt}`}
                  className="group relative h-1/2 min-h-0 w-full cursor-pointer overflow-hidden rounded-lg bg-neutral-900 transition-transform duration-300 ease-out [-webkit-tap-highlight-color:transparent] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marron"
                >
                  <Image
                    src={fotosGaleria[1].src}
                    alt={fotosGaleria[1].alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-[center_20%] grayscale contrast-110 brightness-95 transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-105 will-change-transform"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-black/10 transition-colors duration-500 ease-out group-hover:bg-transparent"
                  />
                </button>

                {/* Imagen 3 */}
                <button
                  type="button"
                  onClick={() => abrirModal(2)}
                  aria-label={`Ver trabajo 3: ${fotosGaleria[2].alt}`}
                  className="group relative h-1/2 min-h-0 w-full cursor-pointer overflow-hidden rounded-lg bg-neutral-900 transition-transform duration-300 ease-out [-webkit-tap-highlight-color:transparent] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marron"
                >
                  <Image
                    src={fotosGaleria[2].src}
                    alt={fotosGaleria[2].alt}
                    fill
                    sizes="(max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center grayscale contrast-110 brightness-95 transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-105 will-change-transform"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-black/10 transition-colors duration-500 ease-out group-hover:bg-transparent"
                  />
                </button>
              </div>

              {/* Subcolumna 2: Rectángulo 'parado' (más height y menos width, ocupa la altura completa de las 2 apiladas) */}
              <button
                type="button"
                onClick={() => abrirModal(3)}
                aria-label={`Ver trabajo 4: ${fotosGaleria[3].alt}`}
                className="group relative h-full min-h-0 w-full cursor-pointer overflow-hidden rounded-lg bg-neutral-900 transition-transform duration-300 ease-out [-webkit-tap-highlight-color:transparent] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marron"
              >
                <Image
                  src={fotosGaleria[3].src}
                  alt={fotosGaleria[3].alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-[center_35%] grayscale contrast-110 brightness-95 transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-105 will-change-transform"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-black/10 transition-colors duration-500 ease-out group-hover:bg-transparent"
                />
              </button>
            </div>
          </div>

          {/* ================= COLUMNA DERECHA (5 imágenes: 2 arriba, 1 ancha en el medio, 2 abajo) ================= */}
          <div className="flex h-full min-h-0 flex-col gap-2 sm:gap-2.5">
            {/* Nivel 1 (Arriba): 2 imágenes cuadradas */}
            <div className="grid h-[31%] min-h-17.5 grid-cols-2 gap-2 sm:gap-2.5">
              {/* Imagen 5 */}
              <button
                type="button"
                onClick={() => abrirModal(4)}
                aria-label={`Ver trabajo 5: ${fotosGaleria[4].alt}`}
                className="group relative h-full min-h-0 w-full cursor-pointer overflow-hidden rounded-lg bg-neutral-900 transition-transform duration-300 ease-out [-webkit-tap-highlight-color:transparent] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marron"
              >
                <Image
                  src={fotosGaleria[4].src}
                  alt={fotosGaleria[4].alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-[80%_center] grayscale contrast-110 brightness-95 transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-105 will-change-transform"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-black/10 transition-colors duration-500 ease-out group-hover:bg-transparent"
                />
              </button>

              {/* Imagen 6 */}
              <button
                type="button"
                onClick={() => abrirModal(5)}
                aria-label={`Ver trabajo 6: ${fotosGaleria[5].alt}`}
                className="group relative h-full min-h-0 w-full cursor-pointer overflow-hidden rounded-lg bg-neutral-900 transition-transform duration-300 ease-out [-webkit-tap-highlight-color:transparent] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marron"
              >
                <Image
                  src={fotosGaleria[5].src}
                  alt={fotosGaleria[5].alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-[center_25%] grayscale contrast-110 brightness-95 transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-105 will-change-transform"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-black/10 transition-colors duration-500 ease-out group-hover:bg-transparent"
                />
              </button>
            </div>

            {/* Nivel 2 (Medio): 1 imagen con más width en el medio */}
            <button
              type="button"
              onClick={() => abrirModal(6)}
              aria-label={`Ver trabajo 7: ${fotosGaleria[6].alt}`}
              className="group relative h-[38%] min-h-22.5 w-full cursor-pointer overflow-hidden rounded-lg bg-neutral-900 transition-transform duration-300 ease-out [-webkit-tap-highlight-color:transparent] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marron"
            >
              <Image
                src={fotosGaleria[6].src}
                alt={fotosGaleria[6].alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center grayscale contrast-110 brightness-95 transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-105 will-change-transform"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-black/10 transition-colors duration-500 ease-out group-hover:bg-transparent"
              />
            </button>

            {/* Nivel 3 (Abajo): 2 imágenes cuadradas */}
            <div className="grid h-[31%] min-h-17.5 grid-cols-2 gap-2 sm:gap-2.5">
              {/* Imagen 8 */}
              <button
                type="button"
                onClick={() => abrirModal(7)}
                aria-label={`Ver trabajo 8: ${fotosGaleria[7].alt}`}
                className="group relative h-full min-h-0 w-full cursor-pointer overflow-hidden rounded-lg bg-neutral-900 transition-transform duration-300 ease-out [-webkit-tap-highlight-color:transparent] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marron"
              >
                <Image
                  src={fotosGaleria[7].src}
                  alt={fotosGaleria[7].alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-[center_25%] grayscale contrast-110 brightness-95 transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-105 will-change-transform"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-black/10 transition-colors duration-500 ease-out group-hover:bg-transparent"
                />
              </button>

              {/* Imagen 9 */}
              <button
                type="button"
                onClick={() => abrirModal(8)}
                aria-label={`Ver trabajo 9: ${fotosGaleria[8].alt}`}
                className="group relative h-full min-h-0 w-full cursor-pointer overflow-hidden rounded-lg bg-neutral-900 transition-transform duration-300 ease-out [-webkit-tap-highlight-color:transparent] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marron"
              >
                <Image
                  src={fotosGaleria[8].src}
                  alt={fotosGaleria[8].alt}
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center grayscale contrast-110 brightness-95 transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0 group-hover:contrast-100 group-hover:brightness-105 will-change-transform"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-black/10 transition-colors duration-500 ease-out group-hover:bg-transparent"
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Modal Lightbox (Visualizador minimalista: únicamente imagen y botones anterior / siguiente) */}
      {fotoActual && indiceActivo !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Visualizador de imagen"
          onClick={cerrarModal}
          onTouchStart={manejarTouchStart}
          onTouchEnd={manejarTouchEnd}
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-3 sm:p-6 md:p-10 backdrop-blur-md overscroll-contain select-none cursor-zoom-out transition-opacity duration-200 ${
            estaCerrando ? "opacity-0 pointer-events-none" : "lightbox-backdrop-enter"
          }`}
        >
          {/* Botón Foto Anterior */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              anteriorFoto();
            }}
            aria-label="Foto anterior"
            className={`group absolute left-3 z-30 flex h-12 w-12 sm:left-6 sm:h-14 sm:w-14 md:left-8 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/80 backdrop-blur-md transition-all duration-200 ease-out hover:scale-105 hover:border-white/30 hover:bg-black/90 hover:text-white active:scale-95 focus-visible:outline-2 focus-visible:outline-marron cursor-pointer ${
              estaCerrando ? "opacity-0 scale-90" : "lightbox-btn-prev"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 sm:h-7 sm:w-7 transition-transform duration-200 ease-out group-hover:-translate-x-0.5"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Imagen principal con animación de apertura cinematográfica y transiciones direccionales */}
          <div
            onClick={(e) => e.stopPropagation()}
            className={`relative flex h-[82vh] w-[86vw] max-w-6xl items-center justify-center cursor-default transition-all duration-200 ease-out ${
              estaCerrando ? "scale-90 opacity-0" : ""
            }`}
          >
            <div
              key={`${indiceActivo}-${direccion ?? "initial"}`}
              className={`relative h-full w-full flex items-center justify-center ${
                direccion === null
                  ? "lightbox-open-animation"
                  : direccion === "adelante"
                    ? "lightbox-slide-right"
                    : "lightbox-slide-left"
              }`}
            >
              <Image
                src={fotoActual.src}
                alt={fotoActual.alt}
                fill
                priority
                sizes="(max-width: 1024px) 95vw, 1200px"
                className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)]"
              />
            </div>
          </div>

          {/* Botón Foto Siguiente */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              siguienteFoto();
            }}
            aria-label="Foto siguiente"
            className={`group absolute right-3 z-30 flex h-12 w-12 sm:right-6 sm:h-14 sm:w-14 md:right-8 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white/80 backdrop-blur-md transition-all duration-200 ease-out hover:scale-105 hover:border-white/30 hover:bg-black/90 hover:text-white active:scale-95 focus-visible:outline-2 focus-visible:outline-marron cursor-pointer ${
              estaCerrando ? "opacity-0 scale-90" : "lightbox-btn-next"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 sm:h-7 sm:w-7 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
