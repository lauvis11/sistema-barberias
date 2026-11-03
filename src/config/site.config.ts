export const siteConfig = {
  // Marca
  name: "Sistema Barbería",
  logo: null as string | null,
  tagline: "Estilo y tradición en cada corte",
  description: "Reservá tu turno online en segundos.",

  // Navegación (6 secciones en orden exacto según DESIGN.md)
  nav: [
    { id: "inicio", label: "Inicio", href: "#" },
    { id: "servicios", label: "Servicios", href: "#servicios" },
    { id: "galeria", label: "Galería", href: "#galeria" },
    { id: "turnos", label: "Turnos", href: "#turnos" },
    { id: "nosotros", label: "Nosotros", href: "#nosotros" },
    { id: "contacto", label: "Contacto", href: "#contacto" },
  ],

  // Hero
  hero: {
    badge: "BARBERIA PREMIUM PARA HOMBRES",
    titleLine1: "ESTILO Y",
    titleLine2: "TRADICIÓN",
    description:
      "Cortes clásicos, degradados a navaja y ritual de barba con toalla caliente. Reservá tu turno online en segundos sin esperas.",
    cta: {
      label: "RESERVÁ TU TURNO",
      href: "/reservar",
    },
    image: "/Retrato-masculino.png",
  },

  // Redes sociales
  social: [
    {
      red: "instagram",
      label: "Seguinos en Instagram",
      href: "https://instagram.com",
    },
    {
      red: "facebook",
      label: "Seguinos en Facebook",
      href: "https://facebook.com",
    },
    {
      red: "tiktok",
      label: "Seguinos en TikTok",
      href: "https://tiktok.com",
    },
  ],

  // Beneficios (FeaturesBar)
  beneficios: [
    {
      icono: "calendario",
      titulo: "RESERVA ONLINE",
      subtitulo: "Elegí barbero y horario en segundos",
    },
    {
      icono: "persona",
      titulo: "BARBEROS EXPERTOS",
      subtitulo: "Atención personalizada y detalle",
    },
    {
      icono: "bolsa",
      titulo: "PRODUCTOS PREMIUM",
      subtitulo: "Las mejores marcas para tu cuidado",
    },
    {
      icono: "escudo",
      titulo: "CALIDAD GARANTIZADA",
      subtitulo: "Higiene y excelencia en cada servicio",
    },
  ],

  // Servicios (para la vista visual, agrupados por categoría)
  servicios: {
    etiqueta: "NUESTRA CARTA",
    titulo: "SERVICIOS Y COMBOS",
    descripcion:
      "Atención artesanal, precisión milimétrica y los mejores productos para el cuidado de tu cabello y barba.",
    categorias: [
      {
        nombre: "Cortes",
        items: [
          {
            id: "corte-clasico",
            nombre: "Corte clásico",
            descripcion: "A tijera o máquina, incluye lavado, peinado y producto de terminación.",
            duracion: "45 min",
            precio: "$8.000",
            esCombo: false,
          },
          {
            id: "corte-degradado",
            nombre: "Corte degradado (Fade)",
            descripcion: "Degradado suave a navaja o shaver, perfilado de contornos y styling.",
            duracion: "50 min",
            precio: "$10.000",
            esCombo: false,
          },
          {
            id: "corte-infantil",
            nombre: "Corte infantil",
            descripcion: "Para chicos de hasta 12 años, con dedicación, paciencia y estilo.",
            duracion: "35 min",
            precio: "$7.000",
            esCombo: false,
          },
        ],
      },
      {
        nombre: "Barba y Cuidado",
        items: [
          {
            id: "ritual-barba",
            nombre: "Ritual de barba",
            descripcion: "Toalla caliente aromatizada, aceites hidratantes, perfilado y afeitado a navaja.",
            duracion: "35 min",
            precio: "$6.000",
            esCombo: false,
          },
          {
            id: "perfilado-express",
            nombre: "Perfilado express",
            descripcion: "Prolijado rápido de líneas de barba, mejillas y cuello a navaja.",
            duracion: "20 min",
            precio: "$3.500",
            esCombo: false,
          },
          {
            id: "perfilado-cejas",
            nombre: "Perfilado de cejas",
            descripcion: "Limpieza sutil y prolijado de contornos con navaja tradicional.",
            duracion: "15 min",
            precio: "$3.000",
            esCombo: false,
          },
        ],
      },
      {
        nombre: "Combos Especiales",
        items: [
          {
            id: "combo-clasico-barba",
            nombre: "Corte clásico + Barba",
            descripcion: "Corte tradicional a tijera o máquina junto al ritual completo de barba con descuento.",
            duracion: "70 min",
            precio: "$13.000",
            esCombo: true,
          },
          {
            id: "combo-fade-barba",
            nombre: "Degradado + Barba",
            descripcion: "Fade impecable a navaja sumado al cuidado y definición completa de tu barba.",
            duracion: "80 min",
            precio: "$15.500",
            esCombo: true,
          },
          {
            id: "combo-vip-completo",
            nombre: "Experiencia VIP Completa",
            descripcion: "Degradado a elección, ritual de barba con toalla caliente, cejas y lavado exfoliante.",
            duracion: "90 min",
            precio: "$18.000",
            esCombo: true,
          },
        ],
      },
    ],
  },

  // Galería
  galeria: {
    etiqueta: "GALERÍA DE TRABAJOS",
    titulo: "EL LOCAL Y NUESTRO OFICIO",
    descripcion:
      "Una muestra del ambiente, las herramientas de precisión y el detalle que aplicamos en cada corte.",
    fotos: [
      {
        id: "1",
        src: "/corte-de-pelo-1.jpg",
        alt: "Corte taper fade contemporáneo y barba perfilada",
        categoria: "Cortes",
      },
      {
        id: "2",
        src: "/corte-de-pelo-2.jpg",
        alt: "Corte clásico con raya al costado y degradado en nuca",
        categoria: "Clásicos",
      },
      {
        id: "3",
        src: "/corte-de-pelo-4.jpg",
        alt: "Textured crop francés con degradado y barba esculpida",
        categoria: "Cortes",
      },
      {
        id: "4",
        src: "/corte-de-pelo-6.png",
        alt: "Degradado medio nítido con textura superior definida",
        categoria: "Fades",
      },
      {
        id: "5",
        src: "/corte-de-pelo-5.png",
        alt: "Fade cónico con perfilado de patillas y barba completa",
        categoria: "Barba",
      },
      {
        id: "6",
        src: "/corte-de-pelo-1.jpg",
        alt: "Styling texturado y líneas precisas en contornos",
        categoria: "Estilo",
      },
      {
        id: "7",
        src: "/corte-de-pelo-2.jpg",
        alt: "Terminación tradicional pulida con navaja en nuca",
        categoria: "Clásicos",
      },
      {
        id: "8",
        src: "/corte-de-pelo-4.jpg",
        alt: "Diseño de barba angular y transición suave de fade",
        categoria: "Detalles",
      },
      {
        id: "9",
        src: "/corte-de-pelo-6.png",
        alt: "Low fade limpio con terminación a máquina y tijera",
        categoria: "Cortes",
      },
      {
        id: "10",
        src: "/corte-de-pelo-5.png",
        alt: "Corte texturado moderno con barba perfilada",
        categoria: "Cortes",
      },
    ],
  },

  // Turnos (sección explicativa de cómo funciona)
  turnos: {
    etiqueta: "RESERVA ONLINE",
    titulo: "TU TURNO EN TRES PASOS",
    descripcion:
      "Gestioná tu turno en cualquier momento desde tu celular o computadora. Sin llamadas ni esperas en el local.",
    cta: {
      label: "RESERVÁ TU TURNO AHORA",
      href: "/reservar",
    },
    pasos: [
      {
        numero: "01",
        titulo: "ELEGÍ TU SERVICIO",
        descripcion:
          "Seleccioná el corte, ritual de barba o combo que mejor se ajuste a lo que buscás.",
        icono: "tijera",
      },
      {
        numero: "02",
        titulo: "BARBERO Y HORARIO",
        descripcion:
          "Elegí a tu profesional de confianza y el día y horario disponible que te sea más cómodo.",
        icono: "reloj",
      },
      {
        numero: "03",
        titulo: "CONFIRMÁ AL INSTANTE",
        descripcion:
          "Ingresás tus datos y recibís la confirmación inmediata en tu correo electrónico con recordatorio.",
        icono: "check",
      },
    ],
  },

  // Nosotros
  nosotros: {
    etiqueta: "TRADICIÓN & OFICIO",
    titulo: "PASIÓN POR EL CORTE Y LA ATENCIÓN PERSONALIZADA",
    historia:
      "Nacimos con una idea clara: recuperar la mística de las barberías de barrio de antaño y combinarla con el estándar de servicio más exigente. En nuestro local no vas a encontrar turnos apresurados ni resultados estándar; nos tomamos el tiempo que tu imagen merece.",
    filosofia:
      "Creemos en la conversación distendida, la música a volumen justo, el café de cortesía y la precisión milimétrica de cada pasada de navaja. Cuidar de tu estilo es un ritual diario.",
    cifras: [
      { valor: "+8", etiqueta: "AÑOS DE TRAYECTORIA" },
      { valor: "+15K", etiqueta: "TURNOS REALIZADOS" },
      { valor: "4.9", etiqueta: "PUNTUACIÓN PROMEDIO" },
      { valor: "100%", etiqueta: "DEDICACIÓN AL DETALLE" },
    ],
    equipo: [
      {
        nombre: "Mateo Rossi",
        especialidad: "Barbero Fundador & Cortes Clásicos",
        descripcion: "Especialista en tijera tradicional y ritual de toalla caliente.",
      },
      {
        nombre: "Lucas Benítez",
        especialidad: "Master Barber & Experto en Fades",
        descripcion: "Técnica de degradados pulidos a navaja y diseño de contornos.",
      },
      {
        nombre: "Joaquín Díaz",
        especialidad: "Especialista en Barbas & Afeitado",
        descripcion: "Cuidado de la piel, moldeado de barba tupida y perfilado navajero.",
      },
    ],
  },

  // Contacto (datos ficticios para la demo)
  contact: {
    etiqueta: "DÓNDE ENCONTRARNOS",
    titulo: "VENÍ A CONOCERNOS",
    descripcion:
      "Estamos ubicados en una zona accesible con estacionamiento cercano. Te esperamos para vivir la experiencia.",
    phone: "+54 381 555 0100",
    phoneDisplay: "+54 381 555-0100",
    whatsapp: "5493815550100", // formato internacional, sin + ni espacios
    whatsappDisplay: "+54 9 381 555-0100",
    email: "hola@barberiademo.com",
    address: "Av. Ejemplo 1234, San Miguel de Tucumán",
    googleMapsUrl:
      "https://maps.google.com/?q=Av.+Ejemplo+1234,+San+Miguel+de+Tucuman",
    horarios: [
      { dias: "Martes a Viernes", horas: "10:00 a 20:00 hs" },
      { dias: "Sábados", horas: "09:00 a 20:00 hs" },
      { dias: "Domingos y Lunes", horas: "Cerrado" },
    ],
  },

  // Footer
  footer: {
    copy: "Todos los derechos reservados. Desarrollado con dedicación y estilo.",
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
