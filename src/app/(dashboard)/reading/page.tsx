import { db } from "@/lib/db";
import { ReadingPassageList } from "@/components/reading/ReadingPassageList";

export default async function ReadingPage() {
  const passages = await db.readingPassage.findMany({
    include: {
      _count: { select: { questions: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  const passageList = passages.map((passage) => ({
    id: passage.id,
    title: passage.title,
    questionCount: passage._count.questions,
    attempted: false,
    lastScore: null,
    lastAttemptAt: null,
  }));

  return <ReadingPassageList passages={passageList} />;
}
