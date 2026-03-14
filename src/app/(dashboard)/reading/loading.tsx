export default function Loading() {
  return (
    <div className="w-full animate-pulse px-8 py-8">
      <div className="mb-8">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-5 w-24 rounded bg-gray-200"></div>
        </div>
        <div className="mt-2 h-4 w-64 rounded bg-gray-200"></div>
      </div>

      <div className="mb-8 h-32 rounded-xl border border-gray-100 bg-gray-50 p-5"></div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="h-10 w-48 rounded-lg bg-gray-200"></div>
        <div className="h-10 w-32 rounded-lg bg-gray-200"></div>
        <div className="h-10 w-32 rounded-lg bg-gray-200"></div>
      </div>

      <div className="min-h-100 overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="h-12 border-b border-gray-100 bg-gray-50"></div>
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="flex h-16 items-center gap-4 border-b border-gray-50 px-5"
          >
            <div className="h-4 w-48 rounded bg-gray-200"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
