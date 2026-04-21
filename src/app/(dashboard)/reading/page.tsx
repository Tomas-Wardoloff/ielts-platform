import { db } from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { ReadingPassageList } from "@/components/reading/ReadingPassageList";

export default async function ReadingPage() {
  const user = await currentUser();

  let dbUserId: string | undefined = undefined;
  if (user) {
    const dbUser = await db.user.findUnique({
      where: { clerkId: user.id },
      select: { id: true },
    });
    if (dbUser) dbUserId = dbUser.id;
  }

  const passages = await db.readingPassage.findMany({
    select: {
      id: true,
      title: true,
      _count: { select: { questions: true } },
      questions: {
        select: {
          attempts: {
            where: { userId: dbUserId ?? "no-user" },
            orderBy: { completedAt: "desc" },
            take: 1,
            select: {
              score: true,
              completedAt: true,
            },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const passageList = passages.map((passage) => {
    let lastAttempt: { score: number | null; completedAt: Date } | null = null;

    // Find the latest attempt across all questions (exercises) in this passage
    for (const question of passage.questions) {
      if (question.attempts.length > 0) {
        const attempt = question.attempts[0];
        if (!lastAttempt || attempt.completedAt > lastAttempt.completedAt) {
          lastAttempt = attempt;
        }
      }
    }

    return {
      id: passage.id,
      title: passage.title,
      questionCount: passage._count.questions,
      attempted: !!lastAttempt,
      lastScore: lastAttempt?.score ?? null,
      lastAttemptAt: lastAttempt ? lastAttempt.completedAt : null,
    };
  });

  return <ReadingPassageList passages={passageList} />;
}
