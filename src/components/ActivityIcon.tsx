import {
  Ship,
  Compass,
  TrainFront,
  Flower2,
  Mountain,
  Landmark,
  Binoculars,
  TreePalm,
  UtensilsCrossed,
  Plane,
  MapPin,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  boat: Ship,
  compass: Compass,
  train: TrainFront,
  spa: Flower2,
  mountain: Mountain,
  landmark: Landmark,
  binoculars: Binoculars,
  palm: TreePalm,
  dining: UtensilsCrossed,
  plane: Plane,
};

export function ActivityIcon({
  name,
  className = "h-5 w-5",
}: {
  name: string;
  className?: string;
}) {
  const Icon = map[name] ?? MapPin;
  return <Icon className={className} strokeWidth={1.8} />;
}
