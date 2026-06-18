import { Quote } from "lucide-react";

export function PullQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-7 border-l-2 border-gold pl-5">
      <Quote className="mb-2 h-5 w-5 text-gold" />
      <p className="font-serif text-xl italic leading-relaxed text-ocean">
        {children}
      </p>
    </blockquote>
  );
}
