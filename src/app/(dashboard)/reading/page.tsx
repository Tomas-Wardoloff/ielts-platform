import { READING_FIXTURES } from "@/lib/fixtures/reading";
import { ReadingPassageList } from "@/components/reading/ReadingPassageList";

export default function ReadingPage() {
  const passages = READING_FIXTURES.map((passage, index) => ({
    id: passage.id,
    title: passage.title,
    source: passage.source,
    questionCount: passage.questions.length,
    // Simulate some progress for development
    attempted: index === 0,
    lastScore: index === 0 ? 0.78 : null,
    lastAttemptAt: index === 0 ? new Date("2025-03-10") : null,
  }));

  return <ReadingPassageList passages={passages} />;
}
