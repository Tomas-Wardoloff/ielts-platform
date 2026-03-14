interface StatData {
  label: string;
  value: string | number;
}

interface Props {
  stats: StatData[];
}

export function StatsOverview({ stats }: Props) {
  return (
    <div className="mb-14 grid grid-cols-2 gap-4 md:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="group relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white p-5 shadow-sm transition-all duration-300"
        >
          <p className="font-inter text-xs font-semibold tracking-wider text-gray-400 uppercase">
            {stat.label}
          </p>
          <p className="mt-2 font-sans text-3xl font-bold tracking-tight text-gray-900 transition-colors">
            {stat.value}
          </p>
          <div className="bg-brand-light absolute -top-6 -right-6 h-20 w-20 rounded-full opacity-0 transition-opacity duration-300" />
        </div>
      ))}
    </div>
  );
}
