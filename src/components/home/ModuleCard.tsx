import { ElementType } from "react";
import { Button } from "@/components/ui/Button";

interface ModuleCardProps {
  module: {
    id: string;
    title: string;
    description: string;
    icon: ElementType;
  };
  isActive: boolean;
  onClick: () => void;
}

export default function ModuleCard({
  module,
  isActive,
  onClick,
}: ModuleCardProps) {
  const Icon = module.icon;

  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer overflow-hidden rounded-[16px] border border-[rgba(255,255,255,0.1)] p-[28px] transition-all duration-300 ease-in-out ${
        isActive
          ? "bg-[radial-gradient(120%_120%_at_100%_0%,rgba(218,41,28,0.18)_0%,rgba(255,255,255,0.04)_100%)] ring-1 ring-[rgba(255,255,255,0.2)]"
          : "bg-[radial-gradient(120%_120%_at_100%_0%,rgba(218,41,28,0.06)_0%,rgba(255,255,255,0.02)_100%)] hover:bg-[radial-gradient(120%_120%_at_100%_0%,rgba(218,41,28,0.12)_0%,rgba(255,255,255,0.03)_100%)]"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${
              isActive
                ? "bg-brand text-white"
                : "bg-[rgba(255,255,255,0.1)] text-gray-300 group-hover:text-white"
            }`}
          >
            <Icon size={20} />
          </div>
          <h3 className="text-lg font-semibold text-white">{module.title}</h3>
        </div>
        <div className="text-gray-400 transition-colors group-hover:text-gray-300">
          <svg
            className={`h-5 w-5 transition-transform duration-300 ease-in-out ${
              isActive ? "rotate-180 text-white" : ""
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>
      </div>

      {/* Animated Accordion Content */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isActive
            ? "mt-5 grid-rows-[1fr] opacity-100"
            : "mt-0 grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col items-start pr-4 pl-14 text-left">
            <p className="text-[16px] leading-relaxed text-[rgba(255,255,255,0.55)] italic">
              {module.description}
            </p>
            <Button size="sm" className="mt-5">
              Start practicing {module.title}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
