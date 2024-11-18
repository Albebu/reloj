import { Times } from "./timeFormats/Times";
import { Dates } from "./dateFormats/Dates";
import { Clock } from "./clock/Clock";
import { Map } from "./Map";
import { useState, useEffect } from "react";

export const Content = () => {
  const [actualDate, setActualDate] = useState(new Date());

  // Actualizar la hora actual cada segundo
  useEffect(() => {
    const interval = setInterval(() => {
      setActualDate(new Date());
    }, 1000);
    return () => clearInterval(interval); // Limpiar el intervalo al desmontar
  }, []);

  // Variables de formato de fecha y hora
  const date = actualDate.getDate();
  const month = actualDate.getMonth() + 1;
  const year = actualDate.getFullYear();

  const hours = actualDate.getHours();
  const minutes = actualDate.getMinutes();
  const seconds = actualDate.getSeconds();

  return (
    <div className="flex flex-col text-xl">
      <Times hours={hours} minutes={minutes} seconds={seconds} />
      <Dates date={date} month={month} year={year} />
      <Clock />
      <Map />
    </div>
  );
};
