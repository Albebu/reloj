import PropTypes from "prop-types";

export const TimeTwelve = ({ hours, minutes, seconds }) => {
  hours = (parseInt(hours) % 12 || 12).toString().padStart(2, "0");

  return (
    <div>
      {hours} {minutes} {seconds} {hours >= 12 ? "PM" : "AM"}
    </div>
  );
};

TimeTwelve.propTypes = {
  hours: PropTypes.string.isRequired,
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired,
};
