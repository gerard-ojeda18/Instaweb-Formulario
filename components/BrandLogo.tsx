import Image from "next/image";
import { BrandName } from "@/components/BrandName";

interface BrandLogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  centered?: boolean;
  className?: string;
}

const iconSizes = { sm: 36, md: 56, lg: 88 } as const;
const iconClasses = { sm: "h-9 w-9", md: "h-14 w-14", lg: "h-[5.5rem] w-[5.5rem]" };

export function BrandLogo({
  size = "sm",
  showTagline = true,
  centered = false,
  className = "",
}: BrandLogoProps) {
  const px = iconSizes[size];

  return (
    <div
      className={`flex gap-2.5 ${centered ? "flex-col items-center gap-3" : "items-center"} ${className}`}
    >
      <Image
        src="/logo.svg"
        alt="InstaWeb"
        width={px}
        height={px}
        className={iconClasses[size]}
        priority={size === "lg"}
      />
      <BrandName
        size={size === "lg" ? "lg" : size === "md" ? "md" : "sm"}
        showTagline={showTagline}
        centered={centered}
      />
    </div>
  );
}
