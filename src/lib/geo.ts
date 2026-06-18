// Lightweight, dependency-free geographic helpers for the stylised Sri Lanka map.
// Coordinates are real lat/lng, projected into a fixed SVG viewBox so that the
// island outline and every plotted city stay perfectly aligned.

export const MAP_WIDTH = 260;
export const MAP_HEIGHT = 440;

const MIN_LNG = 79.5;
const MAX_LNG = 82.0;
const MIN_LAT = 5.8;
const MAX_LAT = 9.95;
const PAD = 18;

export function project(lat: number, lng: number): { x: number; y: number } {
  const x =
    PAD + ((lng - MIN_LNG) / (MAX_LNG - MIN_LNG)) * (MAP_WIDTH - 2 * PAD);
  const y =
    PAD + ((MAX_LAT - lat) / (MAX_LAT - MIN_LAT)) * (MAP_HEIGHT - 2 * PAD);
  return { x, y };
}

// Approximate lat/lng for the cities used across journeys.
export const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  Colombo: { lat: 6.93, lng: 79.86 },
  Negombo: { lat: 7.21, lng: 79.84 },
  Kandy: { lat: 7.29, lng: 80.63 },
  Sigiriya: { lat: 7.95, lng: 80.75 },
  Dambulla: { lat: 7.86, lng: 80.65 },
  "Nuwara Eliya": { lat: 6.95, lng: 80.78 },
  Ella: { lat: 6.87, lng: 81.05 },
  Yala: { lat: 6.37, lng: 81.52 },
  Mirissa: { lat: 5.95, lng: 80.46 },
  Galle: { lat: 6.03, lng: 80.22 },
  Bentota: { lat: 6.42, lng: 80.0 },
  Anuradhapura: { lat: 8.31, lng: 80.4 },
  Trincomalee: { lat: 8.59, lng: 81.21 },
  Jaffna: { lat: 9.66, lng: 80.02 },
  "Arugam Bay": { lat: 6.84, lng: 81.83 },
};

// Coastline boundary (clockwise) used to draw the island silhouette.
const OUTLINE: Array<[number, number]> = [
  [9.83, 80.21],
  [9.5, 80.05],
  [8.98, 79.9],
  [8.4, 79.78],
  [8.0, 79.72],
  [7.55, 79.7],
  [7.21, 79.82],
  [6.93, 79.83],
  [6.4, 79.97],
  [6.03, 80.21],
  [5.92, 80.46],
  [6.02, 80.79],
  [6.1, 81.12],
  [6.32, 81.43],
  [6.84, 81.83],
  [7.25, 81.78],
  [7.72, 81.69],
  [8.3, 81.4],
  [8.57, 81.23],
  [8.85, 81.0],
  [9.2, 80.75],
  [9.6, 80.5],
  [9.83, 80.21],
];

// Convert projected points into a smooth closed path (Catmull-Rom -> Bezier).
export function islandPath(): string {
  const pts = OUTLINE.map(([lat, lng]) => project(lat, lng));
  const n = pts.length;
  let d = `M ${pts[0].x.toFixed(1)} ${pts[0].y.toFixed(1)} `;
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[(i + 2) % n];
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += `C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(
      1,
    )}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)} `;
  }
  return d + "Z";
}
