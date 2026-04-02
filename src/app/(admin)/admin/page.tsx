import { db } from "@/lib/db";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/Button";

const MODULE_LABELS: Record<string, string> = {
  READING: "Reading",
  LISTENING: "Listening",
  WRITING: "Writing",
  SPEAKING: "Speaking",
};

const TYPE_LABELS: Record<string, string> = {
  MULTIPLE_CHOICE: "Multiple Choice",
  TRUE_FALSE_NG: "True / False / Not Given",
  YES_NO_NG: "Yes / No / Not Given",
  MATCHING_HEADINGS: "Matching Headings",
  MATCHING_INFORMATION: "Matching Information",
  MATCHING_FEATURES: "Matching Features",
  MATCHING_SENTENCE_ENDINGS: "Matching Sentence Endings",
  SENTENCE_COMPLETION: "Sentence Completion",
  NOTE_TABLE_FLOWCHART_SUMMARY: "Note / Table / Flowchart / Summary",
  DIAGRAM_LABEL: "Diagram Label Completion",
  SHORT_ANSWER: "Short Answer Questions",
  OPEN_WRITING: "Open Writing",
  OPEN_SPEAKING: "Open Speaking",
};

export default async function AdminPage() {
  const [exercisesByType, totalExercises] = await Promise.all([
    // Exercises grouped by type
    db.exercise.groupBy({
      by: ["type"],
      _count: { _all: true },
      orderBy: { _count: { type: "desc" } },
    }),

    // Total exercises
    db.exercise.count(),
  ]);

  // Exercises grouped by module
  const exercisesByModule = await db.exercise.groupBy({
    by: ["module"],
    _count: { _all: true },
  });

  const moduleMap = Object.fromEntries(
    exercisesByModule.map((m) => [m.module, m._count._all])
  );

  return (
    <div className="w-full px-4 py-6 md:px-8 md:py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Overview
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Content and platform status.
          </p>
        </div>
        <Button href="/admin/passages/new" leftIcon={<Plus size={15} />}>
          New passage
        </Button>
      </div>

      {/* Exercises summary */}
      <div className="mt-8 flex flex-col gap-8">
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-xs font-semibold tracking-widest text-gray-400 uppercase">
              Exercises by module
            </h2>
            <span className="text-xs text-gray-400">
              {totalExercises} total
            </span>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {["READING", "LISTENING", "WRITING", "SPEAKING"].map((module) => (
              <div
                key={module}
                className="rounded-xl border border-gray-200 bg-white px-5 py-4"
              >
                <p className="mb-1 text-xs font-medium text-gray-500">
                  {MODULE_LABELS[module]}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {moduleMap[module] ?? 0}
                </p>
                <p className="mt-0.5 text-xs text-gray-400">
                  {(moduleMap[module] ?? 0) === 1 ? "exercise" : "exercises"}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Exercises by type */}
        <div>
          <h2 className="mb-3 text-xs font-semibold tracking-widest text-gray-400 uppercase">
            Exercises by question type
          </h2>
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
            {exercisesByType.length === 0 ? (
              <div className="px-5 py-10 text-center">
                <p className="text-sm text-gray-400">No exercises yet</p>
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 text-xs tracking-wide text-gray-400 uppercase">
                    <th className="px-5 py-3 text-left font-medium">
                      Question type
                    </th>
                    <th className="px-5 py-3 text-right font-medium">Count</th>
                    <th className="px-5 py-3 text-right font-medium">
                      % of total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {exercisesByType.map((row) => {
                    const pct =
                      totalExercises > 0
                        ? Math.round((row._count._all / totalExercises) * 100)
                        : 0;
                    return (
                      <tr
                        key={row.type}
                        className="transition-colors hover:bg-gray-50"
                      >
                        <td className="px-5 py-3 text-gray-700">
                          {TYPE_LABELS[row.type] ?? row.type}
                        </td>
                        <td className="px-5 py-3 text-right font-medium text-gray-900">
                          {row._count._all}
                        </td>
                        <td className="px-5 py-3 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-100">
                              <div
                                className="bg-brand h-full rounded-full"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="w-8 text-xs text-gray-400">
                              {pct}%
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
