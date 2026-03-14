export default function Loading() {
  return (
    <div className="pointer-events-none flex h-[calc(100vh-0px)] flex-col opacity-50 blur-sm">
      <div className="flex h-14.25 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-5">
        <div className="h-4 w-32 animate-pulse rounded bg-gray-200"></div>
        <div className="h-9 w-32 animate-pulse rounded-lg bg-gray-200"></div>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 shrink-0 border-r border-gray-200 bg-white p-6">
          <div className="mb-4 h-3 w-16 animate-pulse rounded bg-gray-200"></div>
          <div className="space-y-4">
            <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-11/12 animate-pulse rounded bg-gray-200"></div>
            <div className="h-4 w-full animate-pulse rounded bg-gray-200"></div>
            <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-gray-200"></div>
          </div>
        </div>
        <div className="flex w-1/2 flex-col bg-gray-50">
          <div className="h-12 border-b border-gray-100 bg-white px-5 pt-4">
            <div className="h-3 w-32 animate-pulse rounded bg-gray-200"></div>
          </div>
          <div className="flex-1 p-5">
            <div className="h-64 animate-pulse rounded-xl border border-gray-200 bg-white p-5">
              <div className="mb-2 h-2 w-24 rounded bg-gray-200"></div>
              <div className="mb-4 h-3 w-full rounded bg-gray-200"></div>
              <div className="h-10 w-full rounded bg-gray-100"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
