import { Times } from "./timeFormats/Times";
import { Dates } from "./dateFormats/Dates";
import { Clock } from "./clock/Clock";
import { Map } from "./Map";
import { useState, useEffect } from "react";

export const Content = ({ isDarkMode }) => {
  const [actualDate, setActualDate] = useState(new Date());
  const [offset, setOffset] = useState(0);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (offset !== null && offset !== undefined) {
        setActualDate(new Date(new Date().getTime() + offset * 3600000));
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [offset]);

  const date = actualDate.getDate();
  const month = actualDate.getMonth() + 1;
  const year = actualDate.getFullYear();

  const hours = actualDate.getHours();
  const minutes = actualDate.getMinutes();
  const seconds = actualDate.getSeconds();

  return (
      <div className={`min-h-screen w-full ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'} transition-colors duration-300`}>
        <div className="container mx-auto p-4 h-screen flex flex-col">
          <div className="flex flex-col md:flex-row h-full gap-4">
            <div className="w-full md:w-1/3 flex flex-col gap-4">
              <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-all duration-300`}>
                <Clock />
              </div>
              <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-all duration-300 flex-grow`}>
                <Dates month={month} year={year} date={date} />
                <Times hours={hours} minutes={minutes} seconds={seconds} />
              </div>
            </div>
            <div className="w-full md:w-2/3 flex flex-col gap-4">
              <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-all duration-300 flex-grow`}>
                <Map
                    setOffset={setOffset}
                    setLocations={setLocations}
                    isDarkMode={isDarkMode}
                />
              </div>
              <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'} transition-all duration-300`}>
                <h2 className="text-xl font-bold mb-4">Recent Locations</h2>
                  {locations.length > 0 ? (
                      <ul className="space-y-2">
                        {locations.map((loc, index) => (
                            <li key={index} className="flex justify-between items-center">
                              <span>{loc.country || "Unknown"}</span>
                              <span className="font-mono">{loc.time}</span>
                            </li>
                        ))}
                      </ul>
                  ) : (
                      <p className="text-center text-gray-500">No locations recorded yet.</p>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

