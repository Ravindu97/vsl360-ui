export type FaqCategory = {
  id: string;
  label: string;
};

export type FaqItem = {
  category: string; // matches FaqCategory.id
  question: string;
  answer: string;
};

export const faqCategories: FaqCategory[] = [
  { id: "visa", label: "Visa & Entry" },
  { id: "booking", label: "Booking & Payments" },
  { id: "logistics", label: "Logistics & Safety" },
  { id: "travel", label: "Travel & Destinations" },
];

export const faqItems: FaqItem[] = [
  // Visa & Entry Frameworks
  {
    category: "visa",
    question: "How do I obtain a tourist visa for Sri Lanka?",
    answer:
      "Travelers can apply online via the official ETA (Electronic Travel Authorization) portal. Ensure passports have at least 6 months validity from the arrival date.",
  },
  {
    category: "visa",
    question: "Do Indian passport holders need a visa?",
    answer:
      "Yes. Most nationalities, including Indian travelers, need an approved ETA before arrival. It is a quick online process and your destination expert can guide you through every step.",
  },
  // Booking, Deposits & Cancellation Policies
  {
    category: "booking",
    question: "What are the standard payment timelines for custom tours?",
    answer:
      "To confirm bookings, a specific percentage deposit is required. The balance is processed according to the locked tour package timeline before arrival.",
  },
  {
    category: "booking",
    question: "What is your cancellation policy?",
    answer:
      "Cancellation terms depend on the package and how close it is to your travel dates. Your destination expert shares the exact terms in writing before you confirm anything.",
  },
  {
    category: "booking",
    question: "Which payment methods do you accept?",
    answer:
      "We accept major credit and debit cards, PayPal, and bank transfers. Every quote is all-inclusive with transparent pricing and no hidden fees.",
  },
  // In-Country Logistics & Safety Standards
  {
    category: "logistics",
    question: "What type of transportation is provided during the tours?",
    answer:
      "We feature modern, fully air-conditioned vehicles (sedans, vans, or mini-buses depending on group size) paired with registered, English-speaking tourist drivers/guides.",
  },
  {
    category: "logistics",
    question: "Is Sri Lanka safe for travelers?",
    answer:
      "Yes. Our 24/7 on-ground support desk monitors every journey and is reachable at any time, so help is always a message away.",
  },
  {
    category: "logistics",
    question: "Are your tours family-friendly?",
    answer:
      "Absolutely. Itineraries can be tailored for families with child-friendly stays, flexible pacing, and Veg, Jain, or Halal meal options on request.",
  },
  // Travel & Destinations
  {
    category: "travel",
    question: "When is the best time to visit Sri Lanka?",
    answer:
      "It is a year-round destination. The west and south coasts and the hill country shine from December to April, while the east coast is best from May to September. We plan around your dates.",
  },
  {
    category: "travel",
    question: "Can meals accommodate Veg, Jain, or Halal diets?",
    answer:
      "Yes. Dietary preferences are arranged across your entire journey on request, including pure-veg and Jain menus.",
  },
];
