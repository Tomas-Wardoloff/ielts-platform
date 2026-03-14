import { Home, Compass } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { auth } from "@clerk/nextjs/server";

export default async function NotFound() {
  const { userId } = await auth();
  const returnUrl = userId ? "/dashboard" : "/";
  const returnText = userId ? "Return to Dashboard" : "Return Home";

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-gray-50 px-4 py-24 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-md flex-col items-center text-center">
        <div className="mb-8 rounded-full bg-red-50 p-6">
          <Compass className="h-12 w-12 text-brand stroke-[1.5]" />
        </div>

        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          404 <span className="text-gray-300 font-light mx-2">|</span> Not Found
        </h1>
        <p className="mt-4 text-base text-gray-500 max-w-sm mx-auto">
          Oops! The page you are looking for doesn't exist, has been moved, or is temporarily unavailable.
        </p>

        <div className="mt-10 flex gap-4">
          <Button
            href={returnUrl}
            size="lg"
            leftIcon={<Home size={18} />}
          >
            {returnText}
          </Button>
        </div>
      </div>
    </div>
  );
}
