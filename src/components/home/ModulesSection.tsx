import ModulesAccordion from "./ModulesAccordion";

export default function ModulesSection() {
  return (
    <section id="modules" className="bg-[#0f1423] px-6 py-24 lg:px-10">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-brand mb-3 text-xs font-bold tracking-widest uppercase">
          COMPREHENSIVE PREP
        </p>
        <h2 className="mb-6 font-serif text-4xl text-white md:text-5xl">
          All four skill. One platform
        </h2>
        <p className="mx-auto mb-4 max-w-xl leading-relaxed text-gray-400">
          Everything you need to master each part of the IELTS exam, powered by
          advanced AI feedback and authentic practice exams.
        </p>

        <ModulesAccordion />
      </div>
    </section>
  );
}
