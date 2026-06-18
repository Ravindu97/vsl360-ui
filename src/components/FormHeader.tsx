"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Wordmark } from "./Wordmark";

export function FormHeader({ title }: { title: string }) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-40 border-b border-ocean/10 bg-cream/85 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-5">
        <button
          type="button"
          onClick={() => router.back()}
          aria-label="Go back"
          className="grid h-9 w-9 place-items-center rounded-full text-ocean transition-colors hover:bg-ocean/5"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <span className="font-sans text-sm font-semibold uppercase tracking-wider text-ocean">
          {title}
        </span>
        <Wordmark className="text-base text-ocean/70" />
      </div>
    </header>
  );
}
