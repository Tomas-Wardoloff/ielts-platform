import type { ReadingPassageWithQuestions, UserAnswer } from "@/types/exercise";

import { TrueFalseNG } from "./TrueFalseNg";
import { MultipleChoice } from "./MultipleChoice";

type Question = ReadingPassageWithQuestions["questions"][number];

interface Props {
  question: Question;
  userAnswer: UserAnswer;
  onAnswer: (answer: UserAnswer) => void;
}

export function QuestionRenderer({ question, userAnswer, onAnswer }: Props) {
  const props = { question, userAnswer, onAnswer };

  switch (question.type) {
    case "TRUE_FALSE_NG":
    case "YES_NO_NG":
      return <TrueFalseNG {...props} />;
    case "MULTIPLE_CHOICE":
      return <MultipleChoice {...props} />;
    default:
      return (
        <p className="text-sm text-gray-400 italic">
          Renderer not implemented for this question type yet.
        </p>
      );
  }
}
