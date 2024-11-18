import React, { useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as turf from "@turf/turf";
import countries from "../data/countries.geo.json"; // Archivo local
import { getLocalTime } from "./timezone";

// Identifica el país según las coordenadas
const getCountryFromCoords = (lat, lng) => {
  const point = turf.point([lng, lat]);
  for (const country of countries.features) {
    const polygon = turf.multiPolygon(country.geometry.coordinates);
    if (turf.booleanPointInPolygon(point, polygon)) {
      console.log(country.properties);
      return country.properties.ADMIN; // Nombre del país
    }
  }
  return null;
};

// Maneja clics en el mapa
function MapClickHandler({ onMapClick }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng);
    },
  });
  return null;
}

// Componente principal del mapa
export const Map = () => {
  const [coords, setCoords] = useState(null);
  const [country, setCountry] = useState(null);

  const handleMapClick = (latlng) => {
    const { lat, lng } = latlng;
    setCoords({ lat, lng });
    const detectedCountry = getCountryFromCoords(lat, lng);
    setCountry(detectedCountry);
  };

  return (
    <div>
      <h1>Mapa 2D Interactivo</h1>
      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <MapClickHandler onMapClick={handleMapClick} />
      </MapContainer>

      <div style={{ marginTop: "20px" }}>
        {coords && (
          <p>
            <strong>Coordenadas:</strong> Lat {coords.lat}, Lng {coords.lng}
          </p>
        )}
        {country ? (
          <div>
            <p>
              <strong>País:</strong> {country}
            </p>
            <p>
              <strong>Hora local:</strong> {getLocalTime(country)}
            </p>
          </div>
        ) : (
          coords && <p>No se detectó ningún país.</p>
        )}
      </div>
    </div>
  );
};
