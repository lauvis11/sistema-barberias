import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import { siteConfig } from "@/config/site.config";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export function Hero() {
  return (
    <section className="relative flex min-h-svh w-full items-center overflow-hidden bg-[#0E0B09] text-[#F5F0E6]">
      {/* Imagen de fondo */}
      <Image
        src="/imagen-barberia-hero.jpg"
        alt={siteConfig.name}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[70%_center] sm:object-center"
      />

      {/* Oscurecimiento más intenso a la izquierda y más suave a la derecha */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-linear-to-r from-[#0E0B09]/85 via-[#0E0B09]/60 via-50% to-[#0E0B09]/35"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-44 bg-linear-to-b from-[#0E0B09]/85 via-[#0E0B09]/45 to-transparent"
      />

      {/* Contenido principal */}
      <div className="relative mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 lg:px-12">
        <div className="max-w-lg lg:max-w-xl">
          <h1
            style={{ animationDelay: "0ms" }}
            className={`${cormorant.className} hero-stagger text-5xl leading-[1.02] font-semibold tracking-[-0.015em] text-[#F7F3EB] drop-shadow-[0_4px_16px_rgba(0,0,0,0.65)] sm:text-6xl lg:text-[4.25rem]`}
          >
            {siteConfig.tagline}
          </h1>

          <p
            style={{ animationDelay: "140ms" }}
            className="hero-stagger mt-5 max-w-[44ch] text-base leading-relaxed text-[#DFD7CC] drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] sm:text-lg"
          >
            {siteConfig.description} Elegí tu barbero, consultá disponibilidad en vivo y asegurá tu lugar sin esperas.
          </p>

          <div
            style={{ animationDelay: "280ms" }}
            className="hero-stagger mt-8 flex flex-col gap-3.5 sm:flex-row sm:items-center"
          >
            <button
              type="button"
              className="inline-flex h-12 items-center justify-center gap-2.5 rounded-xl border border-transparent bg-[#C89D54] ps-6 pe-5.5 text-base font-semibold text-[#14110F] shadow-[0_0_0_1px_oklch(1_0_0/0.2),0_8px_20px_oklch(0_0_0/0.5)] transition-[scale,background-color,box-shadow] duration-250 ease-out [-webkit-tap-highlight-color:transparent] hover:bg-[#D4AB63] motion-safe:enabled:active:scale-[0.96]"
            >
              <span>Reservar mi turno</span>
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 shrink-0"
              >
                <rect
                  x="2"
                  y="3"
                  width="12"
                  height="11"
                  rx="2"
                  vectorEffect="non-scaling-stroke"
                />
                <path
                  d="M5 1.5v2.5M11 1.5v2.5M2 6.5h12"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </button>

            <button
              type="button"
              className="inline-flex h-12 items-center justify-center rounded-xl border border-transparent bg-[#14110F]/75 px-5 text-base font-medium text-[#F5F0E6] shadow-[0_0_0_1px_oklch(1_0_0/0.16)] backdrop-blur-sm transition-[scale,background-color,box-shadow] duration-250 ease-out [-webkit-tap-highlight-color:transparent] hover:bg-[#14110F]/90 hover:shadow-[0_0_0_1px_oklch(1_0_0/0.26)] motion-safe:enabled:active:scale-[0.96]"
            >
              Carta de servicios
            </button>
          </div>
        </div>
      </div>

      {/* Indicador de deslizar hacia abajo */}
      <a
        href="#contenido"
        aria-label="Deslizar hacia abajo"
        style={{ animationDelay: "420ms" }}
        className="scroll-indicator-enter absolute bottom-12 left-1/2 flex h-14 w-14 -translate-x-1/2 items-center justify-center overflow-hidden rounded-full border border-transparent bg-transparent text-[#F5F0E6] shadow-[0_0_0_2px_oklch(1_0_0/0.45)] transition-[scale,box-shadow,color] duration-250 ease-out [-webkit-tap-highlight-color:transparent] hover:text-[#C89D54] hover:shadow-[0_0_0_2px_oklch(1_0_0/0.75)] active:scale-[0.96] sm:bottom-14"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <path
            d="M12 5v14M6.5 13.5 12 19l5.5-5.5"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </a>
    </section>
  );
}
