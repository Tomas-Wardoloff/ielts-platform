import { db } from "@/lib/db";
import Link from "next/link";
import { Plus, Pencil } from "lucide-react";

export default async function AdminPassagesPage() {
  const passages = await db.readingPassage.findMany({
    include: { _count: { select: { questions: true } } },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Passages
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage reading passages and their questions.
          </p>
        </div>
        <Link
          href="/admin/passages/new"
          className="bg-brand hover:bg-brand-dark inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors"
        >
          <Plus size={15} />
          New passage
        </Link>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        {passages.length === 0 ? (
          <div className="px-5 py-16 text-center">
            <p className="mb-4 text-sm text-gray-400">No passages yet.</p>
            <Link
              href="/admin/passages/new"
              className="text-brand text-sm font-medium hover:underline"
            >
              Create your first passage →
            </Link>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-xs tracking-wide text-gray-400 uppercase">
                <th className="px-5 py-3 text-left font-medium">Title</th>
                <th className="px-4 py-3 text-center font-medium">Questions</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {passages.map((passage) => {
                return (
                  <tr
                    key={passage.id}
                    className="group transition-colors hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <p className="font-medium text-gray-900">
                        {passage.title}
                      </p>
                    </td>
                    <td className="px-4 py-4 text-center text-gray-600">
                      {passage._count.questions}
                    </td>
                    <td className="px-4 py-4 text-right">
                      <Link
                        href={`/admin/passages/${passage.id}`}
                        className="hover:text-brand inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 transition-colors"
                      >
                        <Pencil size={12} />
                        Manage
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
