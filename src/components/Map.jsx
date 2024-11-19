import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Circle,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as turf from "@turf/turf";
import countries from "../data/countries.geo.json"; // Archivo local
import timezonesByCountry from "../data/timezone.json"; // Archivo local

// Función para detectar el país basado en las coordenadas
const getCountryFromCoords = (lat, lng, countries) => {
  // Crea un punto con las coordenadas
  const point = turf.point([lng, lat]);

  // Iterar sobre cada país
  for (const country of countries.features) {
    const geometry = country.geometry;

    // Verificar si el punto está dentro del polígono del país
    // Diferenciar entre polígonos simples y multipolígonos
    if (geometry.type === "Polygon") {
      const polygon = turf.polygon(geometry.coordinates);
      if (turf.booleanPointInPolygon(point, polygon)) {
        return country.properties.name; // Devolver el nombre del país y el id
      }
    } else if (geometry.type === "MultiPolygon") {
      const multiPolygon = turf.multiPolygon(geometry.coordinates);
      if (turf.booleanPointInPolygon(point, multiPolygon)) {
        return country.properties.name; // Devolver el nombre del país y el id como array
      }
    }
  }
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

const getLocalTime = (country) => {
  let offset = null;

  timezonesByCountry.countries.forEach((timezone) => {
    if (timezone.name === country) {
      offset = timezone.timezone_offset;
    }
  });

  if (offset === 0.0) null;
  else if (!offset) return "No se encontró la zona horaria";

  const now = new Date();
  const localTime = new Date(now.getTime() + offset * 3600000);

  return localTime.toLocaleString("es-ES");
};

// Componente principal del mapa
export const Map = () => {
  const [coords, setCoords] = useState({
    lat: 0,
    lng: 0,
  });
  const [country, setCountry] = useState(null);

  const handleMapClick = (latlng) => {
    const { lat, lng } = latlng;
    setCoords({ lat, lng });
    console.log(coords);
    const detectedCountry = getCountryFromCoords(lat, lng, countries);
    setCountry(detectedCountry);
  };

  return (
    <div>
      <h1>Mapa 2D Interactivo</h1>
      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: "500px", width: "80%" }}
      >
        <Circle center={[0, 0]} radius={200}></Circle>
        <Marker position={[coords.lat, coords.lng]}>
          <Popup>A pretty css popup</Popup>
        </Marker>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <MapClickHandler onMapClick={handleMapClick} />
      </MapContainer>

      <div style={{ marginTop: "20px" }}>
        {coords && (
          <p>
            <strong>Coordenadas:</strong> Lat {coords.lat.toFixed(2)}, Lng{" "}
            {coords.lng.toFixed(2)}
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
