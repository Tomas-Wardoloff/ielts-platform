export default function HeroWidget() {
  return (
    <div className="flex flex-1 justify-center md:justify-end">
      <div className="relative w-full max-w-lg rounded-2xl border border-gray-100 bg-white p-8 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.15)]">
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm font-semibold tracking-wider text-gray-500 uppercase">
            Current Estimated
          </p>
          <div className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700 uppercase">
            <span className="h-2 w-2 rounded-full bg-green-500"></span>
            7.5 Overall
          </div>
        </div>
        <div className="mb-8 flex items-end gap-3">
          <span className="text-7xl font-bold tracking-tighter text-gray-900">
            7.5
          </span>
          <span className="mb-2 text-sm text-gray-500">
            Current estimated band score
          </span>
        </div>

        <div className="mb-10 grid grid-cols-2 gap-8">
          {[
            { name: "Reading", score: "8.0", fill: "85%" },
            { name: "Listening", score: "7.5", fill: "75%" },
            { name: "Writing", score: "7.5", fill: "75%" },
            { name: "Speaking", score: "7.0", fill: "65%" },
          ].map((skill) => (
            <div key={skill.name}>
              <p className="mb-2 text-xs font-bold tracking-widest text-gray-400 uppercase">
                {skill.name}
              </p>
              <p className="mb-3 text-lg font-bold text-gray-900">
                {skill.score}
              </p>
              <div className="flex h-2 w-full overflow-hidden rounded-full bg-gray-100">
                <div
                  style={{ width: skill.fill }}
                  className="bg-brand h-full"
                ></div>
                <div
                  style={{ width: "15%" }}
                  className="h-full bg-blue-500"
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-6">
          <p className="text-sm font-medium text-gray-500">
            Target band 8.0 • ~72% there
          </p>
          <a href="#" className="text-brand text-sm font-bold hover:underline">
            Read advice &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
