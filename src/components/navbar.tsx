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

  useEffect(() => {
    document.body.style.overflow = menuAbierto ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuAbierto]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-out ${
        conScroll && !menuAbierto ? "bg-[#120F0D]" : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Navegación principal"
        className={`relative z-50 mx-auto flex max-w-6xl items-center justify-between px-6 transition-[height] duration-300 ease-out sm:px-10 lg:px-12 ${
          conScroll ? "h-18 sm:h-20" : "h-20 sm:h-24"
        }`}
      >
        {/* Izquierda: Marca (se oculta en móvil al abrir el menú porque pasa debajo de los enlaces) */}
        <a
          href="#"
          className={`${cormorant.className} text-2xl leading-none font-semibold tracking-tight text-white transition-opacity duration-200 sm:text-3xl ${
            menuAbierto
              ? "pointer-events-none opacity-0 md:pointer-events-auto md:opacity-100"
              : "opacity-100"
          }`}
        >
          Sistema Barberias
        </a>

        {/* Centro (escritorio): Enlaces */}
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

        {/* Derecha (escritorio): Botón "Haz tu reserva" */}
        <div className="hidden md:flex md:items-center">
          <a
            href="#turnos"
            className="inline-flex h-11 items-center justify-center gap-2.5 rounded-lg bg-[#C89D54] px-5 font-sans text-base font-semibold text-[#120F0D] transition-[background-color,scale] duration-150 ease-out [-webkit-tap-highlight-color:transparent] hover:bg-[#D4AB63] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C89D54]"
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
        </div>

        {/* Derecha (móvil): Botón ícono de menú hamburguesa con cross-fade (better-ui) */}
        <button
          type="button"
          aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuAbierto}
          aria-controls="menu-movil-principal"
          onClick={() => setMenuAbierto((prev) => !prev)}
          className="relative inline-flex h-11 w-11 items-center justify-center rounded-lg text-white transition-transform duration-150 ease-out [-webkit-tap-highlight-color:transparent] enabled:active:scale-[0.96] md:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C89D54]"
        >
          {/* Ícono Hamburguesa */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={`absolute h-7 w-7 transition-[scale,opacity,filter] duration-700 ease-[cubic-bezier(0.2,0,0,1)] ${
              menuAbierto
                ? "scale-25 opacity-0 blur-xs"
                : "scale-100 opacity-100 blur-0"
            }`}
          >
            <path d="M4 7h16M4 12h16M4 17h16" vectorEffect="non-scaling-stroke" />
          </svg>

          {/* Ícono Cerrar (X) */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={`absolute h-7 w-7 text-[#C89D54] transition-[scale,opacity,filter] duration-700 ease-[cubic-bezier(0.2,0,0,1)] ${
              menuAbierto
                ? "scale-100 opacity-100 blur-0"
                : "scale-25 opacity-0 blur-xs"
            }`}
          >
            <path d="M6 6l12 12M18 6L6 18" vectorEffect="non-scaling-stroke" />
          </svg>
        </button>
      </nav>

      {/* Menú móvil a pantalla completa con animación de apertura y cierre escalonado */}
      <div
        id="menu-movil-principal"
        aria-hidden={!menuAbierto}
        style={{
          transitionDelay: menuAbierto ? "0ms" : "170ms",
        }}
        className={`fixed inset-0 z-40 flex min-h-svh flex-col items-center justify-start overflow-y-auto overscroll-contain bg-[#120F0D]/65 px-6 pt-18 pb-10 text-center backdrop-blur-md transition-[translate,opacity] duration-850 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-10 md:hidden ${
          menuAbierto
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        }`}
      >
        {/* 1. Elementos de navegación centrados más arriba */}
        <ul className="flex flex-col items-center gap-3.5">
          {navItems.map((item, idx) => {
            const esActivo = seccionActiva === item.id;
            const totalPasos = navItems.length + 2;
            const delayApertura = 80 + idx * 50;
            const delayCierre = (totalPasos - 1 - idx) * 30;

            return (
              <li
                key={item.id}
                style={{
                  transitionDelay: menuAbierto
                    ? `${delayApertura}ms`
                    : `${delayCierre}ms`,
                }}
                className={`transition-[translate,scale,opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  menuAbierto
                    ? "translate-y-0 scale-100 opacity-100 blur-0"
                    : "-translate-y-4 scale-95 opacity-0 blur-xs"
                }`}
              >
                <a
                  href={item.href}
                  tabIndex={menuAbierto ? 0 : -1}
                  aria-current={esActivo ? "page" : undefined}
                  onClick={() => {
                    setSeccionActiva(item.id);
                    setMenuAbierto(false);
                  }}
                  className={`group relative inline-block py-1.5 font-sans text-xl font-medium transition-colors duration-200 ${
                    esActivo
                      ? "text-[#C89D54]"
                      : "text-white hover:text-[#C89D54]"
                  }`}
                >
                  <span>{item.label}</span>
                  <span
                    aria-hidden="true"
                    className={`pointer-events-none absolute bottom-0 left-0 h-0.5 bg-[#C89D54] transition-[width,opacity] duration-300 ease-out ${
                      esActivo ? "w-full opacity-100" : "w-0 opacity-0"
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>

        {/* 2. Marca del local ("Sistema Barberias") debajo de los elementos + 3. Botón al final */}
        <div className="flex w-full flex-col items-center">
          <div
            style={{
              transitionDelay: menuAbierto
                ? `${80 + navItems.length * 50}ms`
                : "30ms",
            }}
            className={`my-20 transition-[translate,scale,opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              menuAbierto
                ? "translate-y-0 scale-100 opacity-100 blur-0"
                : "-translate-y-4 scale-95 opacity-0 blur-xs"
            }`}
          >
            <span
              className={`${cormorant.className} block text-3xl leading-none font-semibold tracking-tight text-white`}
            >
              Sistema Barberias
            </span>
          </div>

          <div
            style={{
              transitionDelay: menuAbierto
                ? `${80 + (navItems.length + 1) * 50}ms`
                : "0ms",
            }}
            className={`w-full max-w-56 transition-[translate,scale,opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              menuAbierto
                ? "translate-y-0 scale-100 opacity-100 blur-0"
                : "-translate-y-4 scale-95 opacity-0 blur-xs"
            }`}
          >
            <a
              href="#turnos"
              tabIndex={menuAbierto ? 0 : -1}
              onClick={() => setMenuAbierto(false)}
              className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded-lg bg-[#C89D54] px-5 font-sans text-base font-semibold text-[#120F0D] transition-[background-color,scale] duration-150 ease-out [-webkit-tap-highlight-color:transparent] hover:bg-[#D4AB63] active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C89D54]"
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
          </div>
        </div>
      </div>
    </header>
  );
}
