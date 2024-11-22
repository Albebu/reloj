import { Times } from "./timeFormats/Times";
import { Dates } from "./dateFormats/Dates";
import { Clock } from "./clock/Clock";
import { Map } from "./Map";
import { useState, useEffect } from "react";

export const Content = ({ isDarkMode }) => {
  const [actualDate, setActualDate] = useState(new Date());
  const [offset, setOffset] = useState(0); // Inicializamos offset en 0
  const [locations, setLocations] = useState([]); // Lista de países y horas

  // Actualizar la hora actual cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      if (offset !== null && offset !== undefined) {
        setActualDate(new Date(new Date().getTime() + offset * 3600000));
      }
    }, 1000);
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, [offset]);

  // Variables de formato de fecha y hora
  const date = actualDate.getDate();
  const month = actualDate.getMonth() + 1;
  const year = actualDate.getFullYear();

  const hours = actualDate.getHours();
  const minutes = actualDate.getMinutes();
  const seconds = actualDate.getSeconds();

  return (
    <div className="flex justify-center w-screen h-screen text-xl text-white p-4 font-host bg-primary ">
      <div className="flex flex-row w-full shadow">
        <div className="flex flex-col w-[40%] items-center">
          <Clock />
          <Dates date={date} month={month} year={year} />
          <Times hours={hours} minutes={minutes} seconds={seconds} />
          <div style={{ marginTop: "20px" }}>
            <h2>Últimas 5 ubicaciones</h2>
            {locations.length > 0 ? (
              <ul>
                {locations.map((loc, index) => (
                  <li key={index}>
                    <strong>País:</strong> {loc.country || "No detectado"} -{" "}
                    <strong>Hora local:</strong> {loc.time}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay ubicaciones registradas.</p>
            )}
          </div>
        </div>
        <div className="w-[60%]">
          <Map
            setOffset={setOffset}
            setLocations={setLocations}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </div>
  );
};
