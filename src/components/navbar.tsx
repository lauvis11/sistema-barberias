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
  return (
    <header className={`${playfair.className} absolute inset-x-0 top-0 z-20 bg-transparent`}>
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-22 max-w-6xl items-center justify-between px-6 pt-2 sm:h-24 sm:px-10 lg:px-12"
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
