import Image from "next/image";

interface SectionDividerProps {
  pattern?: string;
  variant?: "light" | "dark";
}

export default function SectionDivider({
  pattern = "/images/elements/MaM-padrao-03.jpg",
  variant = "light",
}: SectionDividerProps) {
  return (
    <div className="relative h-24 overflow-hidden md:h-32">
      <Image
        src={pattern}
        alt=""
        width={1920}
        height={128}
        className="h-full w-full object-cover"
        aria-hidden="true"
      />
      <div
        className={`absolute inset-0 ${
          variant === "light"
            ? "bg-gradient-to-b from-cream via-cream/80 to-cream"
            : "bg-gradient-to-b from-navy via-navy/80 to-navy"
        }`}
      />
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${pattern})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
}
