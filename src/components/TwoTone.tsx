// Olanka-style two-tone heading: the first word is extra-bold, the rest lighter.
export function TwoTone({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const parts = text.trim().split(" ");
  const first = parts[0];
  const rest = parts.slice(1).join(" ");
  return (
    <span className={className}>
      <span className="font-extrabold">{first}</span>
      {rest ? <span className="font-medium"> {rest}</span> : null}
    </span>
  );
}
