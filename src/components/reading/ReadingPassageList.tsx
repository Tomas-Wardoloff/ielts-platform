"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { BookOpen } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ModuleInfo } from "@/components/shared/ModuleInfo";
import { ModuleHeader } from "@/components/shared/ModuleHeader";
import { scoreToBand } from "@/lib/utils";

type PassageProgress = {
  id: string;
  title: string;
  questionCount: number;
  attempted: boolean;
  lastScore: number | null;
  lastAttemptAt: Date | null;
};

const headerDescription =
  "Practice academic reading passages with all official IELTS question types. Each passage mirrors the real exam format.";

export function ReadingPassageList({
  passages,
}: {
  passages: PassageProgress[];
}) {
  const [search, setSearch] = useState("");
  const [attemptedFilter, setAttemptedFilter] = useState<string>("ALL");

  const filtered = useMemo(() => {
    return passages.filter((p) => {
      const matchSearch = p.title.toLowerCase().includes(search.toLowerCase());
      const matchAttempted =
        attemptedFilter === "ALL" ||
        (attemptedFilter === "ATTEMPTED" && p.attempted) ||
        (attemptedFilter === "NOT_ATTEMPTED" && !p.attempted);
      return matchSearch && matchAttempted;
    });
  }, [passages, search, attemptedFilter]);

  return (
    <div className="w-full px-4 py-6 md:px-8 md:py-8">
      <ModuleHeader
        title="Reading"
        description={headerDescription}
        icon={<BookOpen className="text-brand h-6 w-6" />}
      />

      <ModuleInfo
        durationMinutes={60}
        totalQuestions={40}
        sections="3 passages"
        questionTypesCount={11}
        sectionBreakdown={[
          { label: "Section 1", time: "~15 min" },
          { label: "Section 2", time: "~20–23 min" },
          { label: "Section 3", time: "~20–23 min" },
        ]}
      />

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search passages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="focus:border-brand min-w-48 flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm transition-colors outline-none"
        />
        <div className="flex w-full gap-2 sm:w-auto">
          <select
            value={attemptedFilter}
            onChange={(e) => setAttemptedFilter(e.target.value)}
            className="focus:border-brand flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm transition-colors outline-none sm:flex-initial"
          >
            <option value="ALL">All passages</option>
            <option value="ATTEMPTED">Attempted</option>
            <option value="NOT_ATTEMPTED">Not attempted</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full min-w-200 text-sm lg:min-w-full">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50 text-xs tracking-wide text-gray-400 uppercase">
              <th className="px-5 py-3 text-left font-medium">Passage</th>
              <th className="w-24 px-3 py-3 text-right font-medium">
                Questions
              </th>
              <th className="w-28 px-3 py-3 text-right font-medium">Status</th>
              <th className="w-28 px-3 py-3 text-right font-medium">
                Last score
              </th>
              <th className="w-36 px-5 py-3 text-right font-medium">
                Last Practice
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-10 text-center text-sm text-gray-400"
                >
                  No passages match your filters.
                </td>
              </tr>
            ) : (
              filtered.map((passage) => {
                const scoreColor =
                  passage.lastScore !== null
                    ? passage.lastScore >= 0.8
                      ? "text-green-600"
                      : passage.lastScore >= 0.6
                        ? "text-amber-600"
                        : "text-red-600"
                    : "text-gray-300";

                return (
                  <tr
                    key={passage.id}
                    className="group transition-colors hover:bg-gray-50/50"
                  >
                    <td className="truncate px-5 py-4">
                      <Link
                        href={`/reading/${passage.id}`}
                        className="group-hover:text-brand font-medium text-gray-900 transition-colors"
                      >
                        {passage.title}
                      </Link>
                    </td>
                    <td className="px-3 py-4 text-right font-medium whitespace-nowrap text-gray-500">
                      {passage.questionCount}
                    </td>
                    <td className="px-3 py-4 text-right whitespace-nowrap">
                      {passage.attempted ? (
                        <span className="font-medium text-green-600">
                          Completed
                        </span>
                      ) : (
                        <span className="text-gray-400">Available</span>
                      )}
                    </td>
                    <td
                      className={`px-3 py-4 text-right font-bold whitespace-nowrap ${scoreColor}`}
                    >
                      {passage.lastScore !== null
                        ? `Band ${scoreToBand(passage.lastScore)}`
                        : "—"}
                    </td>
                    <td className="px-5 py-4 text-right whitespace-nowrap text-gray-400">
                      {passage.lastAttemptAt
                        ? formatDistanceToNow(new Date(passage.lastAttemptAt), {
                            addSuffix: true,
                          })
                        : "—"}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {filtered.length > 0 && (
        <p className="mt-3 text-right text-xs text-gray-400">
          Showing {filtered.length} of {passages.length} passage
          {passages.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
