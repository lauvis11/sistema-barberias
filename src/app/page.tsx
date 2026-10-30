import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { ScrollSuave } from "@/components/scroll-suave";
import { Servicios } from "@/components/servicios";

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col bg-[#120F0D] text-[#F5F0E6]">
      <ScrollSuave />
      <Navbar />
      <Hero />
      <Servicios />
    </main>
  );
}
