import React, { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  useMapEvents,
  Marker,
  Popup,
  Circle,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as turf from "@turf/turf";
import countries from "../data/countries.geo.json"; // Archivo local
import timezonesByCountry from "../data/timezone.json"; // Archivo local

// Función para detectar el país basado en las coordenadas
const getCountryFromCoords = (lat, lng, countries) => {
  const point = turf.point([lng, lat]);
  for (const country of countries.features) {
    const geometry = country.geometry;
    if (geometry.type === "Polygon") {
      const polygon = turf.polygon(geometry.coordinates);
      if (turf.booleanPointInPolygon(point, polygon)) {
        return country.properties.name;
      }
    } else if (geometry.type === "MultiPolygon") {
      const multiPolygon = turf.multiPolygon(geometry.coordinates);
      if (turf.booleanPointInPolygon(point, multiPolygon)) {
        return country.properties.name;
      }
    }
  }
  return null; // Si no se detecta país
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

const customIcon = L.icon({
  iconUrl:
    "https://images.freeimages.com/image/thumbs/6b3/orange-location-tag-icon-art-5701390.png",
  iconSize: [40, 40],
  iconAnchor: [20, 35],
});

// Componente principal del mapa
export const Map = ({ setOffset, setLocations, isDarkMode }) => {
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });
  const [country, setCountry] = useState(null);
  const [circles, setCircles] = useState([]); // Lista de círculos en el mapa

  const tileUrl = isDarkMode
    ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

  const color = isDarkMode ? "orange" : "red";

  // Maneja clic en el mapa
  const handleMapClick = (latlng) => {
    const { lat, lng } = latlng;
    setCoords({ lat, lng });
    const detectedCountry = getCountryFromCoords(lat, lng, countries);
    setCountry(detectedCountry);

    let timezoneOffset = null;
    if (detectedCountry) {
      const timezoneData = timezonesByCountry.countries.find(
        (tz) => tz.name === detectedCountry
      );
      if (timezoneData) {
        timezoneOffset = timezoneData.timezone_offset;
        setOffset(timezoneOffset);
      }
    }

    // Actualizar lista de países y horas (máximo 5)
    setLocations((prev) => {
      const updated = [
        ...prev,
        { country: detectedCountry, offset: timezoneOffset || 0 },
      ];
      return updated.slice(-5); // Mantener solo los últimos 5 elementos
    });

    // Agregar un nuevo círculo al mapa
    setCircles((prev) => {
      const updated = [...prev, { lat, lng }];
      return updated.slice(-5); // Mantener solo los últimos 5 círculos
    });
  };

  // Actualizar horas locales cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setLocations((prev) =>
        prev.map((loc) => {
          const now = new Date();
          const localTime = new Date(
            now.getTime() + loc.offset * 3600000
          ).toLocaleTimeString("es-ES");
          return { ...loc, time: localTime };
        })
      );
    }, 1000);

    return () => clearInterval(interval); // Limpiar intervalo al desmontar
  }, []);

  return (
    <div className="w-[80%]">
      <h1>Mapa 2D Interactivo</h1>
      <MapContainer
        center={[41.3874, 2.1686]} // Centro inicial del mapa
        zoom={13}
        minZoom={2}
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "8px",
          overflow: "hidden",
        }}
        maxBoundsViscosity={1.0} // Cuánta resistencia al salir de los límites
      >
        <TileLayer
          url={tileUrl}
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/">CARTO</a>'
        />

        {circles.map((circle, index) => (
          <Circle
            key={index}
            center={[circle.lat, circle.lng]}
            radius={10000} // 50 km
            color={color}
          />
        ))}
        <Marker position={[coords.lat, coords.lng]} icon={customIcon}>
          <Popup>
            País: {country || "No detectado"} <br />
            Coordenadas: {coords.lat.toFixed(2)}, {coords.lng.toFixed(2)}
          </Popup>
        </Marker>
        <MapClickHandler onMapClick={handleMapClick} />
      </MapContainer>
    </div>
  );
};
