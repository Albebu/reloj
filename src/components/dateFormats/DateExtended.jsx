import PropTypes from "prop-types";

export const DateExtended = ({ date, month, year }) => {
  return (
    <div>
      {date} de {month} de {year}
    </div>
  );
};

DateExtended.propTypes = {
  date: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
};
