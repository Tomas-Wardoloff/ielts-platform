"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle, MinusCircle, MoveLeft } from "lucide-react";
import type { ReadingPassageWithQuestions, UserAnswer } from "@/types/exercise";
import type { GradeResult } from "@/types/exercise";

interface QuestionResult extends GradeResult {
  questionId: string;
}

interface ResultData {
  passage: ReadingPassageWithQuestions;
  answers: Record<string, UserAnswer>;
  results: QuestionResult[];
}

const TYPE_LABELS: Record<string, string> = {
  TRUE_FALSE_NG: "True / False / Not Given",
  YES_NO_NG: "Yes / No / Not Given",
  MULTIPLE_CHOICE: "Multiple Choice",
  MATCHING_HEADINGS: "Matching Headings",
  MATCHING_INFORMATION: "Matching Information",
  MATCHING_FEATURES: "Matching Features",
  MATCHING_SENTENCE_ENDINGS: "Matching Sentence Endings",
  SENTENCE_COMPLETION: "Sentence Completion",
  NOTE_TABLE_FLOWCHART_SUMMARY: "Note / Table / Flowchart / Summary",
  DIAGRAM_LABEL: "Diagram Label Completion",
  SHORT_ANSWER: "Short Answer Questions",
};

function estimateBand(correct: number, total: number): string {
  // Normalize to a score out of 40 (official IELTS scale)
  const outOf40 = total > 0 ? Math.round((correct / total) * 40) : 0;

  if (outOf40 >= 39) return "9.0";
  if (outOf40 >= 37) return "8.5";
  if (outOf40 >= 35) return "8.0";
  if (outOf40 >= 33) return "7.5";
  if (outOf40 >= 30) return "7.0";
  if (outOf40 >= 27) return "6.5";
  if (outOf40 >= 23) return "6.0";
  if (outOf40 >= 19) return "5.5";
  if (outOf40 >= 15) return "5.0";
  if (outOf40 >= 13) return "4.5";
  return "4.0";
}

function scoreColor(score: number) {
  if (score >= 0.75) return "text-green-600";
  if (score >= 0.5) return "text-amber-600";
  return "text-brand";
}

export function ResultPageClient({ passageId }: { passageId: string }) {
  const router = useRouter();
  const [data, setData] = useState<ResultData | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem(`reading-result-${passageId}`);
    if (!raw) {
      router.replace(`/reading/${passageId}`);
      return;
    }
    setData(JSON.parse(raw));
  }, [passageId, router]);

  if (!data) return null;

  const { passage, answers, results } = data;

  const totalCorrect = results.reduce((sum, r) => sum + r.correct, 0);
  const totalQuestions = results.reduce((sum, r) => sum + r.total, 0);
  const overallScore = totalQuestions > 0 ? totalCorrect / totalQuestions : 0; // revisar
  const band = estimateBand(totalCorrect, totalQuestions);
  const accuracy = Math.round(overallScore * 100);

  return (
    <div className="max-w-3xl px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/reading"
          className="mb-3 flex items-center gap-1.5 text-xs text-gray-400 transition-colors hover:text-gray-600"
        >
          <MoveLeft size={12} />
          Reading
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          {passage.title}
        </h1>
        <p className="mt-1 text-sm text-gray-400">Results</p>
      </div>

      {/* Summary stats */}
      <div className="mb-8 grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-gray-200 bg-white px-5 py-4">
          <p className="mb-1 text-xs text-gray-400">Score</p>
          <p className={`text-2xl font-bold ${scoreColor(overallScore)}`}>
            {totalCorrect} / {totalQuestions}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white px-5 py-4">
          <p className="mb-1 text-xs text-gray-400">Estimated band</p>
          <p className={`text-2xl font-bold ${scoreColor(overallScore)}`}>
            {band}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white px-5 py-4">
          <p className="mb-1 text-xs text-gray-400">Accuracy</p>
          <p className={`text-2xl font-bold ${scoreColor(overallScore)}`}>
            {accuracy}%
          </p>
        </div>
      </div>

      {/* Question breakdown */}
      <p className="mb-4 text-xs font-semibold tracking-widest text-gray-500 uppercase">
        Question breakdown
      </p>

      <div className="space-y-4">
        {passage.questions.map((question) => {
          const result = results.find((r) => r.questionId === question.id);
          const userAnswer = answers[question.id] ?? {};
          const solution = question.solution as Record<string, unknown>;

          if (!result) return null;

          const qScore = result.total > 0 ? result.correct / result.total : 0;

          return (
            <div
              key={question.id}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >
              {/* Question header */}
              <div className="mb-3 flex items-center justify-between">
                <span className="text-brand text-[10px] font-semibold tracking-widest uppercase">
                  {TYPE_LABELS[question.type] ?? question.type}
                </span>
                <span className={`text-xs font-semibold ${scoreColor(qScore)}`}>
                  {result.correct} / {result.total} correct
                </span>
              </div>

              {/* Per-item breakdown */}
              <QuestionBreakdown
                question={question}
                userAnswer={userAnswer}
                solution={solution}
                breakdown={result.breakdown}
              />
            </div>
          );
        })}
      </div>

      {/* Actions */}
      <div className="mt-8 flex gap-3 pb-8">
        <button
          onClick={() => router.push(`/reading/${passageId}`)}
          className="bg-brand hover:bg-brand-dark rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-colors"
        >
          Try again
        </button>
        <Link
          href="/reading"
          className="rounded-lg border border-gray-200 px-5 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50"
        >
          Back to Reading
        </Link>
      </div>
    </div>
  );
}

