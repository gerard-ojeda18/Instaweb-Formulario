import { Reveal } from "@/components/Reveal";

export function Philosophy() {
  return (
    <section id="esencia" className="bg-white px-4 py-24 text-center md:py-32">
      <Reveal className="mx-auto w-[min(100%,42rem)]">
        <h2 className="mb-4 text-[clamp(1.375rem,3.5vw,1.75rem)] font-bold text-navy-900">
          Nuestra Esencia y Filosofía
        </h2>
        <div className="mx-auto mb-10 h-[3px] w-12 rounded-sm bg-gold-gradient" aria-hidden="true" />
        <blockquote className="text-[clamp(1rem,2.5vw,1.125rem)] italic leading-[1.85] text-gray-600">
          No vendemos código, ni estructuras genéricas. Nos apasiona entender qué es tu local,
          cuál es la experiencia que se respira al cruzar tu puerta y qué impacto real querés
          generar en tus clientes. Tu presencia online debe ser el reflejo exacto de tu prestigio.
        </blockquote>
      </Reveal>
    </section>
  );
}
