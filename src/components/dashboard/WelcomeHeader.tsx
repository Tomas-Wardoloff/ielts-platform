interface Props {
  firstName: string;
}

export function WelcomeHeader({ firstName }: Props) {
  return (
    <div className="mb-12">
      <h1 className="mt-5 font-serif text-4xl text-gray-900 md:text-5xl">
        Good to see you,{" "}
        <span className="text-brand inline-block">{firstName}!</span>
      </h1>
      <p className="font-inter mt-3 max-w-2xl text-[16px] leading-relaxed text-gray-500">
        Pick a module below to start practicing your skills, or review your
        recent progress. Stay consistent to reach your target band score.
      </p>
    </div>
  );
}
