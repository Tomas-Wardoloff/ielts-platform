export default function ProcessSection() {
  return (
    <section id="how-it-works" className="bg-brand-light/40 py-24">
      <div className="mx-auto max-w-5xl px-6 text-center lg:px-10">
        <p className="text-brand mb-3 text-xs font-bold tracking-widest uppercase">
          PROCESS
        </p>
        <h2 className="mb-16 font-serif text-4xl leading-tight text-gray-900 md:text-5xl">
          Three steps to your <br /> target band score
        </h2>

        <div className="relative grid gap-12 md:grid-cols-3">
          {/* Connecting Line */}
          <div className="absolute top-8 right-[16.66%] left-[16.66%] hidden h-0.5 bg-gray-200 md:block" />

          {/* Step 1 */}
          <div className="group relative flex cursor-pointer flex-col items-center text-center">
            <div className="group-hover:bg-brand group-hover:border-brand group-hover:ring-brand/20 z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gray-200 bg-white font-serif text-xl font-bold text-gray-400 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:text-white group-hover:shadow-md group-hover:ring-4">
              1
            </div>
            <h3 className="group-hover:text-brand mb-3 text-lg font-bold text-gray-900 transition-colors">
              Set your goal
            </h3>
            <p className="max-w-[260px] text-sm leading-relaxed text-gray-500">
              Enter your target band score and exam date. Take a quick
              diagnostic to assess your current level across all four modules.
            </p>
          </div>

          {/* Step 2 */}
          <div className="group relative flex cursor-pointer flex-col items-center text-center">
            <div className="group-hover:bg-brand group-hover:border-brand group-hover:ring-brand/20 z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gray-200 bg-white font-serif text-xl font-bold text-gray-400 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:text-white group-hover:shadow-md group-hover:ring-4">
              2
            </div>
            <h3 className="group-hover:text-brand mb-3 text-lg font-bold text-gray-900 transition-colors">
              Practice with purpose
            </h3>
            <p className="max-w-[260px] text-sm leading-relaxed text-gray-500">
              Work through adaptive exercises in Reading, Listening, Writing,
              and Speaking. Get AI-powered feedback to close gaps fast.
            </p>
          </div>

          {/* Step 3 */}
          <div className="group relative flex cursor-pointer flex-col items-center text-center">
            <div className="group-hover:bg-brand group-hover:border-brand group-hover:ring-brand/20 z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-gray-200 bg-white font-serif text-xl font-bold text-gray-400 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:text-white group-hover:shadow-md group-hover:ring-4">
              3
            </div>
            <h3 className="group-hover:text-brand mb-3 text-lg font-bold text-gray-900 transition-colors">
              Emulate & refine
            </h3>
            <p className="max-w-[260px] text-sm leading-relaxed text-gray-500">
              Sit full mock exam simulations to build stamina and identify
              remaining gaps. Track your improvement until test day.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
