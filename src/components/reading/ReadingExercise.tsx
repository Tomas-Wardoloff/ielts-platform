"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PassagePanel } from "./PassagePanel";
import { QuestionPanel } from "./QuestionPanel";
import { ConfirmModal } from "../ui/ConfirmationModal";
import { gradeExercise } from "@/lib/grading";
import { MoveLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import type { ReadingPassageWithQuestions, UserAnswer } from "@/types/exercise";

interface Props {
  passage: ReadingPassageWithQuestions;
}

export function ReadingExercise({ passage }: Props) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const totalQuestions = passage.questions.length;

  const isAnswered = (questionId: string) => {
    const q = passage.questions.find((q) => q.id === questionId);
    if (!q) return false;
    
    const ans = answers[questionId];
    if (!ans) return false;

    const solution = q.solution as Record<string, unknown>;

    if ("answers" in solution && Array.isArray(solution.answers)) {
      return Array.isArray(ans.answers) && ans.answers.length === solution.answers.length;
    }

    if ("answer" in solution && typeof solution.answer === "string") {
      return typeof ans.answer === "string" && ans.answer.trim().length > 0;
    }

    const expectedKeys = Object.keys(solution);
    if (expectedKeys.length === 0) return true;
    
    return expectedKeys.every((key) => {
      const val = ans[key];
      if (Array.isArray(val)) return val.length > 0;
      return typeof val === "string" && val.trim().length > 0;
    });
  };

  const answeredCount = passage.questions.filter((q) => isAnswered(q.id)).length;
  const unansweredCount = totalQuestions - answeredCount;

  const handleAnswer = useCallback((questionId: string, answer: UserAnswer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  }, []);

  // Called when user clicks "Submit all answers"
  const handleSubmitClick = () => {
    if (unansweredCount > 0) {
      setShowConfirm(true);
    } else {
      submitAnswers();
    }
  };

  // The actual submission logic
  const submitAnswers = async () => {
    setSubmitting(true);
    setShowConfirm(false);

    const results = passage.questions.map((q) => {
      const userAnswer = answers[q.id] ?? {};
      const solution = q.solution as Record<string, unknown>;
      const grade = gradeExercise(userAnswer, solution);
      return { questionId: q.id, ...grade };
    });

    // Save each attempt to the DB
    await Promise.allSettled(
      passage.questions.map((q, i) =>
        fetch("/api/attempts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            exerciseId: q.id,
            userAnswer: answers[q.id] ?? {},
            score: results[i].score,
          }),
        })
      )
    );

    // Store results in sessionStorage for the result page
    sessionStorage.setItem(
      `reading-result-${passage.id}`,
      JSON.stringify({ passage, answers, results })
    );

    router.push(`/reading/${passage.id}/result`);
  };

  return (
    <div className="flex h-[calc(100vh-0px)] flex-col">
      {/* Topbar */}
      <div className="flex h-14.25 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-5">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.push("/reading")}
          leftIcon={<MoveLeft size={14} />}
          className="px-2 text-gray-400 hover:text-gray-600"
        >
          Reading
        </Button>
        <Button onClick={handleSubmitClick} size="sm" disabled={submitting}>
          {submitting ? "Submitting..." : "Submit all answers"}
        </Button>
      </div>

      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        <PassagePanel passage={passage} />
        <QuestionPanel
          questions={passage.questions}
          currentIndex={currentIndex}
          answers={answers}
          isAnswered={isAnswered}
          onAnswer={handleAnswer}
          onNavigate={setCurrentIndex}
          answeredCount={answeredCount}
          totalQuestions={totalQuestions}
        />
      </div>

      <ConfirmModal
        isOpen={showConfirm}
        title="Unanswered questions"
        description="Some questions have not been answered. Unanswered questions will be marked as incorrect."
        confirmLabel="Submit anyway"
        cancelLabel="Go back"
        onConfirm={submitAnswers}
        onCancel={() => setShowConfirm(false)}
      />
    </div>
  );
}
