import Image from "next/image";
import { Oswald } from "next/font/google";
import { siteConfig } from "@/config/site.config";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});

function IconoRedSocial({ red }: { red: string }) {
  if (red === "facebook") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-6 w-6"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  }

  if (red === "tiktok") {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        className="h-6 w-6"
      >
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.3 0 .58.05.85.13V11.4a6.34 6.34 0 0 0-.85-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.2 8.2 0 0 0 4.77 1.52v-3.4a4.84 4.84 0 0 1-1-.14Z" />
      </svg>
    );
  }

  // instagram (defecto)
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-6 w-6"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="relative flex min-h-dvh w-full items-center overflow-hidden bg-black text-[#F5F0E6]">
      {/* Fondo: imagen nueva de public alineada a la derecha, decorativa, con prioridad de carga */}
      {siteConfig.hero.image && (
        <Image
          src={siteConfig.hero.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right md:object-[82%_center]"
        />
      )}

      {/* Sombra de fondo muy sutil para dar profundidad y contraste sin oscurecer al sujeto */}
      {/* 1. En celular: oscurecimiento muy leve */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-black/40 md:hidden"
      />

      {/* 2. En escritorio: degradado muy suave de izquierda a derecha */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 hidden bg-linear-to-r from-black/60 via-black/20 via-45% to-transparent md:block"
      />

      {/* 3. Sombra superior muy tenue bajo el navbar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-black/35 to-transparent"
      />

      {/* Contenido principal alineado a la izquierda y centrado verticalmente */}
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-28 sm:px-10 lg:px-12">
        <div className="max-w-lg lg:max-w-xl">
          {/* 1. Etiqueta superior en mayúsculas, texto chico, espaciado entre letras, en gris claro */}
          <p
            style={{ animationDelay: "0ms" }}
            className="hero-stagger font-sans text-xs font-semibold tracking-[0.22em] text-neutral-400 uppercase sm:text-sm"
          >
            {siteConfig.hero.badge}
          </p>

          {/* 2. Título h1 en dos líneas, mayúsculas, tipografía condensada, escalable desde 48px hasta 96px */}
          <h1
            style={{ animationDelay: "100ms" }}
            className={`${oswald.className} hero-stagger mt-3 text-[48px] leading-[0.92] font-bold tracking-tight text-white uppercase sm:text-7xl md:text-8xl lg:text-[96px]`}
          >
            <span className="block">{siteConfig.hero.titleLine1}</span>
            <span className="block">{siteConfig.hero.titleLine2}</span>
          </h1>

          {/* 3. Descripción en gris claro, tamaño normal, ancho limitado */}
          <p
            style={{ animationDelay: "200ms" }}
            className="hero-stagger mt-5 max-w-[44ch] text-base leading-relaxed text-neutral-300 sm:text-lg"
          >
            {siteConfig.hero.description}
          </p>

          {/* 4. Botón principal con borde marrón fino sin relleno, en hover se rellena de marrón con texto negro */}
          <div
            style={{ animationDelay: "300ms" }}
            className="hero-stagger mt-8"
          >
            <a
              href={siteConfig.hero.cta.href}
              className="group inline-flex items-center gap-3.5 rounded border border-marron bg-transparent px-7 py-3.5 font-sans text-xs font-semibold tracking-widest text-marron uppercase transition-colors duration-250 active:scale-[0.98] hover:bg-marron hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marron sm:text-sm"
            >
              <span>{siteConfig.hero.cta.label}</span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className="h-4 w-4 shrink-0 transition-transform duration-250 ease-out group-hover:translate-x-1.5"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          {/* 5. Fila de íconos de redes sociales desplazada más abajo con escalonamiento individual */}
          <div className="mt-14 sm:mt-16 flex items-center gap-6">
            {siteConfig.social.map((item, idx) => (
              <a
                key={item.red}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                style={{ animationDelay: `${400 + idx * 75}ms` }}
                className="hero-stagger text-white/80 transition-colors duration-200 hover:text-marron focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marron"
              >
                <IconoRedSocial red={item.red} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
