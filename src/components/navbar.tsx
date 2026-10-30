"use client";

import { useEffect, useState } from "react";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const navItems = [
  { id: "inicio", label: "Inicio", href: "#" },
  { id: "servicios", label: "Servicios", href: "#servicios" },
  { id: "galeria", label: "Galería", href: "#galeria" },
  { id: "turnos", label: "Turnos", href: "#turnos" },
  { id: "productos", label: "Productos", href: "#productos" },
  { id: "contacto", label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const [conScroll, setConScroll] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [seccionActiva, setSeccionActiva] = useState("inicio");

  useEffect(() => {
    const actualizarEstadoScroll = () => {
      const scrollY = window.scrollY;
      setConScroll(scrollY > 0);

      const puntoReferencia = window.innerHeight * 0.38;
      let actual = "inicio";

      for (const item of navItems) {
        if (item.id === "inicio") continue;
        const elemento = document.getElementById(item.id);
        if (!elemento) continue;

        const rect = elemento.getBoundingClientRect();
        if (rect.top <= puntoReferencia && rect.bottom > 120) {
          actual = item.id;
        }
      }

      setSeccionActiva(actual);
    };

    actualizarEstadoScroll();
    window.addEventListener("scroll", actualizarEstadoScroll, {
      passive: true,
    });
    window.addEventListener("resize", actualizarEstadoScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", actualizarEstadoScroll);
      window.removeEventListener("resize", actualizarEstadoScroll);
    };
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-out ${
        conScroll || menuAbierto ? "bg-[#120F0D]" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Navegación principal"
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-[height] duration-300 ease-out sm:px-10 lg:px-12 ${
          conScroll ? "h-18 sm:h-20" : "h-20 sm:h-24"
        }`}
      >
        {/* Marca */}
        <a
          href="#"
          className={`${cormorant.className} text-2xl leading-none font-semibold tracking-tight text-white sm:text-3xl`}
        >
          Sistema Barberias
        </a>

        {/* Enlaces centrales en escritorio */}
        <ul className="hidden items-center gap-8 md:flex lg:gap-10">
          {navItems.map((item) => {
            const esActivo = seccionActiva === item.id;

            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  aria-current={esActivo ? "page" : undefined}
                  onClick={() => setSeccionActiva(item.id)}
                  className={`group relative inline-block py-1.5 text-base font-medium transition-[color,transform] duration-300 ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C89D54] ${
                    esActivo
                      ? "-translate-y-0.5 text-[#C89D54]"
                      : "text-white hover:text-white"
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute bottom-0 left-0 h-0.5 bg-[#C89D54] transition-[width,opacity] duration-300 ease-out ${
                      esActivo
                        ? "w-full opacity-100"
                        : "w-0 opacity-80 group-hover:w-full"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* Acción principal "Haz tu reserva" + control móvil */}
        <div className="flex items-center gap-4">
          <a
            href="#turnos"
            className="inline-flex h-11 items-center justify-center gap-2.5 rounded-lg bg-[#C89D54] px-5 font-sans text-base font-semibold text-[#120F0D] transition-[background-color,transform] duration-250 ease-out [-webkit-tap-highlight-color:transparent] hover:bg-[#D4AB63] active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C89D54]"
          >
            <span>Haz tu reserva</span>
            <svg
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.85"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4 shrink-0 text-[#120F0D]"
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
          </a>

          <button
            type="button"
            aria-expanded={menuAbierto}
            aria-controls="menu-movil-principal"
            onClick={() => setMenuAbierto((prev) => !prev)}
            className="inline-flex items-center justify-center px-2 py-2 text-base font-medium text-white md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C89D54]"
          >
            {menuAbierto ? "Cerrar" : "Menú"}
          </button>
        </div>
      </nav>

      {/* Panel móvil plano (sin bordes ni sombras, siguiendo design-taste-frontend) */}
      {menuAbierto && (
        <div
          id="menu-movil-principal"
          className="bg-[#120F0D] px-6 pt-2 pb-8 sm:px-10 md:hidden"
        >
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => {
              const esActivo = seccionActiva === item.id;

              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={esActivo ? "page" : undefined}
                    onClick={() => {
                      setSeccionActiva(item.id);
                      setMenuAbierto(false);
                    }}
                    className={`${cormorant.className} inline-block py-1 text-2xl font-semibold transition-colors duration-200 ${
                      esActivo
                        ? "text-[#C89D54]"
                        : "text-white hover:text-[#C89D54]"
                    }`}
                  >
                    <span>{item.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
