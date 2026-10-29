"use client";

import { useEffect, useState } from "react";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const navItems = [
  { label: "Inicio", href: "#" },
  { label: "Servicios", href: "#servicios" },
  { label: "Galería", href: "#galeria" },
  { label: "Turnos", href: "#turnos" },
  { label: "Productos", href: "#productos" },
  { label: "Contacto", href: "#contacto" },
];

export function Navbar() {
  const [conScroll, setConScroll] = useState(false);

  useEffect(() => {
    const actualizarEstadoScroll = () => {
      setConScroll(window.scrollY > 0);
    };

    actualizarEstadoScroll();
    window.addEventListener("scroll", actualizarEstadoScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", actualizarEstadoScroll);
    };
  }, []);

  return (
    <header
      className={`${playfair.className} fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow] duration-300 ease-out ${
        conScroll
          ? "bg-black shadow-[0_1px_0_oklch(1_0_0/0.08),0_8px_24px_oklch(0_0_0/0.4)]"
          : "bg-transparent"
      }`}
    >
      <nav
        aria-label="Navegación principal"
        className={`mx-auto flex max-w-6xl items-center justify-between px-6 transition-[height,padding] duration-300 ease-out sm:px-10 lg:px-12 ${
          conScroll ? "h-18 sm:h-20" : "h-22 pt-2 sm:h-24"
        }`}
      >
        <a
          href="#"
          className="inline-block pb-1.5 text-xl font-bold tracking-wide text-white sm:text-2xl"
        >
          Sistema Barberias
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="group relative inline-block pb-1.5 text-base font-semibold tracking-wide text-white transition-colors duration-250 ease-out hover:text-white"
              >
                <span>{item.label}</span>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute bottom-0 left-0 h-0.5 w-0 rounded-full bg-[#C89D54] transition-[width] duration-300 ease-out group-hover:w-full"
                />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
