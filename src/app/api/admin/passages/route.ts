import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/auth";

export async function POST(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { title, text, questions } = await req.json();

  if (!title || !text) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const passage = await db.$transaction(
    async (tx) => {
      const p = await tx.readingPassage.create({
        data: {
          title: title.trim(),
          text: text.trim(),
        },
      });

      if (questions?.length > 0) {
        await tx.exercise.createMany({
          data: questions.map((q: any, i: number) => ({
            module: "READING",
            type: q.type,
            instructions: q.instructions,
            content: q.content,
            solution: q.solution,
            order: i + 1,
            passageId: p.id,
          })),
        });
      }

      return p;
    },
    {
      maxWait: 10000, // 10s
      timeout: 20000, // 20s
    }
  );

  return NextResponse.json(passage);
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const passages = await db.readingPassage.findMany({
    include: { _count: { select: { questions: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(passages);
}
