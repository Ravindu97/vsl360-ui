"use client";

import "leaflet/dist/leaflet.css";
import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
  Tooltip,
} from "react-leaflet";
import { CITY_COORDS } from "@/lib/geo";
import type { RouteStop } from "@/lib/types";

type LatLng = [number, number];

// Fetch a road-following driving route through all stops from the free,
// keyless OSRM public API. Returns null on failure (caller falls back to lines).
async function fetchRoadRoute(
  positions: LatLng[],
  signal: AbortSignal,
): Promise<LatLng[] | null> {
  if (positions.length < 2) return null;
  const coords = positions.map(([lat, lng]) => `${lng},${lat}`).join(";");
  const url = `https://router.project-osrm.org/route/v1/driving/${coords}?overview=full&geometries=geojson`;
  try {
    const res = await fetch(url, { signal });
    if (!res.ok) return null;
    const data = await res.json();
    const line = data?.routes?.[0]?.geometry?.coordinates;
    if (!Array.isArray(line)) return null;
    // GeoJSON is [lng, lat]; Leaflet wants [lat, lng].
    return line.map((c: [number, number]) => [c[1], c[0]] as LatLng);
  } catch {
    return null;
  }
}

function numberIcon(n: number, active: boolean) {
  return L.divIcon({
    className: "",
    html: `<div style="display:grid;place-items:center;width:30px;height:30px;border-radius:9999px;background:${
      active ? "#d18d36" : "#2a435d"
    };color:#fff;font-family:var(--font-display,sans-serif);font-weight:700;font-size:13px;border:2px solid #ffffff;box-shadow:0 3px 8px rgba(31,50,71,.35)">${n}</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -16],
  });
}

type Point = RouteStop & { lat: number; lng: number };

export default function RouteMapImpl({ stops }: { stops: RouteStop[] }) {
  const points = useMemo<Point[]>(
    () =>
      stops
        .map((s) => {
          const c = CITY_COORDS[s.city];
          return c ? { ...s, lat: c.lat, lng: c.lng } : null;
        })
        .filter((p): p is Point => p !== null),
    [stops],
  );

  const positions = useMemo(
    () => points.map((p) => [p.lat, p.lng] as LatLng),
    [points],
  );
  const bounds =
    positions.length > 0 ? L.latLngBounds(positions) : undefined;

  // Road geometry following actual roads (OSRM); falls back to straight lines.
  const [roadPath, setRoadPath] = useState<LatLng[] | null>(null);

  useEffect(() => {
    if (positions.length < 2) return;
    const controller = new AbortController();
    fetchRoadRoute(positions, controller.signal).then((path) => {
      if (path) setRoadPath(path);
    });
    return () => controller.abort();
  }, [positions]);

  const linePositions = roadPath ?? positions;

  return (
    <MapContainer
      bounds={bounds}
      boundsOptions={{ padding: [40, 40] }}
      center={bounds ? undefined : [7.8, 80.7]}
      zoom={bounds ? undefined : 7}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        maxZoom={19}
      />

      {linePositions.length > 1 ? (
        <>
          {/* Soft casing underneath for an elegant route look */}
          <Polyline
            positions={linePositions}
            pathOptions={{
              color: "#ffffff",
              weight: 7,
              opacity: 0.9,
              lineJoin: "round",
              lineCap: "round",
            }}
          />
          <Polyline
            positions={linePositions}
            pathOptions={{
              color: "#d18d36",
              weight: 3.5,
              opacity: 0.95,
              lineJoin: "round",
              lineCap: "round",
            }}
          />
        </>
      ) : null}

      {points.map((p, i) => (
        <Marker
          key={`${p.city}-${i}`}
          position={[p.lat, p.lng]}
          icon={numberIcon(i + 1, i === 0)}
        >
          <Tooltip direction="top" offset={[0, -16]}>
            {p.city}
          </Tooltip>
          <Popup>
            <div style={{ minWidth: 160 }}>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--font-display,sans-serif)",
                  fontWeight: 700,
                  fontSize: 15,
                  color: "#2a435d",
                }}
              >
                {p.city}
              </p>
              <p
                style={{
                  margin: "4px 0 0",
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: ".05em",
                  color: "#4e6e5d",
                }}
              >
                {p.travelTime}
              </p>
              <p style={{ margin: "6px 0 0", fontSize: 12, color: "#52606d" }}>
                {p.attraction}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
