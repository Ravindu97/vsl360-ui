export type ItineraryStatus = "confirmed" | "planning";

export type ItineraryDay = {
  day: number;
  title: string;
  description: string;
  icon: string;
  status: ItineraryStatus;
};

export type LineItem = {
  label: string;
  amount: number;
};

export type Tier = {
  name: string;
  price: number;
  perks: string[];
};

export type RouteStop = {
  city: string;
  travelTime: string;
  attraction: string;
};