// ─── Per-question breakdown renderer ──────────────────────────────────────────

interface BreakdownProps {
  question: ReadingPassageWithQuestions["questions"][number];
  userAnswer: UserAnswer;
  solution: Record<string, unknown>;
  breakdown: Record<string, boolean>;
}

function QuestionBreakdown({
  question,
  userAnswer,
  solution,
  breakdown,
}: BreakdownProps) {
  switch (question.type) {
    case "TRUE_FALSE_NG":
    case "YES_NO_NG":
      return (
        <StatementBreakdown
          content={
            question.content as { statements: { id: string; text: string }[] }
          }
          userAnswer={userAnswer}
          solution={solution}
          breakdown={breakdown}
        />
      );

    case "MULTIPLE_CHOICE": {
      const content = question.content as {
        question: string;
        options: { id: string; text: string }[];
      };
      const given = userAnswer.answer as string;
      const correct = (solution as { answer: string }).answer;
      const isCorrect = breakdown.answer;
      const givenOption = content.options.find((o) => o.id === given);
      const correctOption = content.options.find((o) => o.id === correct);

      return (
        <div className="space-y-2">
          <p className="mb-3 text-sm text-gray-700">{content.question}</p>
          <ItemRow
            isCorrect={isCorrect}
            isEmpty={!given}
            label={
              given
                ? `${given}. ${givenOption?.text ?? given}`
                : "No answer given"
            }
          />
          {!isCorrect && correctOption && (
            <CorrectAnswer
              label={`${correctOption.id}. ${correctOption.text}`}
            />
          )}
        </div>
      );
    }

    case "MATCHING_HEADINGS": {
      const content = question.content as {
        paragraphs: { id: string; text: string }[];
        headings: { id: string; text: string }[];
      };
      return (
        <div className="space-y-2">
          {content.paragraphs.map((para) => {
            const given = userAnswer[para.id] as string;
            const correct = solution[para.id] as string;
            const isCorrect = breakdown[para.id];
            const givenHeading = content.headings.find((h) => h.id === given);
            const correctHeading = content.headings.find(
              (h) => h.id === correct
            );

            return (
              <div key={para.id}>
                <p className="mb-1 text-xs text-gray-400">
                  Paragraph {para.id}
                </p>
                <ItemRow
                  isCorrect={isCorrect}
                  isEmpty={!given}
                  label={
                    given
                      ? `${given}. ${givenHeading?.text ?? given}`
                      : "No answer given"
                  }
                />
                {!isCorrect && correctHeading && (
                  <CorrectAnswer
                    label={`${correctHeading.id}. ${correctHeading.text}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      );
    }

    case "MATCHING_INFORMATION":
    case "MATCHING_FEATURES": {
      const content = question.content as {
        statements: { id: string; text: string }[];
      };
      return (
        <div className="space-y-2">
          {content.statements.map((stmt) => {
            const given = userAnswer[stmt.id] as string;
            const correct = solution[stmt.id] as string;
            const isCorrect = breakdown[stmt.id];

            return (
              <div key={stmt.id}>
                <ItemRow
                  isCorrect={isCorrect}
                  isEmpty={!given}
                  label={stmt.text}
                  badge={given || "—"}
                />
                {!isCorrect && <CorrectAnswer label={`Correct: ${correct}`} />}
              </div>
            );
          })}
        </div>
      );
    }

    case "MATCHING_SENTENCE_ENDINGS": {
      const content = question.content as {
        beginnings: { id: string; text: string }[];
        endings: { id: string; text: string }[];
      };
      return (
        <div className="space-y-2">
          {content.beginnings.map((b) => {
            const given = userAnswer[b.id] as string;
            const correct = solution[b.id] as string;
            const isCorrect = breakdown[b.id];
            const givenEnding = content.endings.find((e) => e.id === given);
            const correctEnding = content.endings.find((e) => e.id === correct);

            return (
              <div key={b.id}>
                <ItemRow
                  isCorrect={isCorrect}
                  isEmpty={!given}
                  label={`${b.text} ${givenEnding ? `→ ${given}. ${givenEnding.text}` : "→ No answer given"}`}
                />
                {!isCorrect && correctEnding && (
                  <CorrectAnswer
                    label={`${correctEnding.id}. ${correctEnding.text}`}
                  />
                )}
              </div>
            );
          })}
        </div>
      );
    }

    case "SENTENCE_COMPLETION":
    case "NOTE_TABLE_FLOWCHART_SUMMARY": {
      const sol = solution as Record<string, { answers: string[] }>;
      return (
        <div className="space-y-2">
          {Object.entries(sol).map(([blankId, expected]) => {
            const given = userAnswer[blankId] as string;
            const isCorrect = breakdown[blankId];

            return (
              <div key={blankId}>
                <ItemRow
                  isCorrect={isCorrect}
                  isEmpty={!given}
                  label={given ? `"${given}"` : "No answer given"}
                  badge={blankId}
                />
                {!isCorrect && (
                  <CorrectAnswer label={expected.answers.join(" / ")} />
                )}
              </div>
            );
          })}
        </div>
      );
    }

    case "DIAGRAM_LABEL": {
      const sol = solution as Record<string, { answers: string[] }>;
      const content = question.content as {
        labels: { id: string; hint?: string }[];
      };
      return (
        <div className="space-y-2">
          {content.labels.map((label) => {
            const given = userAnswer[label.id] as string;
            const expected = sol[label.id];
            const isCorrect = breakdown[label.id];

            return (
              <div key={label.id}>
                <ItemRow
                  isCorrect={isCorrect}
                  isEmpty={!given}
                  label={
                    label.hint
                      ? `${label.hint}: ${given || "No answer given"}`
                      : given || "No answer given"
                  }
                  badge={label.id}
                />
                {!isCorrect && expected && (
                  <CorrectAnswer label={expected.answers.join(" / ")} />
                )}
              </div>
            );
          })}
        </div>
      );
    }

    case "SHORT_ANSWER": {
      const content = question.content as {
        questions: { id: string; text: string }[];
      };
      const sol = solution as Record<string, { answers: string[] }>;
      return (
        <div className="space-y-2">
          {content.questions.map((q) => {
            const given = userAnswer[q.id] as string;
            const expected = sol[q.id];
            const isCorrect = breakdown[q.id];

            return (
              <div key={q.id}>
                <p className="mb-1 text-xs text-gray-500">{q.text}</p>
                <ItemRow
                  isCorrect={isCorrect}
                  isEmpty={!given}
                  label={given ? `"${given}"` : "No answer given"}
                />
                {!isCorrect && expected && (
                  <CorrectAnswer label={expected.answers.join(" / ")} />
                )}
              </div>
            );
          })}
        </div>
      );
    }

    default:
      return (
        <p className="text-xs text-gray-400 italic">
          Breakdown not available for this question type.
        </p>
      );
  }
}

// ─── Shared primitives ────────────────────────────────────────────────────────

function StatementBreakdown({
  content,
  userAnswer,
  solution,
  breakdown,
}: {
  content: { statements: { id: string; text: string }[] };
  userAnswer: UserAnswer;
  solution: Record<string, unknown>;
  breakdown: Record<string, boolean>;
}) {
  return (
    <div className="space-y-2">
      {content.statements.map((stmt) => {
        const given = userAnswer[stmt.id] as string;
        const correct = solution[stmt.id] as string;
        const isCorrect = breakdown[stmt.id];

        return (
          <div key={stmt.id}>
            <ItemRow
              isCorrect={isCorrect}
              isEmpty={!given}
              label={stmt.text}
              badge={given || "—"}
            />
            {!isCorrect && <CorrectAnswer label={`Correct: ${correct}`} />}
          </div>
        );
      })}
    </div>
  );
}

function ItemRow({
  isCorrect,
  isEmpty,
  label,
  badge,
}: {
  isCorrect: boolean;
  isEmpty: boolean;
  label: string;
  badge?: string;
}) {
  const bg = isEmpty ? "bg-gray-50" : isCorrect ? "bg-green-50" : "bg-red-50";

  const Icon = isEmpty ? MinusCircle : isCorrect ? CheckCircle : XCircle;

  const iconColor = isEmpty
    ? "text-gray-300"
    : isCorrect
      ? "text-green-500"
      : "text-brand";

  return (
    <div className={`flex items-center gap-2.5 rounded-lg px-3 py-2 ${bg}`}>
      <Icon size={15} className={`${iconColor} shrink-0`} />
      <span className="flex-1 text-sm leading-relaxed text-gray-700">
        {label}
      </span>
      {badge && (
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${
            isEmpty
              ? "bg-gray-100 text-gray-400"
              : isCorrect
                ? "bg-green-100 text-green-700"
                : "text-brand bg-red-100"
          }`}
        >
          {badge}
        </span>
      )}
    </div>
  );
}

function CorrectAnswer({ label }: { label: string }) {
  return (
    <p className="mt-1 ml-7 text-xs text-gray-400">
      Correct answer:{" "}
      <span className="font-medium text-green-600">{label}</span>
    </p>
  );
}
