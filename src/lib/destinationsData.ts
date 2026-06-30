export type SriLankaDestination = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  image: string;
  href: string;
};

export const sriLankaDestinations: SriLankaDestination[] = [
  {
    id: "sigiriya-dambulla",
    title: "Sigiriya & Dambulla",
    subtitle: "Cultural Triangle Hub",
    description: "Historical heritage, ancient fortresses, and cave temples at the heart of Sri Lanka's royal past.",
    highlights: ["Lion Rock fortress", "Golden Cave Temples", "Ancient city ruins"],
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=80",
    href: "/journeys/ancient-cultural-triangle",
  },
  {
    id: "ella-nuwara-eliya",
    title: "Ella & Nuwara Eliya",
    subtitle: "Hill Country Highlands",
    description: "Emerald tea estates, misty waterfalls, and scenic train rides through the central highlands.",
    highlights: ["Nine Arch Bridge", "Tea factory tours", "Trekking trails"],
    image:
      "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=1200&q=80",
    href: "/journeys/misty-hills-of-ella",
  },
  {
    id: "yala-wilpattu",
    title: "Yala & Wilpattu",
    subtitle: "National Wildlife Parks",
    description: "Leopard safaris and untamed biodiversity across Sri Lanka's premier national parks.",
    highlights: ["Leopard tracking", "Dawn game drives", "Birdwatching"],
    image:
      "https://images.unsplash.com/photo-1456926631375-92c8ce872def?auto=format&fit=crop&w=1200&q=80",
    href: "/journeys/leopards-of-yala",
  },
  {
    id: "south-coast",
    title: "Mirissa, Galle & Bentota",
    subtitle: "Southern Coastal Belts",
    description: "Surfing breaks, whale watching, and Dutch fort architecture along the golden south coast.",
    highlights: ["Galle Fort ramparts", "Blue whale watching", "Beach resorts"],
    image:
      "https://images.unsplash.com/photo-1586500036706-41963de24d8b?auto=format&fit=crop&w=1200&q=80",
    href: "/journeys/southern-shores-escape",
  },
  {
    id: "kandy",
    title: "Kandy",
    subtitle: "Sacred City",
    description: "Temple of the Tooth, Kandyan cultural exhibits, and the spiritual heart of the island.",
    highlights: ["Temple of the Tooth", "Cultural dance shows", "Botanical gardens"],
    image:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80",
    href: "/journeys/ancient-cultural-triangle",
  },
];
