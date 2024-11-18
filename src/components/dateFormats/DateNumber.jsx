import PropTypes from "prop-types";

export const DateNumber = ({ date, month, year }) => {
  return (
    <div>
      {date}/{month}/{year}
    </div>
  );
};

DateNumber.propTypes = {
  date: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};
