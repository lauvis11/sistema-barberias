"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Cormorant_Garamond, Playfair_Display } from "next/font/google";
import { siteConfig } from "@/config/site.config";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const cartaCategorias = [
  {
    categoria: "Cortes",
    items: [
      {
        nombre: "Corte clásico",
        descripcion: "Corte a tijera o máquina, con lavado",
        precio: "$8.000",
      },
      {
        nombre: "Corte degradado",
        descripcion: "Fade con terminación a navaja",
        precio: "$10.000",
      },
    ],
  },
  {
    categoria: "Barba y Detalles",
    items: [
      {
        nombre: "Barba",
        descripcion: "Perfilado y arreglo con toalla caliente",
        precio: "$6.000",
      },
      {
        nombre: "Perfilado de cejas",
        descripcion: "Prolijado con navaja",
        precio: "$3.000",
      },
    ],
  },
  {
    categoria: "Color",
    items: [
      {
        nombre: "Coloración",
        descripcion: "Color completo o decoloración",
        precio: "$25.000",
      },
    ],
  },
  {
    categoria: "Combos",
    items: [
      {
        nombre: "Corte + barba",
        descripcion: "Corte clásico y barba con descuento",
        precio: "$13.000",
      },
      {
        nombre: "Degradado + barba",
        descripcion: "Corte degradado y barba con descuento",
        precio: "$15.500",
      },
    ],
  },
];

export function Servicios() {
  const seccionRef = useRef<HTMLElement | null>(null);
  const tiraRef = useRef<HTMLImageElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const tira = tiraRef.current;
    const animacion = tira?.animate(
      [
        { transform: "translate3d(0, 0%, 0)" },
        { transform: "translate3d(0, -33.333333%, 0)" },
      ],
      {
        duration: 3200,
        iterations: Infinity,
        easing: "linear",
      }
    );

    return () => animacion?.cancel();
  }, []);

  useEffect(() => {
    const nodo = seccionRef.current;
    if (!nodo) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(nodo);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={seccionRef}
      id="servicios"
      className="relative flex min-h-svh w-full items-center bg-[#242220] pt-12 pb-20 text-[#F5F0E6]"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:-mt-3 lg:px-12">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Izquierda: Barber Pole 3D con giro continuo del cilindro */}
          <div
            style={{
              transitionDelay: "0ms",
              transitionTimingFunction: "var(--ease-out)",
            }}
            className={`flex items-center justify-center transition-[opacity,transform,filter] duration-700 lg:col-span-5 ${
              visible
                ? "translate-y-0 scale-100 opacity-100 blur-0"
                : "translate-y-5 scale-[0.96] opacity-0 blur-xs"
            }`}
          >
            <div className="relative mx-auto w-32 -rotate-12 select-none sm:w-36 lg:w-42">
              <div className="relative w-full drop-shadow-[0_24px_36px_rgba(0,0,0,0.65)]">
                {/* Cilindro interior giratorio detrás de la estructura cromada y el cristal */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute top-[29.67%] left-[20.53%] z-0 h-[52.20%] w-[58.95%] overflow-hidden"
                >
                  <img
                    ref={tiraRef}
                    src="/barber-pole-2-strip.png"
                    alt=""
                    className="block w-full max-w-none will-change-transform"
                  />
                </div>

                {/* Estructura hueca del Barber Pole (cristal y tapas cromadas por encima del cilindro) */}
                <Image
                  src="/barber-pole-2-frame.png"
                  alt={`Barber pole de ${siteConfig.name}`}
                  width={380}
                  height={1456}
                  loading="eager"
                  unoptimized
                  className="pointer-events-none relative z-10 block h-auto w-full"
                />
              </div>
            </div>
          </div>

          {/* Derecha: Título "Servicios" + Carta con aparición escalonada */}
          <div className="lg:col-span-6 lg:col-start-7 lg:pl-6">
            <h2
              style={{
                transitionDelay: "80ms",
                transitionTimingFunction: "var(--ease-out)",
              }}
              className={`${cormorant.className} text-4xl leading-[1.05] font-semibold tracking-tight text-[#C89D54] transition-[opacity,transform,filter] duration-650 sm:text-5xl ${
                visible
                  ? "translate-y-0 opacity-100 blur-0"
                  : "translate-y-4 opacity-0 blur-xs"
              }`}
            >
              Servicios
            </h2>

            <div className="mt-8 space-y-7">
              {cartaCategorias.map((bloque, idx) => {
                const delayCategoria = 160 + idx * 100;

                return (
                  <div
                    key={bloque.categoria}
                    style={{
                      transitionDelay: `${delayCategoria}ms`,
                      transitionTimingFunction: "var(--ease-out)",
                    }}
                    className={`transition-[opacity,transform,filter] duration-650 ${
                      visible
                        ? "translate-y-0 opacity-100 blur-0"
                        : "translate-y-4 opacity-0 blur-xs"
                    }`}
                  >
                    <h3
                      className={`${playfair.className} text-lg font-bold tracking-wide text-[#C89D54] uppercase`}
                    >
                      {bloque.categoria}
                    </h3>

                    <ul className="mt-3 space-y-3.5">
                      {bloque.items.map((item) => (
                        <li key={item.nombre}>
                          <div className="flex items-baseline gap-3">
                            <span className="text-base font-semibold text-[#F7F3EB] uppercase">
                              {item.nombre}
                            </span>
                            <span
                              aria-hidden="true"
                              style={{
                                transitionDelay: `${delayCategoria + 120}ms`,
                                transitionTimingFunction: "var(--ease-out)",
                              }}
                              className={`flex-1 origin-left border-b border-dotted border-[#F5F0E6]/25 transition-transform duration-700 ${
                                visible ? "scale-x-100" : "scale-x-0"
                              }`}
                            />
                            <span className="text-base font-semibold text-[#C89D54] tabular-nums">
                              {item.precio}
                            </span>
                          </div>

                          <p className="mt-0.5 text-xs text-[#B8B2A8]">
                            {item.descripcion}
                          </p>
                        </li>
                      ))}
                    </ul>
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
