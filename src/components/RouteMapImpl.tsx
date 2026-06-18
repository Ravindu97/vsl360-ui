"use client";

import "leaflet/dist/leaflet.css";
import { useMemo } from "react";
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

  const positions = points.map((p) => [p.lat, p.lng] as [number, number]);
  const bounds =
    positions.length > 0 ? L.latLngBounds(positions) : undefined;

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

      {positions.length > 1 ? (
        <Polyline
          positions={positions}
          pathOptions={{
            color: "#d18d36",
            weight: 3.5,
            opacity: 0.9,
            lineJoin: "round",
            lineCap: "round",
          }}
        />
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
