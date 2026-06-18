import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type ItineraryDay = {
  day: number;
  title: string;
  description: string;
  icon: string;
  status: "confirmed" | "planning";
};

type Tier = { name: string; price: number; perks: string[] };
type RouteStop = { city: string; travelTime: string; attraction: string };

const yalaItinerary: ItineraryDay[] = [
  {
    day: 1,
    title: "Arrival & Coastal Transfer",
    description: "Met at Colombo, scenic speedboat transfer down the western coast.",
    icon: "boat",
    status: "confirmed",
  },
  {
    day: 2,
    title: "Galle Fort Heritage Walk",
    description: "Guided walk through the Dutch ramparts and artisan lanes.",
    icon: "compass",
    status: "confirmed",
  },
  {
    day: 3,
    title: "Tea Country Ascent",
    description: "Train to the misty highlands of Ella through emerald estates.",
    icon: "train",
    status: "confirmed",
  },
  {
    day: 4,
    title: "Sunrise Spa & Wellness",
    description: "Ayurvedic spa session followed by a slow mountain breakfast.",
    icon: "spa",
    status: "confirmed",
  },
  {
    day: 5,
    title: "Waterfall Trek",
    description: "Hike to hidden cascades with a private naturalist guide.",
    icon: "mountain",
    status: "confirmed",
  },
  {
    day: 6,
    title: "Cultural Triangle",
    description: "Explore ancient cities and the rock fortress of Sigiriya.",
    icon: "landmark",
    status: "planning",
  },
  {
    day: 7,
    title: "Yala Safari — Leopard Tracking",
    description: "Dawn game drive in search of the elusive Sri Lankan leopard.",
    icon: "binoculars",
    status: "planning",
  },
  {
    day: 8,
    title: "Beachside Retreat",
    description: "Unwind at a barefoot-luxury villa on the southern coast.",
    icon: "palm",
    status: "planning",
  },
  {
    day: 9,
    title: "Local Flavours Dining",
    description: "Private chef-led Sri Lankan feast — pure-veg & Jain menus available.",
    icon: "dining",
    status: "planning",
  },
  {
    day: 10,
    title: "Departure",
    description: "Leisurely morning and transfer back to Colombo.",
    icon: "plane",
    status: "planning",
  },
];

// Standard vs Premium tiers prove value/ROI for the value-driven Indian traveler.
function makeTiers(standard: number): Tier[] {
  const premium = Math.round((standard * 1.38) / 10) * 10;
  return [
    {
      name: "Standard",
      price: standard,
      perks: [
        "4-star hand-picked stays",
        "Private A/C vehicle & driver-guide",
        "Daily breakfast + Veg/Jain options",
        "All entrance fees & transfers",
        "24/7 on-ground support desk",
      ],
    },
    {
      name: "Premium",
      price: premium,
      perks: [
        "5-star luxury resorts & boutique villas",
        "Private chauffeur + English-speaking guide",
        "All meals incl. pure-veg & Jain chef",
        "Priority safari jeep & skip-the-line access",
        "Dedicated WhatsApp concierge",
        "Complimentary Ayurveda spa session",
      ],
    },
  ];
}

const routes: Record<string, RouteStop[]> = {
  "leopards-of-yala": [
    { city: "Colombo", travelTime: "Arrival", attraction: "Gangaramaya Temple & Galle Face" },
    { city: "Galle", travelTime: "2h 30m by coast road", attraction: "Dutch Fort & lighthouse" },
    { city: "Ella", travelTime: "4h scenic train", attraction: "Nine Arch Bridge & tea estates" },
    { city: "Yala", travelTime: "2h 45m drive", attraction: "Leopard safari, Yala National Park" },
    { city: "Mirissa", travelTime: "2h along the coast", attraction: "Whale watching & beaches" },
  ],
  "misty-hills-of-ella": [
    { city: "Colombo", travelTime: "Arrival", attraction: "City highlights" },
    { city: "Kandy", travelTime: "3h drive", attraction: "Temple of the Tooth" },
    { city: "Nuwara Eliya", travelTime: "2h 30m hill climb", attraction: "Tea factories & Gregory Lake" },
    { city: "Ella", travelTime: "2h famous train ride", attraction: "Little Adam's Peak" },
  ],
  "southern-shores-escape": [
    { city: "Colombo", travelTime: "Arrival", attraction: "Pettah markets" },
    { city: "Bentota", travelTime: "1h 45m", attraction: "River safari & water sports" },
    { city: "Galle", travelTime: "1h coast road", attraction: "Galle Fort ramparts" },
    { city: "Mirissa", travelTime: "1h drive", attraction: "Blue whale watching" },
  ],
  "ancient-cultural-triangle": [
    { city: "Colombo", travelTime: "Arrival", attraction: "Independence Square" },
    { city: "Sigiriya", travelTime: "4h drive", attraction: "Lion Rock fortress" },
    { city: "Dambulla", travelTime: "30m drive", attraction: "Golden Cave Temples" },
    { city: "Kandy", travelTime: "2h 30m drive", attraction: "Temple of the Tooth & cultural show" },
  ],
};

