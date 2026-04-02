"use client";

import type {
  ReadingPassageWithQuestions,
  UserAnswer,
  NoteTableFlowchartSummaryContent,
  ContentSegment,
} from "@/types/exercise";

type Question = ReadingPassageWithQuestions["questions"][number];

interface Props {
  question: Question;
  userAnswer: UserAnswer;
  onAnswer: (answer: UserAnswer) => void;
}

export function NoteTableFlowchart({ question, userAnswer, onAnswer }: Props) {
  const content = question.content as NoteTableFlowchartSummaryContent;

  const handleChange = (blankId: string, value: string) => {
    onAnswer({ ...userAnswer, [blankId]: value });
  };

  const renderSegments = (segments: ContentSegment[]) =>
    segments.map((seg, i) => {
      if (seg.type === "text") {
        return (
          <span key={i} className="text-sm text-gray-700">
            {seg.value}
          </span>
        );
      }
      return (
        <input
          key={i}
          type="text"
          value={(userAnswer[seg.id] as string) ?? ""}
          onChange={(e) => handleChange(seg.id, e.target.value)}
          placeholder="..."
          className="focus:border-brand mx-1 inline-block w-28 border-b-2 border-gray-300 bg-transparent text-center text-sm transition-colors outline-none"
        />
      );
    });

  if (content.format === "table" && content.rows) {
    return (
      <div className="overflow-x-auto">
        {content.title && (
          <p className="mb-3 text-sm font-semibold text-gray-700">
            {content.title}
          </p>
        )}
        <table className="w-full overflow-hidden rounded-lg border border-gray-200 text-sm">
          {content.columnHeaders && (
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                {content.columnHeaders.map((h, i) => (
                  <th
                    key={i}
                    className="px-3 py-2 text-left text-xs font-semibold text-gray-500"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
          )}
          <tbody className="divide-y divide-gray-100">
            {content.rows.map((row, i) => (
              <tr key={i}>
                {row.cells.map((cell, j) => (
                  <td key={j} className="px-3 py-2">
                    {Array.isArray(cell) ? (
                      renderSegments(cell)
                    ) : (
                      <span className="text-gray-700">{cell}</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (content.format === "flowchart" && content.steps) {
    return (
      <div className="space-y-2">
        {content.title && (
          <p className="mb-3 text-sm font-semibold text-gray-700">
            {content.title}
          </p>
        )}
        {content.steps.map((step, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="flex w-full flex-wrap items-center gap-y-1 rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5">
              {renderSegments(step)}
            </div>
            {i < content.steps!.length - 1 && (
              <span className="text-lg text-gray-300">↓</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Note or summary — free segments
  return (
    <div className="flex flex-wrap items-center gap-y-1 rounded-lg bg-gray-50 p-4 leading-loose">
      {content.title && (
        <p className="mb-2 w-full text-sm font-semibold text-gray-700">
          {content.title}
        </p>
      )}
      {content.segments && renderSegments(content.segments)}
    </div>
  );
}
