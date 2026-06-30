import { TwoTone } from "@/components/TwoTone";
import { TrackInquiryForm } from "@/components/TrackInquiryForm";

export const metadata = {
  title: "Track My Inquiry — VSL 360",
  description:
    "Check the status of your custom itinerary request or travel inquiry with VSL 360.",
};

export default async function TrackPage({
  searchParams,
}: {
  searchParams: Promise<{ ref?: string; email?: string }>;
}) {
  const { ref, email } = await searchParams;

  return (
    <div className="container-page pt-6 lg:pt-10">
      <div className="block-ocean px-6 py-10 text-center sm:px-10 lg:py-14">
        <p className="section-eyebrow mb-2">My Inquiry</p>
        <h1 className="mx-auto max-w-2xl text-4xl leading-tight text-ocean sm:text-5xl">
          <TwoTone text="Track Your Request" />
        </h1>
        <p className="mx-auto mt-4 max-w-xl font-sans text-base leading-relaxed text-ocean/65">
          Enter the reference number from your confirmation and the email you used when
          submitting. We&apos;ll show your current status and progress.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl pb-16">
        <TrackInquiryForm defaultReference={ref ?? ""} defaultEmail={email ?? ""} />
      </div>
    </div>
  );
}
