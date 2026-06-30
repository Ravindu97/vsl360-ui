const DEFAULT_ADMIN_API_URL = "http://localhost:3000";

export type CustomItineraryIngestPayload = {
  name: string;
  email: string;
  phone: string | null;
  adults: number;
  children: number;
  travelStyles: string[];
  accommodation: string;
  arrivalDate: string | null;
  departureDate: string | null;
  durationDays: number | null;
  specialRequests: string | null;
};

export type CustomItineraryIngestResult =
  | { ok: true; id: string }
  | { ok: false; reason: string; status?: number; details?: string };

function ingestEndpoint(baseUrl: string): string {
  return `${baseUrl.replace(/\/$/, "")}/api/public/custom-itinerary-inquiries`;
}

async function readErrorBody(response: Response): Promise<string> {
  try {
    const data = (await response.json()) as { error?: string; details?: Array<{ field: string; message: string }> };
    if (data.details?.length) {
      return data.details.map((d) => `${d.field}: ${d.message}`).join('; ');
    }
    if (data.error) return data.error;
    return response.statusText || 'Unknown error';
  } catch {
    return response.statusText || 'Unknown error';
  }
}

export async function submitCustomItineraryToAdmin(
  payload: CustomItineraryIngestPayload,
): Promise<CustomItineraryIngestResult> {
  const baseUrl = (process.env.ADMIN_API_URL || DEFAULT_ADMIN_API_URL).replace(/\/$/, "");
  const apiKey = process.env.ADMIN_INGEST_API_KEY;
  const url = ingestEndpoint(baseUrl);

  if (!apiKey) {
    const reason = 'ADMIN_INGEST_API_KEY is not configured';
    console.error(`[custom-itinerary-ingest] ${reason}`);
    return { ok: false, reason };
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      const details = await readErrorBody(response);
      const reason = `Admin API returned HTTP ${response.status}`;
      console.error("[custom-itinerary-ingest] Request failed", {
        url,
        status: response.status,
        details,
        hint:
          response.status === 404
            ? "Check ADMIN_API_URL — inside Docker use http://host.docker.internal:3000, not localhost"
            : response.status === 401
              ? "INGEST_API_KEY / ADMIN_INGEST_API_KEY mismatch"
              : undefined,
      });
      return { ok: false, reason, status: response.status, details };
    }

    const data = (await response.json()) as { id?: string };
    if (!data.id) {
      const reason = "Admin API response missing inquiry id";
      console.error(`[custom-itinerary-ingest] ${reason}`, { url });
      return { ok: false, reason };
    }

    console.info(`[custom-itinerary-ingest] Created inquiry ${data.id}`);
    return { ok: true, id: data.id };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    const reason = `Network error reaching admin API: ${message}`;
    console.error("[custom-itinerary-ingest] Request failed", {
      url,
      error: message,
      hint: "Is VSL360 admin backend running on port 3000?",
    });
    return { ok: false, reason, details: message };
  }
}