const journeys = [
  {
    slug: "leopards-of-yala",
    title: "Leopards of Yala",
    location: "Yala & Southern Coast, Sri Lanka",
    durationDays: 10,
    heroImage:
      "https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=1200&q=80",
    badges: ["Nature Explorer", "Luxury Stay"],
    priceFrom: 3850,
    summary:
      "A ten-day immersion from misty tea country to the wild plains of Yala, tracking the island's elusive leopards before unwinding on the golden southern coast.",
    itinerary: yalaItinerary,
    gallery: [
      "https://images.unsplash.com/photo-1605640840605-14ac1855827b?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1580654712603-eb43273aff33?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1571406252241-db0280bd36cd?auto=format&fit=crop&w=900&q=80",
    ],
    featured: true,
    familyFriendly: true,
    dietaryOptions: ["Veg", "Jain", "Halal"],
    allInclusive: true,
    tiers: makeTiers(3850),
    routeStops: routes["leopards-of-yala"],
  },
  {
    slug: "misty-hills-of-ella",
    title: "Misty Hills of Ella",
    location: "Central Highlands, Sri Lanka",
    durationDays: 6,
    heroImage:
      "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=1200&q=80",
    badges: ["Eco Conscious", "Slow Travel"],
    priceFrom: 1980,
    summary:
      "Ride the world's most beautiful rail line into emerald hill country, waking to mist over the tea estates and trekking to Little Adam's Peak.",
    itinerary: yalaItinerary.slice(0, 6),
    gallery: [
      "https://images.unsplash.com/photo-1546708973-b339540b5162?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1591017403286-fd8493524e1e?auto=format&fit=crop&w=900&q=80",
    ],
    featured: true,
    familyFriendly: true,
    dietaryOptions: ["Veg", "Jain"],
    allInclusive: true,
    tiers: makeTiers(1980),
    routeStops: routes["misty-hills-of-ella"],
  },
  {
    slug: "southern-shores-escape",
    title: "Southern Shores Escape",
    location: "Galle & Mirissa, Sri Lanka",
    durationDays: 7,
    heroImage:
      "https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=1200&q=80",
    badges: ["Beach Luxury", "Whale Watching"],
    priceFrom: 2450,
    summary:
      "Barefoot luxury along the southern coast — colonial Galle, blue whales off Mirissa, and slow sunset evenings on quiet beaches.",
    itinerary: yalaItinerary.slice(0, 7),
    gallery: [
      "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?auto=format&fit=crop&w=900&q=80",
    ],
    featured: false,
    familyFriendly: true,
    dietaryOptions: ["Veg", "Jain", "Halal"],
    allInclusive: true,
    tiers: makeTiers(2450),
    routeStops: routes["southern-shores-escape"],
  },
  {
    slug: "ancient-cultural-triangle",
    title: "Ancient Cultural Triangle",
    location: "Sigiriya & Kandy, Sri Lanka",
    durationDays: 8,
    heroImage:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    badges: ["Heritage", "Story-Driven"],
    priceFrom: 2890,
    summary:
      "Climb the Lion Rock at dawn, wander cave temples, and witness the sacred rituals of Kandy in this journey through the island's ancient heart.",
    itinerary: yalaItinerary.slice(0, 8),
    gallery: [
      "https://images.unsplash.com/photo-1604999333679-b86d54738315?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=900&q=80",
    ],
    featured: false,
    familyFriendly: true,
    dietaryOptions: ["Veg", "Jain"],
    allInclusive: true,
    tiers: makeTiers(2890),
    routeStops: routes["ancient-cultural-triangle"],
  },
];

