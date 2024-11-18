import PropTypes from "prop-types";

export const DateSimplified = ({ date, month, year }) => {
  year = year.toString().slice(-2);

  return (
    <div>
      {date}/{month}/{year}
    </div>
  );
};

DateSimplified.propTypes = {
  date: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};
