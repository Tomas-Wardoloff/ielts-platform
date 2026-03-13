import type {
  GradeResult,
  UserAnswer,
  CompletionSolution,
} from "@/types/exercise";

export function gradeExercise(
  userAnswer: UserAnswer,
  solution: Record<string, unknown>
): GradeResult {
  let correct = 0;
  let total = 0;
  const breakdown: Record<string, boolean> = {};

  // Multiple choice multi-select — solution has `answers` array at root
  if ("answers" in solution && Array.isArray(solution.answers)) {
    const expected = (solution.answers as string[]).map((a) => a.toUpperCase());
    const given = Array.isArray(userAnswer.answers)
      ? (userAnswer.answers as string[]).map((a) => a.toUpperCase())
      : [];
    const isCorrect =
      expected.length === given.length &&
      expected.every((a) => given.includes(a));
    breakdown["answers"] = isCorrect;
    return {
      correct: isCorrect ? 1 : 0,
      total: 1,
      score: isCorrect ? 1 : 0,
      breakdown,
    };
  }

  // Multiple choice single-select — solution has `answer` string at root
  if ("answer" in solution && typeof solution.answer === "string") {
    const isCorrect =
      String(userAnswer.answer ?? "").toUpperCase() ===
      solution.answer.toUpperCase();
    breakdown["answer"] = isCorrect;
    return {
      correct: isCorrect ? 1 : 0,
      total: 1,
      score: isCorrect ? 1 : 0,
      breakdown,
    };
  }

  // All other types — iterate over solution keys
  for (const [id, expected] of Object.entries(solution)) {
    total++;
    const given = String(userAnswer[id] ?? "")
      .trim()
      .toLowerCase();

    // Completion types — accepted answers array
    const completionEntry = expected as CompletionSolution[string];
    const isCorrect = Array.isArray(completionEntry?.answers)
      ? completionEntry.answers
          .map((a) => a.toLowerCase().trim())
          .includes(given)
      : given === String(expected).toLowerCase().trim();

    breakdown[id] = isCorrect;
    if (isCorrect) correct++;
  }

  return {
    correct,
    total,
    score: total > 0 ? correct / total : 0,
    breakdown,
  };
}
