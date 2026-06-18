import Link from "next/link";
import { Menu, UserRound } from "lucide-react";
import { Wordmark } from "./Wordmark";

export function TopBar() {
  return (
    <header className="sticky top-0 z-40 border-b border-ocean/10 bg-cream/85 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-5">
        <button
          type="button"
          aria-label="Open menu"
          className="grid h-9 w-9 place-items-center rounded-full text-ocean transition-colors hover:bg-ocean/5"
        >
          <Menu className="h-5 w-5" />
        </button>

        <Link href="/discover" aria-label="VSL 360 home">
          <Wordmark className="text-xl text-ocean" />
        </Link>

        <button
          type="button"
          aria-label="Account"
          className="grid h-9 w-9 place-items-center rounded-full text-ocean transition-colors hover:bg-ocean/5"
        >
          <UserRound className="h-5 w-5" />
        </button>
      </div>
    </header>
  );
}
