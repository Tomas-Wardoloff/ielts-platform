import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getOrCreateUser } from "@/lib/user";

export async function POST(req: Request) {
  const user = await getOrCreateUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { exerciseId, userAnswer, score, aiFeedback } = await req.json();

  if (!exerciseId || userAnswer === undefined) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const attempt = await db.attempt.create({
    data: {
      userId: user.id,
      exerciseId,
      userAnswer,
      score: score ?? null,
      aiFeedback: aiFeedback ?? null,
    },
  });

  return NextResponse.json(attempt);
}
