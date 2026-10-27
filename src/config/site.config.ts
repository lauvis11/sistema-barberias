export const siteConfig = {
  // Marca
  name: "Barbería Demo",
  tagline: "Estilo y tradición en cada corte",
  description: "Reservá tu turno online en segundos.",

  // Contacto (datos ficticios para la demo)
  contact: {
    phone: "+54 381 555 0100",
    whatsapp: "5493815550100", // formato internacional, sin + ni espacios
    email: "hola@barberiademo.com",
    address: "Av. Ejemplo 1234, San Miguel de Tucumán",
  },

  // Local
  timezone: "America/Argentina/Tucuman",

  // Reservas.
  // IMPORTANTE: estos valores también están fijos dentro de la función SQL
  // reservar_turno_publico. Si cambiás uno acá, cambialo también en la base.
  // La UI los usa solo para mostrar cosas (ej: hasta qué fecha elegir).
  booking: {
    slotMinutes: 30, // paso de la grilla de horarios
    maxDaysAhead: 30, // hasta cuántos días en el futuro se puede reservar
  },
} as const;

export type SiteConfig = typeof siteConfig;