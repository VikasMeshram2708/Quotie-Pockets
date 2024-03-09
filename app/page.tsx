import Image from "next/image";
import Hero from "./components/Hero";

export default function Home() {
  return (
    <main className="max-w-[95%] mx-auto">
        {/* Hero Component */}
      <div className="mt-10">
        <Hero />
      </div>
    </main>
  );
}
