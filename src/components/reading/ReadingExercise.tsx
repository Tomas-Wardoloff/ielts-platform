"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PassagePanel } from "./PassagePanel";
import { QuestionPanel } from "./QuestionPanel";
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

  // answers keyed by question id, each value is a UserAnswer for that question
  const [answers, setAnswers] = useState<Record<string, UserAnswer>>({});

  const currentQuestion = passage.questions[currentIndex];
  const totalQuestions = passage.questions.length;

  const answeredCount = passage.questions.filter((q) => {
    const ans = answers[q.id];
    return ans && Object.keys(ans).length > 0;
  }).length;

  const handleAnswer = useCallback((questionId: string, answer: UserAnswer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  }, []);

  const handleSubmit = () => {
    const results = passage.questions.map((q) => {
      const userAnswer = answers[q.id] ?? {};
      const solution = q.solution as Record<string, unknown>;
      const grade = gradeExercise(userAnswer, solution);
      return { questionId: q.id, ...grade };
    });

    // Store results in sessionStorage for the result page
    sessionStorage.setItem(
      `reading-result-${passage.id}`,
      JSON.stringify({ passage, answers, results })
    );

    router.push(`/reading/${passage.id}/result`);
  };

  const isAnswered = (questionId: string) => {
    const ans = answers[questionId];
    return !!ans && Object.keys(ans).length > 0;
  };

  return (
    <div className="flex h-[calc(100vh-0px)] flex-col">
      {/* Topbar */}
      <div className="flex h-14.25 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-5">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/reading")}
            leftIcon={<MoveLeft size={14} />}
            className="px-2 text-gray-400 hover:text-gray-600"
          >
            Reading
          </Button>
          <span className="text-gray-200">|</span>
          <span className="text-sm font-semibold text-gray-900">
            {passage.title}
          </span>
        </div>
        <Button onClick={handleSubmit} size="sm">
          Submit all answers
        </Button>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col overflow-hidden lg:flex-row">
        <PassagePanel text={passage.text} />
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
    </div>
  );
}
