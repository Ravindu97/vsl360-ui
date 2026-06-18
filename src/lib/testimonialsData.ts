export type TripType =
  | "Family"
  | "Luxury"
  | "Honeymoon"
  | "Adventure"
  | "Wellness";

export type Review = {
  name: string;
  country: string;
  tripType: TripType;
  travelDate: string; // human-readable
  isoDate: string; // for schema (YYYY-MM-DD)
  rating: number; // 1-5
  quote: string;
};

export type VideoTestimonial = {
  youtubeId: string;
  title: string;
  author: string;
  location: string;
};

export const aggregate = {
  ratingValue: 4.9,
  reviewCount: 2654,
  bestRating: 5,
};

export const tripTypes: TripType[] = [
  "Family",
  "Luxury",
  "Honeymoon",
  "Adventure",
  "Wellness",
];

export const reviews: Review[] = [
  {
    name: "Aarav Mehta",
    country: "Mumbai, India",
    tripType: "Family",
    travelDate: "March 2025",
    isoDate: "2025-03-18",
    rating: 5,
    quote:
      "From the first call, our expert designed a flawless 8-day itinerary. Veg and Jain meals were arranged everywhere, transfers were seamless, and the leopard safari was unforgettable. Worth every rupee.",
  },
  {
    name: "Sharanya Iyer",
    country: "Bengaluru, India",
    tripType: "Luxury",
    travelDate: "February 2025",
    isoDate: "2025-02-09",
    rating: 5,
    quote:
      "The transparency won me over — one all-inclusive price, no surprises. Our destination expert was on WhatsApp the entire trip. Truly high-touch, premium service.",
  },
  {
    name: "James & Olivia Carter",
    country: "London, UK",
    tripType: "Honeymoon",
    travelDate: "January 2025",
    isoDate: "2025-01-22",
    rating: 5,
    quote:
      "The most romantic ten days of our lives. Private dinners on the beach, a misty morning in the hills, and not a single thing we had to worry about. Magical.",
  },
  {
    name: "Daniel Pereira",
    country: "Lisbon, Portugal",
    tripType: "Adventure",
    travelDate: "December 2024",
    isoDate: "2024-12-15",
    rating: 5,
    quote:
      "Surfing in Arugam Bay, hiking to hidden waterfalls, the dawn safari in Yala — the pacing was perfect and the guides knew every secret spot.",
  },
  {
    name: "Priya Nair",
    country: "Dubai, UAE",
    tripType: "Wellness",
    travelDate: "November 2024",
    isoDate: "2024-11-03",
    rating: 5,
    quote:
      "An Ayurveda-focused journey that left me restored. The spa sessions, the slow mornings, the food — every detail was thoughtfully arranged.",
  },
  {
    name: "The Fernandes Family",
    country: "Goa, India",
    tripType: "Family",
    travelDate: "April 2025",
    isoDate: "2025-04-12",
    rating: 5,
    quote:
      "Travelling with kids can be stressful, but the flexible pacing and family-friendly stays made it effortless. The children still talk about the train ride to Ella.",
  },
  {
    name: "Sophie Laurent",
    country: "Paris, France",
    tripType: "Luxury",
    travelDate: "October 2024",
    isoDate: "2024-10-19",
    rating: 5,
    quote:
      "Boutique villas, a private chauffeur, and impeccable taste in every choice. VSL 360 understood exactly the kind of refined experience we wanted.",
  },
  {
    name: "Rahul & Ananya",
    country: "Delhi, India",
    tripType: "Honeymoon",
    travelDate: "March 2025",
    isoDate: "2025-03-02",
    rating: 4,
    quote:
      "A beautifully curated honeymoon. Loved the whale watching in Mirissa and the sunset at Galle Fort. Responsive team that adjusted plans on the fly.",
  },
];

// Sample video testimonials. Replace youtubeId with your real testimonial videos.
export const videos: VideoTestimonial[] = [
  {
    youtubeId: "1La4QzGeaaQ",
    title: "Our 10 days across Sri Lanka",
    author: "The Carters",
    location: "Honeymoon · 2025",
  },
  {
    youtubeId: "5qap5aO4i9A",
    title: "A family adventure to remember",
    author: "The Fernandes Family",
    location: "Family · 2025",
  },
  {
    youtubeId: "hHW1oY26kxQ",
    title: "Wellness & wildlife in the hills",
    author: "Priya N.",
    location: "Wellness · 2024",
  },
];