const stories = [
  {
    slug: "waking-up-to-the-mist",
    title: "Waking Up to the Mist",
    author: "Amara Wijesinghe",
    location: "Ella, Sri Lanka",
    heroImage:
      "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=1400&q=80",
    pullQuote:
      "Waking up to the mist rolling over the tea hills, I understood why they call this the island of serendipity.",
    excerpt:
      "A slow morning in the hill country, where the only sound is the whisper of wind through the tea bushes.",
    readMins: 6,
    body: [
      "There is a particular quiet that belongs only to the highlands of Sri Lanka. Before the sun has fully risen, the mist settles into the valleys like a tide, and the tea estates emerge in soft layers of green and grey.",
      "I had come to Ella expecting a holiday. What I found instead was a rhythm — the slow, deliberate pace of a place that has never been in a hurry. Each morning began the same way: a pot of estate tea on the verandah, the cool air sharp against my skin, and the hills slowly revealing themselves.",
      "Our guide, Nuwan, had grown up among these estates. He spoke of the land the way one speaks of an old friend, pointing out the trail his grandmother once walked to the temple, the spot where the elephants still cross at dusk.",
      "By the third day, I had stopped reaching for my phone. The journey had done what the best journeys do — it had returned me to the present, to the mist, to the unhurried beauty of simply being somewhere true.",
    ].join("\n\n"),
  },
  {
    slug: "the-leopard-at-dawn",
    title: "The Leopard at Dawn",
    author: "Daniel Pereira",
    location: "Yala National Park, Sri Lanka",
    heroImage:
      "https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=1400&q=80",
    pullQuote:
      "For a breathless moment, the leopard and I simply looked at one another across the golden grass.",
    excerpt:
      "Tracking the elusive Sri Lankan leopard through the wild plains of Yala at first light.",
    readMins: 7,
    body: [
      "We left camp in darkness. The jeep rattled along the dirt track as the first grey light crept over the plains, and our tracker, Sena, sat forward, reading the land like a page.",
      "Yala holds the highest density of leopards anywhere on earth, yet they remain ghosts — glimpsed, rarely held. For two hours we followed alarm calls and pugmarks, the anticipation building with every turn.",
      "And then, in a clearing fringed with golden grass, she appeared. A young female, unhurried, her coat catching the early light. For a breathless moment, the leopard and I simply looked at one another across the golden grass.",
      "She slipped back into the scrub as silently as she had come. We sat in stunned silence, and Sena smiled. 'The forest decides,' he said, 'when it wants to be seen.'",
    ].join("\n\n"),
  },
  {
    slug: "a-feast-by-the-sea",
    title: "A Feast by the Sea",
    author: "Priya Nair",
    location: "Mirissa, Sri Lanka",
    heroImage:
      "https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=1400&q=80",
    pullQuote:
      "Every dish carried a story — of the spice gardens inland, of the fishermen who returned at dawn.",
    excerpt:
      "An evening of Sri Lankan flavours on a quiet southern beach, cooked by a chef who learned at his mother's side.",
    readMins: 5,
    body: [
      "The table was set on the sand, lanterns flickering against the dusk. Chef Ranil had spent the afternoon at the market, choosing the day's catch and a basket of spices whose names I could not pronounce.",
      "Dinner unfolded slowly, course after course. A delicate fish curry, coconut sambol bright with lime, hoppers crisped over open flame. Every dish carried a story — of the spice gardens inland, of the fishermen who returned at dawn.",
      "As the waves folded onto the shore, Ranil spoke of cooking as memory, of recipes passed down through generations. To eat here was to taste the island itself.",
    ].join("\n\n"),
  },
];

async function main() {
  console.log("Seeding database...");

  await prisma.booking.deleteMany();
  await prisma.quoteRequest.deleteMany();
  await prisma.story.deleteMany();
  await prisma.journey.deleteMany();

  for (const journey of journeys) {
    await prisma.journey.create({ data: journey });
  }

  for (const story of stories) {
    await prisma.story.create({ data: story });
  }

  console.log(`Seeded ${journeys.length} journeys and ${stories.length} stories.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
