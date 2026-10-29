import { Hero } from "@/components/hero";
import { Navbar } from "@/components/navbar";
import { Servicios } from "@/components/servicios";

export default function Home() {
  return (
    <main className="relative flex flex-1 flex-col bg-[#120F0D] text-[#F5F0E6]">
      <Navbar />
      <Hero />
      <Servicios />
    </main>
  );
}
