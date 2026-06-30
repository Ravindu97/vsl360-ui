import type { InquiryTrackResult } from "@/lib/adminApi";
import {
  formatInquiryDate,
  formatSlaDueAt,
  inquiryStatusLabel,
  inquiryTypeLabel,
} from "@/lib/inquiryTracking";
import { CheckCircle2, Clock, Mail } from "lucide-react";

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:gap-4">
      <dt className="font-sans text-xs font-semibold uppercase tracking-wide text-ocean/45">
        {label}
      </dt>
      <dd className="font-sans text-sm text-ocean">{value}</dd>
    </div>
  );
}

export function InquiryStatusCard({ inquiry }: { inquiry: InquiryTrackResult }) {
  const currentStage = inquiry.timeline.at(-1)?.stage ?? inquiry.status;
  const completedStages = new Set(inquiry.timeline.map((e) => e.stage));

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-tropical/20 bg-white p-6 shadow-card sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {inquiryTypeLabel(inquiry.type)}
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-ocean">
              {inquiryStatusLabel(inquiry.status)}
            </h2>
            <p className="mt-2 font-sans text-sm text-ocean/55">
              Reference{" "}
              <span className="font-mono font-semibold text-ocean">{inquiry.reference}</span>
            </p>
          </div>
          <div className="rounded-2xl bg-ocean/5 px-4 py-3">
            <p className="font-sans text-xs font-semibold uppercase tracking-wide text-ocean/45">
              Submitted
            </p>
            <p className="mt-1 font-sans text-sm font-medium text-ocean">
              {formatInquiryDate(inquiry.submittedAt)}
            </p>
          </div>
        </div>

        {inquiry.sla ? (
          <div
            className={`mt-5 flex items-start gap-3 rounded-2xl px-4 py-3 ${
              inquiry.sla.isOverdue
                ? "border border-gold/30 bg-gold/10"
                : "border border-tropical/20 bg-tropical/5"
            }`}
          >
            <Clock
              className={`mt-0.5 h-5 w-5 shrink-0 ${
                inquiry.sla.isOverdue ? "text-gold-dark" : "text-tropical"
              }`}
            />
            <div className="font-sans text-sm leading-relaxed text-ocean/75">
              {inquiry.status === "NEW" ? (
                inquiry.sla.isOverdue ? (
                  <p>
                    Our team is actively working on your request and will be in touch shortly.
                  </p>
                ) : (
                  <>
                    <p className="font-semibold text-ocean">
                      A planner will reach out by {formatSlaDueAt(inquiry.sla.dueAt)}
                    </p>
                    <p className="mt-1">
                      We aim to respond within {inquiry.sla.promisedHours} hours of your submission.
                    </p>
                  </>
                )
              ) : inquiry.sla.isOverdue ? (
                <p>Our team is actively working on your request and will be in touch shortly.</p>
              ) : (
                <p>Our travel planners aim to respond within {inquiry.sla.promisedHours} hours.</p>
              )}
            </div>
          </div>
        ) : null}
      </div>

      {inquiry.summary ? (
        <div className="rounded-3xl border border-ocean/10 bg-cream p-6 sm:p-8">
          <h3 className="font-display text-lg font-bold text-ocean">Trip Summary</h3>
          <dl className="mt-4 space-y-3">
            {inquiry.summary.guests ? (
              <SummaryRow label="Guests" value={inquiry.summary.guests} />
            ) : null}
            {inquiry.summary.duration ? (
              <SummaryRow label="Duration" value={inquiry.summary.duration} />
            ) : null}
            {inquiry.summary.destination ? (
              <SummaryRow label="Destination" value={inquiry.summary.destination} />
            ) : null}
            {inquiry.summary.accommodation ? (
              <SummaryRow label="Accommodation" value={inquiry.summary.accommodation} />
            ) : null}
            {inquiry.summary.travelStyles?.length ? (
              <SummaryRow label="Interests" value={inquiry.summary.travelStyles.join(", ")} />
            ) : null}
          </dl>
        </div>
      ) : null}

      {inquiry.timeline.length > 0 ? (
        <div className="rounded-3xl border border-ocean/10 bg-white p-6 shadow-card sm:p-8">
          <h3 className="font-display text-lg font-bold text-ocean">Progress</h3>
          <ol className="mt-6 space-y-0">
            {inquiry.timeline.map((event, i) => {
              const done = completedStages.has(event.stage);
              const isCurrent = event.stage === currentStage;
              const isLast = i === inquiry.timeline.length - 1;

              return (
                <li key={`${event.stage}-${event.at}`} className="relative flex gap-4 pb-8 last:pb-0">
                  {!isLast ? (
                    <div
                      className={`absolute left-[15px] top-8 h-[calc(100%-1rem)] w-0.5 ${
                        done ? "bg-tropical" : "bg-ocean/10"
                      }`}
                    />
                  ) : null}
                  <span
                    className={`relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full ${
                      done
                        ? "bg-tropical text-cream"
                        : isCurrent
                          ? "border-2 border-gold bg-gold/10 text-gold-dark"
                          : "border border-ocean/15 bg-cream text-ocean/35"
                    }`}
                  >
                    {done ? <CheckCircle2 className="h-4 w-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <p className="font-sans text-sm font-semibold text-ocean">{event.label}</p>
                    <p className="mt-0.5 font-sans text-xs text-ocean/45">
                      {formatInquiryDate(event.at)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      ) : null}

      {inquiry.status === "QUOTED" ? (
        <div className="flex items-start gap-3 rounded-2xl border border-tropical/20 bg-tropical/5 px-4 py-4">
          <Mail className="mt-0.5 h-5 w-5 shrink-0 text-tropical" />
          <p className="font-sans text-sm leading-relaxed text-ocean/75">
            Your personalised quote has been sent to your email. Check your inbox and spam folder.
          </p>
        </div>
      ) : null}
    </div>
  );
}
