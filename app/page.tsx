import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { IdentityForm } from "@/components/IdentityForm";
import { Navbar } from "@/components/Navbar";
import { Philosophy } from "@/components/Philosophy";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <IdentityForm />
      </main>
      <Footer />
    </>
  );
}
