interface BrandNameProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  centered?: boolean;
}

const titleSizes = {
  sm: "text-lg",
  md: "text-xl",
  lg: "text-[clamp(1.75rem,5vw,2.5rem)]",
};

export function BrandName({ size = "sm", showTagline = true, centered = false }: BrandNameProps) {
  return (
    <div className={centered ? "text-center" : ""}>
      <p
        className={`font-bold italic leading-tight tracking-tight ${titleSizes[size]}`}
      >
        <span className="text-gradient-insta">Insta</span>
        <span className="text-gold-light">Web</span>
      </p>
      {showTagline && (
        <p
          className={`mt-0.5 text-white/55 ${
            size === "lg" ? "text-[0.8125rem]" : "text-[0.625rem]"
          }`}
        >
          Páginas que generan resultados
        </p>
      )}
    </div>
  );
}
