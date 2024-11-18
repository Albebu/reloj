import PropTypes from "prop-types";

export const TimeTwentyFour = ({ hours, minutes, seconds }) => {
  return (
    <div>
      {hours} {minutes} {seconds}
    </div>
  );
};

TimeTwentyFour.propTypes = {
  hours: PropTypes.string.isRequired,
  minutes: PropTypes.string.isRequired,
  seconds: PropTypes.string.isRequired,
};
