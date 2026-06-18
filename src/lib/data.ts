import { prisma } from "@/lib/prisma";
import type { ItineraryDay, RouteStop, Tier } from "@/lib/types";

export async function getJourneys() {
  return prisma.journey.findMany({ orderBy: { createdAt: "asc" } });
}

export async function getFeaturedJourneys() {
  return prisma.journey.findMany({
    where: { featured: true },
    orderBy: { createdAt: "asc" },
  });
}

export async function getJourneyBySlug(slug: string) {
  return prisma.journey.findUnique({ where: { slug } });
}

export async function getStories() {
  return prisma.story.findMany({ orderBy: { publishedAt: "desc" } });
}

export async function getStoryBySlug(slug: string) {
  return prisma.story.findUnique({ where: { slug } });
}

export function asItinerary(value: unknown): ItineraryDay[] {
  if (!Array.isArray(value)) return [];
  return value as ItineraryDay[];
}

export function asTiers(value: unknown): Tier[] {
  if (!Array.isArray(value)) return [];
  return value as Tier[];
}

export function asRouteStops(value: unknown): RouteStop[] {
  if (!Array.isArray(value)) return [];
  return value as RouteStop[];
}
