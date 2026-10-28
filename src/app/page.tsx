import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col bg-[#120F0D] text-[#F5F0E6]">
      <Navbar />
      <Hero />

      {/* Sección de prueba para probar el desplazamiento desde el Hero */}
      <section
        id="contenido"
        className="mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 lg:px-12"
      >
        <div className="max-w-2xl space-y-4">
          <h2 className="text-3xl font-semibold tracking-tight text-[#F7F3EB]">
            Sección de prueba
          </h2>
          <p className="text-base leading-relaxed text-[#A8A29A]">
            Texto de prueba para verificar el efecto de desplazamiento suave al hacer clic en el botón circular de flecha hacia abajo del Hero y la transición visual entre el encabezado principal y el resto de la página.
          </p>
          <p className="text-base leading-relaxed text-[#A8A29A]">
            Acá irán las próximas secciones del salón (carta de servicios, barberos y formulario de reserva de turnos).
          </p>
        </div>
      </section>
    </main>
  );
}
