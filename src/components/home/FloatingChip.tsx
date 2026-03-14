import { ReactNode } from "react";

interface FloatingChipProps {
  children: ReactNode;
  position: "left" | "right";
}

export default function FloatingChip({
  children,
  position,
}: FloatingChipProps) {
  return (
    <div
      className={`absolute z-10 flex animate-[floatChip_3s_ease-in-out_infinite] items-center gap-2.5 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.08)] ${
        position === "left"
          ? "top-[40%] left-[-48px] [animation-delay:-1.5s]"
          : "right-[-36px] bottom-[20%]"
      }`}
    >
      <div className="relative flex h-2 w-2">
        <span className="bg-brand absolute inline-flex h-full w-full animate-ping rounded-full opacity-40"></span>
        <span className="bg-brand relative inline-flex h-2 w-2 rounded-full"></span>
      </div>
      <span className="text-xs font-bold tracking-widest text-[#da291c]">
        {children}
      </span>
    </div>
  );
}
