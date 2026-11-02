"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Cormorant_Garamond } from "next/font/google";
import { siteConfig } from "@/config/site.config";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export function Navbar() {
  const [conScroll, setConScroll] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [seccionActiva, setSeccionActiva] = useState("inicio");

  useEffect(() => {
    const actualizarEstadoScroll = () => {
      const scrollY = window.scrollY;
      setConScroll(scrollY > 0);

      // Si estamos arriba del todo, es inicio
      if (scrollY < 100) {
        setSeccionActiva("inicio");
        return;
      }

      // Si estamos cerca del fondo de la página, activa la última sección
      if (
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        setSeccionActiva(siteConfig.nav[siteConfig.nav.length - 1].id);
        return;
      }

      const puntoReferencia = window.innerHeight * 0.38;
      let actual = "inicio";

      for (const item of siteConfig.nav) {
        if (item.id === "inicio") continue;
        const elemento = document.getElementById(item.id);
        if (!elemento) continue;

        const rect = elemento.getBoundingClientRect();
        if (rect.top <= puntoReferencia && rect.bottom > 80) {
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

  // Bloqueo de scroll y actualización de sección activa al abrir el menú móvil
  useEffect(() => {
    document.body.style.overflow = menuAbierto ? "hidden" : "";
    if (menuAbierto) {
      const scrollY = window.scrollY;
      if (scrollY < 100) {
        setSeccionActiva("inicio");
      } else if (
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        setSeccionActiva(siteConfig.nav[siteConfig.nav.length - 1].id);
      } else {
        const puntoReferencia = window.innerHeight * 0.38;
        let actual = "inicio";
        for (const item of siteConfig.nav) {
          if (item.id === "inicio") continue;
          const elemento = document.getElementById(item.id);
          if (!elemento) continue;

          const rect = elemento.getBoundingClientRect();
          if (rect.top <= puntoReferencia && rect.bottom > 80) {
            actual = item.id;
          }
        }
        setSeccionActiva(actual);
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuAbierto]);

  // Cierre con la tecla Escape para accesibilidad
  useEffect(() => {
    const manejarEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuAbierto) {
        setMenuAbierto(false);
      }
    };

    window.addEventListener("keydown", manejarEscape);
    return () => window.removeEventListener("keydown", manejarEscape);
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
        {/* Izquierda: Logo (texto o imagen según siteConfig) */}
        <a
          href="#"
          className={`text-white transition-opacity duration-200 ${
            menuAbierto
              ? "pointer-events-none opacity-0 md:pointer-events-auto md:opacity-100"
              : "opacity-100"
          }`}
        >
          {siteConfig.logo ? (
            <Image
              src={siteConfig.logo}
              alt={siteConfig.name}
              width={140}
              height={40}
              className="h-9 w-auto object-contain"
              priority
            />
          ) : (
            <span
              className={`${cormorant.className} text-2xl leading-none font-semibold tracking-tight sm:text-3xl`}
            >
              {siteConfig.name}
            </span>
          )}
        </a>

        {/* Derecha: Tanto los enlaces de navegación como el botón agrupados y desplazados hacia la derecha */}
        <div className="flex items-center gap-6 sm:gap-7 lg:gap-8 md:translate-x-6 lg:translate-x-10">
          <ul className="hidden items-center gap-6 md:flex lg:gap-8">
            {siteConfig.nav.map((item) => {
              const esActivo = seccionActiva === item.id;

              return (
                <li key={item.id}>
                  <a
                    href={item.href}
                    aria-current={esActivo ? "page" : undefined}
                    onClick={() => setSeccionActiva(item.id)}
                    className={`group relative inline-block py-1.5 font-sans text-[13px] font-semibold tracking-wider uppercase transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-marron ${
                      esActivo
                        ? "text-marron"
                        : "text-white hover:text-marron"
                    }`}
                  >
                    <span>{item.label}</span>
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute bottom-0 left-0 h-0.5 bg-marron transition-[width,opacity] duration-300 ease-out ${
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

          {/* Botón con borde marrón fino sin relleno que va a /reservar */}
          <a
            href={siteConfig.hero.cta.href}
            className="group hidden items-center gap-2 rounded border border-marron bg-transparent px-4.5 py-2 font-sans text-[13px] font-semibold tracking-wider text-marron uppercase transition-colors duration-250 hover:bg-marron hover:text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marron md:inline-flex"
          >
            <span>{siteConfig.hero.cta.label}</span>
          </a>

          {/* Botón hamburguesa (móvil) */}
          <button
            type="button"
            aria-label={menuAbierto ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
            aria-expanded={menuAbierto}
            aria-controls="menu-movil"
            onClick={() => setMenuAbierto(!menuAbierto)}
            className="relative z-50 flex h-11 w-11 items-center justify-center rounded-lg border border-transparent text-[#F5F0E6] transition-colors duration-200 hover:text-marron focus-visible:outline-2 focus-visible:outline-marron md:hidden"
          >
            <span className="sr-only">
              {menuAbierto ? "Cerrar menú" : "Abrir menú"}
            </span>
            <div className="relative h-4 w-5">
              <span
                aria-hidden="true"
                className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ease-out ${
                  menuAbierto ? "top-2 rotate-45" : "top-0.5"
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute top-2 left-0 block h-0.5 w-5 bg-current transition-opacity duration-200 ${
                  menuAbierto ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                aria-hidden="true"
                className={`absolute left-0 block h-0.5 w-5 bg-current transition-all duration-300 ease-out ${
                  menuAbierto ? "top-2 -rotate-45" : "top-3.5"
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Menú móvil desplegable a pantalla completa */}
      <div
        id="menu-movil"
        role="dialog"
        aria-modal="true"
        aria-label="Menú principal de navegación"
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center overflow-y-auto bg-[#120F0D]/98 px-6 py-12 backdrop-blur-md transition-all duration-500 ease-out md:hidden ${
          menuAbierto
            ? "translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        }`}
      >
        <div className="my-auto flex w-full max-w-xs flex-col items-center">
          {/* 1. Elementos de navegación centrados con resaltado de la sección actual en marrón */}
          <ul className="flex flex-col items-center gap-4">
            {siteConfig.nav.map((item, idx) => {
              const esActivo = seccionActiva === item.id;
              const totalPasos = siteConfig.nav.length + 2;
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
                    className={`group relative inline-block py-1.5 font-sans text-[21px] uppercase tracking-wider transition-colors duration-200 ${
                      esActivo
                        ? "font-semibold text-marron"
                        : "font-medium text-white hover:text-marron"
                    }`}
                  >
                    <span>{item.label}</span>
                    {/* Línea inferior en marrón para la sección activa */}
                    <span
                      aria-hidden="true"
                      className={`pointer-events-none absolute bottom-0 left-0 h-0.5 bg-marron transition-[width,opacity] duration-300 ease-out ${
                        esActivo ? "w-full opacity-100" : "w-0 opacity-0"
                      }`}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          {/* 2. Logo del local con mayor height y presencia vertical */}
          <div
            style={{
              transitionDelay: menuAbierto
                ? `${80 + siteConfig.nav.length * 50}ms`
                : "30ms",
            }}
            className={`my-16 flex min-h-35 items-center justify-center py-4 transition-[translate,scale,opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:my-20 ${
              menuAbierto
                ? "translate-y-0 scale-100 opacity-100 blur-0"
                : "-translate-y-4 scale-95 opacity-0 blur-xs"
            }`}
          >
            {siteConfig.logo ? (
              <Image
                src={siteConfig.logo}
                alt={siteConfig.name}
                width={360}
                height={140}
                className="h-28 w-auto object-contain sm:h-36"
              />
            ) : (
              <span
                className={`${cormorant.className} block text-center text-6xl leading-[0.95] font-semibold tracking-tight text-white sm:text-7xl`}
              >
                {siteConfig.name}
              </span>
            )}
          </div>

          {/* 3. Botón de reservar con espaciado equilibrado respecto al logo */}
          <div
            style={{
              transitionDelay: menuAbierto
                ? `${80 + (siteConfig.nav.length + 1) * 50}ms`
                : "0ms",
            }}
            className={`w-full max-w-56 transition-[translate,scale,opacity,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              menuAbierto
                ? "translate-y-0 scale-100 opacity-100 blur-0"
                : "-translate-y-4 scale-95 opacity-0 blur-xs"
            }`}
          >
            <a
              href={siteConfig.hero.cta.href}
              tabIndex={menuAbierto ? 0 : -1}
              onClick={() => setMenuAbierto(false)}
              className="inline-flex h-12 w-full items-center justify-center gap-2.5 rounded border border-marron bg-transparent px-5 font-sans text-sm font-semibold tracking-wider text-marron uppercase transition-colors duration-250 ease-out [-webkit-tap-highlight-color:transparent] hover:bg-marron hover:text-black active:scale-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-marron"
            >
              <span>{siteConfig.hero.cta.label}</span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
