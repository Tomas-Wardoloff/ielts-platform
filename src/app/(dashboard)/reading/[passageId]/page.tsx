import { notFound } from "next/navigation";
import { READING_FIXTURES } from "@/lib/fixtures/reading";
import { ReadingExercise } from "@/components/reading/ReadingExercise";

interface Props {
  params: Promise<{ passageId: string }>;
}

export default async function ReadingPassagePage({ params }: Props) {
  const { passageId } = await params;
  const passage = READING_FIXTURES.find((p) => p.id === passageId);
  if (!passage) notFound();
  return <ReadingExercise passage={passage} />;
}
