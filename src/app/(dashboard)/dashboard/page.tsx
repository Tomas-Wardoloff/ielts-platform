import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { WelcomeHeader } from "@/components/dashboard/WelcomeHeader";
import { StatsOverview } from "@/components/dashboard/StatsOverview";
import { PracticeModules } from "@/components/dashboard/PracticeModules";
import { RecentAttemptsTable } from "@/components/dashboard/RecentAttemptsTable";

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const dbUser = await db.user.findUnique({
    where: { clerkId: user.id },
  });

  const rawAttempts = await db.attempt.findMany({
    where: { userId: dbUser?.id },
    orderBy: { completedAt: "desc" },
    take: 5,
    include: {
      exercise: {
        select: {
          title: true,
          module: true,
        },
      },
    },
  });

  const attemptsCount = await db.attempt.count({
    where: { userId: dbUser?.id },
  });

  const recentAttempts = rawAttempts.map((attempt) => ({
    id: attempt.id,
    module: attempt.exercise.module,
    exerciseTitle: attempt.exercise.title,
    score: attempt.score,
    completedAt: attempt.completedAt,
  }));

  const hasAttempts = attemptsCount > 0;

  // Calculate mock stats
  const totalExercises = attemptsCount;
  // Let's assume on average each exercise takes ~15 minutes (0.25 hrs)
  const hoursPracticed = (totalExercises * 0.25).toFixed(1);

  // Compute average score (mock or real if possible)
  const scores = rawAttempts
    .filter((a) => a.score !== null)
    .map((a) => a.score as number);
  const avgScore =
    scores.length > 0
      ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
      : "—";

  const statsData = [
    { label: "Exercises completed", value: totalExercises.toString() },
    { label: "Hours practiced", value: `${hoursPracticed}h` },
    { label: "Avg. band score", value: avgScore },
    {
      label: "Target band",
      value: dbUser?.targetBand ? dbUser.targetBand.toString() : "7.5",
    },
  ];

  return (
    <div className="w-full px-8 py-8">
      <div className="animate-in fade-in mx-auto max-w-7xl duration-700">
        <WelcomeHeader
          firstName={user.firstName ?? user.emailAddresses[0].emailAddress}
        />

        <StatsOverview stats={statsData} />

        <PracticeModules layout={hasAttempts ? "row" : "grid"} />

        {hasAttempts && (
          <div className="mt-14">
            <RecentAttemptsTable attempts={recentAttempts} />
          </div>
        )}
      </div>
    </div>
  );
}
