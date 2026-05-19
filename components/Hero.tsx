import Image from "next/image";
import Link from "next/link";
import { BrandName } from "@/components/BrandName";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative flex min-h-svh items-center justify-center overflow-hidden bg-navy-900 px-4 pb-16 pt-[calc(4.5rem+4rem)] text-center text-white"
    >
      <div className="pointer-events-none absolute inset-0 bg-hero-glow" aria-hidden />

      <div className="relative z-10 max-w-lg">
        <div className="animate-fade-up mb-10 flex flex-col items-center gap-3">
          <Image
            src="/logo.svg"
            alt="InstaWeb"
            width={88}
            height={88}
            className="h-[5.5rem] w-[5.5rem]"
            priority
          />
          <BrandName size="lg" centered />
        </div>

        <h1 className="animate-fade-up-delay-1 mb-6 text-[clamp(1.5rem,4.5vw,2.25rem)] font-bold uppercase leading-tight tracking-wide">
          Expandí tu identidad al mundo digital
        </h1>

        <p className="animate-fade-up-delay-2 mb-10 text-[clamp(0.9375rem,2.5vw,1.0625rem)] leading-relaxed text-white/82">
          Diseñamos infraestructura web premium para marcas con propósito. Compartinos tu visión
          y transformemos tu propuesta de valor en una experiencia digital de alto rendimiento.
        </p>

        <Link
          href="#registro"
          className="animate-fade-up-delay-3 inline-flex items-center justify-center rounded-sm bg-gold-gradient px-8 py-3.5 text-[0.8125rem] font-bold uppercase tracking-widest text-navy-900 shadow-[0_4px_20px_rgba(201,162,39,0.35)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(201,162,39,0.45)] active:scale-[0.98]"
        >
          Comenzar Registro
        </Link>
      </div>
    </section>
  );
}
