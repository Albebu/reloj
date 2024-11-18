import { TimeTwelve } from "./TimeTwelve";
import { TimeTwentyFour } from "./TimeTwentyFour";
import PropTypes from "prop-types";
import { useState } from "react";

export const Times = ({ hours, minutes, seconds }) => {
  const [isTwelveHourFormat, setIsTwelveHourFormat] = useState(true);
  hours = hours.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");
  seconds = seconds.toString().padStart(2, "0");

  const handleButtonClick = () => {
    setIsTwelveHourFormat((prev) => !prev);
  };

  return (
    <div className="flex flex-col">
      <button onClick={handleButtonClick}>
        {isTwelveHourFormat ? "12-hours format" : "24-hours format"}
      </button>
      {isTwelveHourFormat ? (
        <TimeTwelve hours={hours} minutes={minutes} seconds={seconds} />
      ) : (
        <TimeTwentyFour hours={hours} minutes={minutes} seconds={seconds} />
      )}
    </div>
  );
};

Times.propTypes = {
  hours: PropTypes.number.isRequired,
  minutes: PropTypes.number.isRequired,
  seconds: PropTypes.number.isRequired,
};
