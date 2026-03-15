export default function DashboardLoading() {
  return (
    <div className="w-full px-8 py-8">
      <div className="mx-auto max-w-7xl animate-pulse duration-700">
        <div className="mb-12">
          <div className="mt-5 h-10 w-64 rounded-xl bg-gray-200 md:h-12 md:w-96"></div>
          <div className="mt-3 h-5 w-full max-w-2xl rounded bg-gray-200"></div>
          <div className="mt-2 h-5 w-3/4 max-w-xl rounded bg-gray-200"></div>
        </div>

        <div className="mb-14 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white p-5 shadow-sm"
            >
              <div className="h-3 w-20 rounded bg-gray-200"></div>
              <div className="mt-3 h-8 w-16 rounded bg-gray-200"></div>
            </div>
          ))}
        </div>

        <div className="mb-14">
          <div className="mb-6 flex items-center justify-between">
            <div className="h-8 w-48 rounded bg-gray-200 md:h-9"></div>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="relative h-41 overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-5 flex items-start justify-between">
                  <div className="h-12 w-12 rounded-xl bg-gray-100"></div>
                </div>
                <div className="mt-2 h-6 w-32 rounded bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <div className="mb-6 h-8 w-48 rounded bg-gray-200 md:h-9"></div>
          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            <div className="h-14 border-b border-gray-100 bg-gray-50/50"></div>
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="flex h-18 items-center gap-4 border-b border-gray-50 px-6 last:border-0"
              >
                <div className="h-4 w-6 rounded bg-gray-200"></div>
                <div className="h-4 w-32 rounded bg-gray-200"></div>
                <div className="mx-auto h-6 w-16 rounded-full bg-gray-200"></div>
                <div className="h-4 w-12 rounded bg-gray-200"></div>
                <div className="ml-auto h-4 w-24 rounded bg-gray-200"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
