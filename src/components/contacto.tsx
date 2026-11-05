"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/config/site.config";

export function Contacto() {
  const {
    etiqueta,
    titulo,
    phone,
    phoneDisplay,
    whatsapp,
    email,
    address,
    googleMapsUrl,
    horarios,
  } = siteConfig.contact;

  const seccionRef = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  // Estados del formulario de contacto
  const [nombre, setNombre] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [asunto, setAsunto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [errorValidacion, setErrorValidacion] = useState<string | null>(null);

  useEffect(() => {
    const nodo = seccionRef.current;
    if (!nodo) return;

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(nodo);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorValidacion(null);

    if (!nombre.trim() || !emailInput.trim() || !asunto || !mensaje.trim()) {
      setErrorValidacion("Por favor completá todos los campos requeridos.");
      return;
    }

    setEnviando(true);

    // Simulación de envío fluido con respuesta visual
    setTimeout(() => {
      setEnviando(false);
      setEnviado(true);
    }, 700);
  };

  const handleResetForm = () => {
    setNombre("");
    setEmailInput("");
    setAsunto("");
    setMensaje("");
    setEnviado(false);
    setErrorValidacion(null);
  };

  return (
    <section
      ref={seccionRef}
      id="contacto"
      className="relative flex min-h-svh lg:h-dvh w-full flex-col justify-center items-center overflow-hidden bg-[#0A0A0A] text-[#F5F0E6] scroll-mt-18 sm:scroll-mt-20 py-8 lg:py-0"
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-12">
        {/* Cabecera de sección compacta sin párrafo inferior */}
        <div
          className={`max-w-2xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <p className="font-sans text-xs font-semibold tracking-[0.22em] text-marron uppercase sm:text-sm">
            {etiqueta}
          </p>
          <h2 className="mt-2 font-condensed text-3xl leading-tight font-bold tracking-tight text-white uppercase sm:text-4xl lg:text-5xl">
            {titulo}
          </h2>
          {/* Línea decorativa corta marrón */}
          <div className="mt-3 h-0.5 w-12 bg-marron" />
        </div>

        {/* Grilla principal: Tarjetas de información a la izquierda y Formulario abierto a la derecha */}
        <div className="mt-6 sm:mt-8 lg:mt-10 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10 items-start">
          {/* ========================================================= */}
          {/* COLUMNA IZQUIERDA: Formato de tarjetas (bordes y fondo) */}
          {/* ========================================================= */}
          <div
            style={{ transitionDelay: "150ms" }}
            className={`space-y-3.5 sm:space-y-4 lg:col-span-6 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {/* 1. Tarjeta de Dirección */}
            <div className="flex items-start gap-3.5 border border-white/10 bg-[#141210] p-3.5 sm:p-4 transition-colors duration-250 hover:border-marron/60">
              <div className="mt-0.5 shrink-0 text-marron">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-5 w-5"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-sans text-[11px] font-bold tracking-wider text-neutral-400 uppercase sm:text-xs">
                  DIRECCIÓN
                </p>
                <p className="mt-0.5 text-sm font-semibold text-white sm:text-base">
                  {address}
                </p>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-marron uppercase hover:underline focus-visible:outline-2 focus-visible:outline-marron"
                >
                  <span>Abrir en Google Maps</span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-3 w-3"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
              </div>
            </div>

            {/* 2. Tarjetas de Teléfono y Correo en fila de 2 */}
            <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
              {/* Teléfono */}
              <div className="flex items-start gap-3 border border-white/10 bg-[#141210] p-3.5 sm:p-4 transition-colors duration-250 hover:border-marron/60">
                <div className="mt-0.5 shrink-0 text-marron">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-sans text-[11px] font-bold tracking-wider text-neutral-400 uppercase sm:text-xs">
                    TELÉFONO
                  </p>
                  <a
                    href={`tel:${phone}`}
                    className="mt-0.5 block text-sm font-semibold text-white transition-colors hover:text-marron"
                  >
                    {phoneDisplay}
                  </a>
                </div>
              </div>

              {/* Correo */}
              <div className="flex items-start gap-3 border border-white/10 bg-[#141210] p-3.5 sm:p-4 transition-colors duration-250 hover:border-marron/60">
                <div className="mt-0.5 shrink-0 text-marron">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-5 w-5"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-sans text-[11px] font-bold tracking-wider text-neutral-400 uppercase sm:text-xs">
                    CORREO
                  </p>
                  <a
                    href={`mailto:${email}`}
                    className="mt-0.5 block truncate text-sm font-semibold text-white transition-colors hover:text-marron"
                  >
                    {email}
                  </a>
                </div>
              </div>
            </div>

            {/* 3. Tarjeta de Horarios de atención */}
            <div className="border border-white/10 bg-[#141210] p-3.5 sm:p-4.5 transition-colors duration-250 hover:border-marron/60">
              <div className="flex items-center gap-2.5">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                  className="h-5 w-5 text-marron"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <h3 className="font-condensed text-lg font-bold uppercase tracking-wider text-white sm:text-xl">
                  HORARIOS DE ATENCIÓN
                </h3>
              </div>

              <div className="mt-3 divide-y divide-white/10">
                {horarios.map((item) => (
                  <div
                    key={item.dias}
                    className="flex items-center justify-between py-1.5 text-xs sm:text-sm"
                  >
                    <span className="font-medium text-neutral-300">
                      {item.dias}
                    </span>
                    <span className="font-semibold text-marron">
                      {item.horas}
                    </span>
                  </div>
                ))}
              </div>

              {/* Botón directo de WhatsApp bajo los horarios */}
              <div className="mt-3.5 pt-3 border-t border-white/10">
                <a
                  href={`https://wa.me/${whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex w-full items-center justify-center gap-2.5 border border-marron bg-transparent py-2.5 px-4 font-sans text-xs font-semibold tracking-widest text-marron uppercase transition-colors duration-250 hover:bg-marron hover:text-[#120F0D] focus-visible:outline-2 focus-visible:outline-marron"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0"
                  >
                    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" />
                  </svg>
                  <span>CONSULTAR POR WHATSAPP</span>
                </a>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* COLUMNA DERECHA: Formulario de Contacto (sin envoltorio de tarjeta) */}
          {/* ========================================================= */}
          <div
            style={{ transitionDelay: "250ms" }}
            className={`lg:col-span-6 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            {enviado ? (
              /* Vista de confirmación de mensaje enviado */
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-3.5 border border-white/10 p-6">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-marron/40 bg-marron/10 text-marron">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-7 w-7"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-condensed text-2xl font-bold uppercase tracking-wider text-white">
                  ¡MENSAJE ENVIADO!
                </h3>
                <p className="max-w-md text-xs leading-relaxed text-neutral-300 sm:text-sm">
                  Gracias por comunicarte con nosotros, <strong className="text-white">{nombre}</strong>. Hemos recibido tu consulta y nos pondremos en contacto contigo a la brevedad.
                </p>
                <button
                  type="button"
                  onClick={handleResetForm}
                  className="mt-2 border border-white/20 bg-transparent px-5 py-2 font-sans text-xs font-semibold tracking-wider text-white uppercase transition-colors duration-250 hover:border-marron hover:text-marron cursor-pointer"
                >
                  Enviar otro mensaje
                </button>
              </div>
            ) : (
              /* Formulario de contacto */
              <div>
                <div className="flex items-center gap-2.5">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="h-5 w-5 text-marron"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                  <h3 className="font-condensed text-lg font-bold uppercase tracking-wider text-white sm:text-xl">
                    ENVIANOS UN MENSAJE
                  </h3>
                </div>

                {errorValidacion && (
                  <div className="mt-3 rounded-xs border border-red-500/40 bg-red-950/40 px-3.5 py-2 text-xs text-red-300">
                    {errorValidacion}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                  {/* Nombre */}
                  <div>
                    <label
                      htmlFor="contacto-nombre"
                      className="block font-sans text-[11px] font-semibold tracking-wider text-neutral-300 uppercase sm:text-xs"
                    >
                      Nombre completo *
                    </label>
                    <input
                      id="contacto-nombre"
                      type="text"
                      required
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      placeholder="Ej: Marcos Rossi"
                      className="mt-1 w-full border border-white/15 bg-white/3 px-3.5 py-2 text-xs sm:text-sm text-marron placeholder:text-neutral-600 transition-colors focus:border-marron focus:outline-none focus:ring-1 focus:ring-marron"
                    />
                  </div>

                  {/* Correo Electrónico */}
                  <div>
                    <label
                      htmlFor="contacto-email"
                      className="block font-sans text-[11px] font-semibold tracking-wider text-neutral-300 uppercase sm:text-xs"
                    >
                      Correo electrónico *
                    </label>
                    <input
                      id="contacto-email"
                      type="email"
                      required
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      placeholder="Ej: marcos@ejemplo.com"
                      className="mt-1 w-full border border-white/15 bg-white/3 px-3.5 py-2 text-xs sm:text-sm text-marron placeholder:text-neutral-600 transition-colors focus:border-marron focus:outline-none focus:ring-1 focus:ring-marron"
                    />
                  </div>

                  {/* Menú de Asunto (select) */}
                  <div>
                    <label
                      htmlFor="contacto-asunto"
                      className="block font-sans text-[11px] font-semibold tracking-wider text-neutral-300 uppercase sm:text-xs"
                    >
                      Asunto *
                    </label>
                    <div className="relative mt-1">
                      <select
                        id="contacto-asunto"
                        required
                        value={asunto}
                        onChange={(e) => setAsunto(e.target.value)}
                        className={`w-full appearance-none border border-white/15 bg-white/3 px-3.5 py-2 pr-9 text-xs sm:text-sm transition-colors focus:border-marron focus:outline-none focus:ring-1 focus:ring-marron cursor-pointer ${
                          asunto ? "text-[#F5F0E6]" : "text-neutral-500"
                        }`}
                      >
                        <option value="" disabled className="bg-[#0A0A0A] text-neutral-500">
                          Elige una opción
                        </option>
                        <option value="atencion-al-cliente" className="bg-[#0A0A0A] text-[#F5F0E6]">
                          Atención al cliente
                        </option>
                        <option value="trabajar-con-nosotros" className="bg-[#0A0A0A] text-[#F5F0E6]">
                          Trabajar con nosotros
                        </option>
                        <option value="consulta-general" className="bg-[#0A0A0A] text-[#F5F0E6]">
                          Consulta general
                        </option>
                        <option value="otro" className="bg-[#0A0A0A] text-[#F5F0E6]">
                          Otro
                        </option>
                      </select>
                      {/* Flecha select personalizada */}
                      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-3.5 w-3.5"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label
                      htmlFor="contacto-mensaje"
                      className="block font-sans text-[11px] font-semibold tracking-wider text-neutral-300 uppercase sm:text-xs"
                    >
                      Mensaje *
                    </label>
                    <textarea
                      id="contacto-mensaje"
                      required
                      rows={3}
                      value={mensaje}
                      onChange={(e) => setMensaje(e.target.value)}
                      placeholder="Escribí acá tu consulta o mensaje..."
                      className="mt-1 w-full resize-none border border-white/15 bg-white/3 px-3.5 py-2 text-xs sm:text-sm text-[#F5F0E6] placeholder:text-neutral-600 transition-colors focus:border-marron focus:outline-none focus:ring-1 focus:ring-marron"
                    />
                  </div>

                  {/* Botón de Enviar */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={enviando}
                      className="group flex w-full items-center justify-center gap-2.5 border border-marron bg-marron py-2.5 px-5 font-sans text-xs font-semibold tracking-widest text-[#120F0D] uppercase transition-all duration-250 hover:bg-transparent hover:text-marron focus-visible:outline-2 focus-visible:outline-marron cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed sm:text-sm"
                    >
                      {enviando ? (
                        <>
                          <svg
                            className="h-4 w-4 animate-spin text-current"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8v8H4z"
                            />
                          </svg>
                          <span>ENVIANDO MENSAJE...</span>
                        </>
                      ) : (
                        <>
                          <span>ENVIAR MENSAJE</span>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            aria-hidden="true"
                            className="h-4 w-4 shrink-0 transition-transform duration-250 ease-out group-hover:translate-x-1"
                          >
                            <line x1="22" y1="2" x2="11" y2="13" />
                            <polygon points="22 2 15 22 11 13 2 9 22 2" />
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
