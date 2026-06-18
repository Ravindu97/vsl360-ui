export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-serif tracking-[0.18em] font-medium leading-none ${className}`}
    >
      VSL<span className="text-gold">360</span>
    </span>
  );
}
