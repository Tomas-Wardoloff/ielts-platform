import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

const modules = [
  {
    name: "Reading",
    description: "Academic passages with all official question types.",
    href: "/reading",
    status: "available" as const,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="3" y="4" width="16" height="3" rx="1.5" fill="#DA291C" />
        <rect
          x="3"
          y="10"
          width="12"
          height="3"
          rx="1.5"
          fill="#DA291C"
          opacity=".5"
        />
        <rect
          x="3"
          y="16"
          width="13"
          height="3"
          rx="1.5"
          fill="#DA291C"
          opacity=".25"
        />
      </svg>
    ),
  },
  {
    name: "Listening",
    description: "Audio exercises with transcription and error analysis.",
    href: "/listening",
    status: "available" as const,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="4" fill="#DA291C" opacity=".8" />
        <path
          d="M5 11a6 6 0 0012 0"
          stroke="#DA291C"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          opacity=".4"
        />
        <line
          x1="11"
          y1="17"
          x2="11"
          y2="20"
          stroke="#DA291C"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity=".35"
        />
      </svg>
    ),
  },
  {
    name: "Writing",
    description: "AI feedback with band score per IELTS criterion.",
    href: "/writing",
    status: "available" as const,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M4 17l9-9 3 3-9 9H4v-3z" fill="#DA291C" opacity=".8" />
        <path d="M13 8l2-2a2 2 0 012.8 2.8L16 10.8 13 8z" fill="#DA291C" />
      </svg>
    ),
  },
  {
    name: "Speaking",
    description: "Record responses and get fluency and vocabulary feedback.",
    href: "/speaking",
    status: "coming-soon" as const,
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect
          x="8"
          y="2"
          width="6"
          height="10"
          rx="3"
          fill="#DA291C"
          opacity=".8"
        />
        <path
          d="M5 11a6 6 0 0012 0"
          stroke="#DA291C"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          opacity=".45"
        />
        <line
          x1="11"
          y1="17"
          x2="11"
          y2="20"
          stroke="#DA291C"
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity=".4"
        />
      </svg>
    ),
  },
];

const stats = [
  { label: "Exercises completed", value: "0" },
  { label: "Avg. band score", value: "—" },
  { label: "Study streak", value: "0 days" },
  { label: "Target band", value: "—" },
];

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Good to see you, {user.firstName ?? "there"} 👋
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Pick a module to start practicing, or review your progress below.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-200 bg-white px-4 py-4"
          >
            <p className="mb-1 text-xs text-gray-400">{stat.label}</p>
            <p className="text-xl font-semibold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mb-4">
        <h2 className="text-sm font-semibold tracking-wide text-gray-900 uppercase">
          Modules
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {modules.map((mod) => (
          <a
            key={mod.name}
            href={mod.status === "available" ? mod.href : undefined}
            className={`group rounded-xl border bg-white p-5 transition-all ${mod.status === "available" ? "hover:border-brand cursor-pointer border-gray-200 hover:shadow-sm" : "cursor-not-allowed border-gray-100 opacity-60"}`}
          >
            <div className="mb-3 flex items-start justify-between">
              <div className="bg-brand-light flex h-10 w-10 items-center justify-center rounded-lg">
                {mod.icon}
              </div>
              {mod.status === "coming-soon" && (
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-400">
                  Coming soon
                </span>
              )}
            </div>
            <h3 className="mb-1 text-sm font-semibold text-gray-900">
              {mod.name}
            </h3>
            <p className="text-xs leading-relaxed text-gray-500">
              {mod.description}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
