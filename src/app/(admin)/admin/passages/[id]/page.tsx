import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";
import { DeletePassageButton } from "@/components/admin/DeletePassageButton";
import { Button } from "@/components/ui/Button";
import { MoveLeft } from "lucide-react";

const typeLabels: Record<string, string> = {
  MULTIPLE_CHOICE: "Multiple Choice",
  TRUE_FALSE_NG: "True / False / Not Given",
  YES_NO_NG: "Yes / No / Not Given",
  MATCHING_INFORMATION: "Matching Information",
  MATCHING_HEADINGS: "Matching Headings",
  MATCHING_FEATURES: "Matching Features",
  MATCHING_SENTENCE_ENDINGS: "Matching Sentence Endings",
  SENTENCE_COMPLETION: "Sentence Completion",
  NOTE_TABLE_FLOWCHART_SUMMARY: "Note / Table / Flowchart",
  DIAGRAM_LABEL: "Diagram Label",
  SHORT_ANSWER: "Short Answer",
};

interface Props {
  params: Promise<{ id: string }>;
}

export default async function AdminPassagePage({ params }: Props) {
  const { id } = await params;

  const passage = await db.readingPassage.findUnique({
    where: { id },
    include: { questions: { orderBy: { order: "asc" } } },
  });

  if (!passage) notFound();

  return (
    <div>
      <div className="flex h-14.25 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-5">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            href="/admin"
            leftIcon={<MoveLeft size={14} />}
          >
            Passages
          </Button>
        </div>
      </div>

      <div className="w-full px-4 py-6 md:px-8 md:py-8">
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h1 className="text-xl font-bold tracking-tight text-gray-900">
                {passage.title}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href={`/admin/passages/${passage.id}/edit`}
                className="rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-500 transition-colors hover:bg-gray-50"
              >
                Edit passage
              </Link>
              <DeletePassageButton passageId={passage.id} />
            </div>
          </div>
          <div className="max-h-48 overflow-y-auto rounded-lg bg-gray-50 p-4">
            <p className="text-sm leading-relaxed whitespace-pre-wrap text-gray-600">
              {passage.text}
            </p>
          </div>
        </div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-gray-900">
            Questions ({passage.questions.length})
          </h2>
          <Link
            href={`/admin/passages/${passage.id}/questions/new`}
            className="bg-brand hover:bg-brand-dark inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white transition-colors"
          >
            <Plus size={13} />
            Add question
          </Link>
        </div>

        {passage.questions.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white px-5 py-10 text-center">
            <p className="mb-3 text-sm text-gray-400">No questions yet.</p>
            <Link
              href={`/admin/passages/${passage.id}/questions/new`}
              className="text-brand text-sm font-medium hover:underline"
            >
              Add the first question →
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {passage.questions.map((q, i) => (
              <div
                key={q.id}
                className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-5 py-4"
              >
                <div className="flex items-center gap-3">
                  <span className="text-brand w-5 text-xs font-semibold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {q.instructions.length > 60
                        ? q.instructions.substring(0, 60) + "..."
                        : q.instructions || "Question"}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {typeLabels[q.type] ?? q.type}
                    </p>
                  </div>
                </div>
                <Link
                  href={`/admin/passages/${passage.id}/questions/${q.id}/edit`}
                  className="hover:text-brand inline-flex items-center gap-1.5 text-xs text-gray-400 transition-colors"
                >
                  <Pencil size={12} />
                  Edit
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
