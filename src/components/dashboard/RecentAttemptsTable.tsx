import Link from "next/link";
import { formatDistanceToNow } from "date-fns";

type PreviousAttempt = {
  id: string;
  module: string;
  exerciseTitle: string;
  score: number | null;
  completedAt: Date;
};

interface Props {
  attempts: PreviousAttempt[];
}

function ScoreBadge({ score }: { score: number }) {
  const band = (score * 9).toFixed(1);
  const color =
    score >= 0.8
      ? "text-green-700 bg-green-50 border-green-200"
      : score >= 0.6
        ? "text-amber-700 bg-amber-50 border-amber-200"
        : "text-red-700 bg-red-50 border-red-200";

  return (
    <span
      className={`rounded-full border px-2 py-1 text-xs font-medium ${color}`}
    >
      Band {band}
    </span>
  );
}

export function RecentAttemptsTable({ attempts }: Props) {
  if (!attempts || attempts.length === 0) return null;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-serif text-2xl text-gray-900 md:text-3xl">
          Recent Attempts
        </h2>
        <Link
          href="/reading"
          className="text-brand text-sm font-medium hover:underline"
        >
          View all history &rarr;
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50 text-xs tracking-wide text-gray-400 uppercase">
              <th className="px-5 py-3 text-left font-medium">Exercise</th>
              <th className="px-4 py-3 text-center font-medium">Module</th>
              <th className="px-4 py-3 text-center font-medium">Score</th>
              <th className="px-4 py-3 text-right font-medium">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {attempts.map((attempt) => (
              <tr
                key={attempt.id}
                className="group transition-colors hover:bg-gray-50"
              >
                <td className="px-5 py-4">
                  <p className="group-hover:text-brand font-medium text-gray-900 transition-colors">
                    {attempt.exerciseTitle}
                  </p>
                </td>
                <td className="px-4 py-4 text-center">
                  <span className="rounded-full border border-gray-200 bg-gray-100 px-2.5 py-1 text-[11px] font-medium text-gray-600">
                    {attempt.module}
                  </span>
                </td>
                <td className="px-4 py-4 text-center">
                  {attempt.score !== null ? (
                    <ScoreBadge score={attempt.score} />
                  ) : (
                    <span className="text-xs text-gray-300">Pending</span>
                  )}
                </td>
                <td className="px-4 py-4 text-right whitespace-nowrap text-gray-500">
                  {formatDistanceToNow(new Date(attempt.completedAt), {
                    addSuffix: true,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
