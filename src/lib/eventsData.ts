export type WeddingVenue = {
  id: string;
  title: string;
  region: string;
  description: string;
  image: string;
  highlights: string[];
};

export type VendorModule = {
  id: string;
  title: string;
  description: string;
  deliverables: string[];
};

export type CorporateService = {
  id: string;
  title: string;
  description: string;
  metrics?: string;
};

export const weddingVenues: WeddingVenue[] = [
  {
    id: "coastal",
    title: "Coastal Ceremonies",
    region: "Galle & Bentota",
    description:
      "Golden-hour beach vows, barefoot receptions, and intimate cliffside gatherings framed by the Indian Ocean.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Private beach setups at boutique resorts",
      "Sunset cocktail receptions & fire-lit dinners",
      "Guest transfers from Colombo airport",
    ],
  },
  {
    id: "upcountry",
    title: "Up-Country Traditions",
    region: "Kandy & Nuwara Eliya",
    description:
      "Elegant ballroom receptions, temple blessings, and misty tea-estate celebrations steeped in Sri Lankan heritage.",
    image:
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80",
    highlights: [
      "Poruwa & traditional ceremony coordination",
      "Heritage hotels with panoramic valley views",
      "Multi-day guest programmes across the hills",
    ],
  },
];

export const vendorModules: VendorModule[] = [
  {
    id: "photography",
    title: "Photography & Film",
    description: "Candid storytelling teams for pre-wedding shoots and full-day coverage.",
    deliverables: ["Pre-wedding location scouting", "Drone & cinematic reels", "Same-day highlight edits"],
  },
  {
    id: "florals",
    title: "Florals & Styling",
    description: "Tropical arrangements, mandap styling, and tablescapes tailored to your palette.",
    deliverables: ["Bridal bouquets & garlands", "Ceremony arch & aisle design", "Reception centrepieces"],
  },
  {
    id: "catering",
    title: "Catering & Banquets",
    description: "Multi-cuisine menus with dedicated Veg, Jain, and Halal kitchen protocols.",
    deliverables: ["Tasting sessions pre-arrival", "Live cooking stations", "Dietary compliance for all guests"],
  },
  {
    id: "entertainment",
    title: "Music & Entertainment",
    description: "Live bands, DJs, cultural dance troupes, and welcome ceremonies on arrival.",
    deliverables: ["Sound & lighting design", "Cultural performance curation", "After-party coordination"],
  },
  {
    id: "logistics",
    title: "Guest Logistics",
    description: "End-to-end coordination for international guests — visas, transfers, and room blocks.",
    deliverables: ["Airport meet-and-greet", "Room block negotiations", "Welcome hampers & itineraries"],
  },
  {
    id: "legal",
    title: "Legal & Documentation",
    description: "Marriage registration guidance and documentation support for destination ceremonies.",
    deliverables: ["Registrar liaison", "Document checklist", "Ceremony timeline management"],
  },
];

export const corporateServices: CorporateService[] = [
  {
    id: "conference",
    title: "Conference Layouts",
    description:
      "Theatre, classroom, U-shape, and boardroom configurations with branded staging and breakout rooms.",
    metrics: "Up to 500 delegates · Hybrid-ready venues",
  },
  {
    id: "av",
    title: "Audio-Visual Integration",
    description:
      "LED walls, simultaneous interpretation, live-streaming rigs, and on-site technical directors.",
    metrics: "4K projection · Multi-zone PA systems",
  },
  {
    id: "banquet",
    title: "Banquet Management",
    description:
      "Gala dinners, cocktail receptions, and themed F&B programmes with per-head costing transparency.",
    metrics: "Plated, buffet & station service · Dietary compliance",
  },
  {
    id: "incentive",
    title: "Incentive & Team-Building",
    description:
      "Safari drives, cricket matches, cooking classes, and CSR activities woven into MICE programmes.",
    metrics: "Custom group sizes · All-inclusive per diems",
  },
];

export const eventTypes = [
  { value: "DESTINATION_WEDDING", label: "Destination Wedding" },
  { value: "CORPORATE_MICE", label: "Corporate / MICE" },
  { value: "CUSTOM_GATHERING", label: "Custom Gathering" },
] as const;

export const weddingStyles = [
  { value: "beach", label: "Beach (Galle / Bentota)" },
  { value: "upcountry", label: "Up-Country (Kandy / Nuwara Eliya)" },
  { value: "hybrid", label: "Multi-Venue / Hybrid" },
  { value: "undecided", label: "Not sure yet — advise me" },
];

export const vendorOptions = [
  "Photography & Film",
  "Florals & Styling",
  "Catering & Banquets",
  "Music & Entertainment",
  "Guest Logistics",
  "Legal & Documentation",
];

export const conferenceLayouts = [
  "Theatre",
  "Classroom",
  "U-Shape / Boardroom",
  "Banquet / Gala",
  "Hybrid (in-person + virtual)",
  "Custom — describe below",
];

export const venuePreferences = [
  "Beach resort (South Coast)",
  "Heritage hotel (Hill Country)",
  "Boutique villa / private estate",
  "City hotel (Colombo)",
  "Conference centre",
  "Open to recommendations",
];
