import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/auth";

interface Props {
  params: Promise<{ id: string }>;
}

export async function DELETE(_req: Request, { params }: Props) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await db.exercise.deleteMany({ where: { passageId: id } });
  await db.readingPassage.delete({ where: { id } });

  return NextResponse.json({ success: true });
}

export async function PATCH(req: Request, { params }: Props) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const { title, text } = await req.json();

  const passage = await db.readingPassage.update({
    where: { id },
    data: {
      title: title.trim(),
      text: text.trim(),
    },
  });

  return NextResponse.json(passage);
}
