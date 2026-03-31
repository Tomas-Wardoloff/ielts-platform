import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { ReadingExercise } from "@/components/reading/ReadingExercise";
import type { ReadingPassageWithQuestions } from "@/types/exercise";

interface Props {
  params: Promise<{ passageId: string }>;
}

export default async function ReadingPassagePage({ params }: Props) {
  const { passageId } = await params;

  const dbPassage = await db.readingPassage.findUnique({
    where: { id: passageId },
    include: {
      questions: {
        orderBy: { order: "asc" },
      },
    },
  });

  if (!dbPassage) notFound();

  const passage: ReadingPassageWithQuestions = {
    id: dbPassage.id,
    title: dbPassage.title,
    text: dbPassage.text,
    questions: dbPassage.questions.map((q) => ({
      id: q.id,
      type: q.type,
      instructions: q.instructions,
      content: q.content,
      solution: q.solution,
      order: q.order,
    })),
  };

  return <ReadingExercise passage={passage} />;
}
