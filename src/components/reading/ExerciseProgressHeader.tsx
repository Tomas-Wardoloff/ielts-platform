"use client";

interface Props {
  questions: { id: string }[];
  currentIndex: number;
  totalQuestions: number;
  isAnswered: (id: string) => boolean;
}

export function ExerciseProgressHeader({
  questions,
  currentIndex,
  totalQuestions,
  isAnswered,
}: Props) {
  return (
    <div className="shrink-0 border-b border-gray-200 bg-white px-5 pt-4 pb-3">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs text-gray-400">
          Question {currentIndex + 1} of {totalQuestions}
        </span>
        <div className="flex gap-1.5">
          {questions.map((q, i) => (
            <div
              key={q.id}
              className={`h-2 w-2 rounded-full transition-colors ${
                i === currentIndex
                  ? "bg-brand"
                  : isAnswered(q.id)
                    ? "bg-red-200"
                    : "bg-gray-200"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
