import Link from "next/link";

export function SectionHeading({
  eyebrow,
  title,
  action,
}: {
  eyebrow?: string;
  title: string;
  action?: { label: string; href: string };
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        {eyebrow ? <p className="section-eyebrow mb-1">{eyebrow}</p> : null}
        <h2 className="font-serif text-2xl font-medium text-ocean">{title}</h2>
      </div>
      {action ? (
        <Link
          href={action.href}
          className="shrink-0 font-sans text-sm font-semibold text-tropical hover:text-ocean"
        >
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}
