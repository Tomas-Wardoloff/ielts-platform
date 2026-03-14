import { Headphones, BookOpen, PenTool, Mic } from "lucide-react";
import { ModuleCard } from "./ModuleCard";

export const modulesData = [
  {
    name: "Reading",
    description: "Academic passages with the 13 official question types.",
    href: "/reading",
    status: "available" as const,
    icon: <BookOpen size={22} className="text-brand" />,
  },
  {
    name: "Listening",
    description: "Audio exercises with transcription and error analysis.",
    href: "/listening",
    status: "available" as const,
    icon: <Headphones size={22} className="text-brand" />,
  },
  {
    name: "Writing",
    description: "AI feedback with band score per IELTS criterion.",
    href: "/writing",
    status: "available" as const,
    icon: <PenTool size={22} className="text-brand" />,
  },
  {
    name: "Speaking",
    description: "Record responses and get fluency and vocabulary feedback.",
    href: "/speaking",
    status: "coming-soon" as const,
    icon: <Mic size={22} className="text-brand" />,
  },
];

interface Props {
  layout?: "grid" | "row";
}

export function PracticeModules({ layout = "grid" }: Props) {
  const isRow = layout === "row";

  return (
    <div className="mb-14">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl text-gray-900 md:text-3xl">
          Practice Modules
        </h2>
      </div>

      <div
        className={`grid gap-4 ${
          isRow ? "grid-cols-2 lg:grid-cols-4" : "gap-5 md:grid-cols-2"
        }`}
      >
        {modulesData.map((mod) => (
          <ModuleCard
            key={mod.name}
            name={mod.name}
            description={mod.description}
            href={mod.href}
            status={mod.status}
            icon={mod.icon}
            isRow={isRow}
          />
        ))}
      </div>
    </div>
  );
}
