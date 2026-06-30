export const travelStyles = [
  { value: "wildlife", label: "Wildlife & Safari" },
  { value: "cultural", label: "Cultural & Heritage" },
  { value: "beaches", label: "Pristine Beaches" },
  { value: "hill-country", label: "Hill Country Adventure" },
  { value: "wellness", label: "Wellness & Ayurveda" },
  { value: "luxury", label: "Luxury Escape" },
] as const;

export const accommodationGrades = [
  { value: "budget", label: "Budget Homestays" },
  { value: "3-star", label: "3-Star Comfort" },
  { value: "4-star", label: "4-Star Premium" },
  { value: "5-star", label: "5-Star Luxury Resorts" },
  { value: "eco", label: "Eco-Lodges" },
] as const;

export const wizardSteps = [
  { no: 1, label: "Logistics" },
  { no: 2, label: "Travel Style" },
  { no: 3, label: "Accommodation" },
  { no: 4, label: "Contact" },
] as const;

export const DURATION_MIN = 5;
export const DURATION_MAX = 21;

export const WIZARD_STORAGE_KEY = "vsl360-itinerary-wizard";

export type WizardFormData = {
  step: number;
  dateMode: "dates" | "duration";
  arrivalDate: string;
  departureDate: string;
  durationDays: number;
  adults: number;
  children: number;
  travelStyles: string[];
  accommodation: string;
  name: string;
  email: string;
  phone: string;
  specialRequests: string;
};

export const defaultWizardData: WizardFormData = {
  step: 1,
  dateMode: "duration",
  arrivalDate: "",
  departureDate: "",
  durationDays: 10,
  adults: 2,
  children: 0,
  travelStyles: [],
  accommodation: "",
  name: "",
  email: "",
  phone: "",
  specialRequests: "",
};
