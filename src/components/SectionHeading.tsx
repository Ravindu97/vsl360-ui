import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TwoTone } from "./TwoTone";

export function SectionHeading({
  eyebrow,
  title,
  action,
  centered = false,
  description,
}: {
  eyebrow?: string;
  title: string;
  action?: { label: string; href: string };
  centered?: boolean;
  description?: string;
}) {
  return (
    <div
      className={`flex items-end justify-between gap-4 ${
        centered ? "flex-col items-center text-center" : ""
      }`}
    >
      <div className={centered ? "max-w-2xl" : ""}>
        {eyebrow ? <p className="section-eyebrow mb-2">{eyebrow}</p> : null}
        <h2 className="text-3xl leading-tight text-ocean sm:text-4xl">
          <TwoTone text={title} />
        </h2>
        {description ? (
          <p className="mt-3 font-sans text-sm leading-relaxed text-ocean/60 sm:text-base">
            {description}
          </p>
        ) : null}
      </div>
      {action && !centered ? (
        <Link
          href={action.href}
          className="ink-button shrink-0 !px-5 !py-2.5 text-xs"
        >
          {action.label} <ArrowRight className="h-4 w-4" />
        </Link>
      ) : null}
    </div>
  );
}
