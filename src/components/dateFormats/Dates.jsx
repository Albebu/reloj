import { DateExtended } from "./DateExtended";
import { DateSimplified } from "./DateSimplified";
import { DateNumber } from "./DateNumber";
import PropTypes from "prop-types";
import { useState } from "react";

export const Dates = ({ date, month, year }) => {
  const [format, setFormat] = useState("extended");

  date = date.toString().padStart(2, "0");
  month = month.toString().padStart(2, "0");
  year = year.toString().padStart(2, "0");

  const handleChange = (e) => {
    setFormat(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form onSubmit={handleFormSubmit}>
        <label>
          <input
            type="radio"
            name="formatoFecha"
            value="extended"
            checked={format === "extended"}
            onChange={handleChange}
          />
          Number date
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="formatoFecha"
            value="simplified"
            checked={format === "simplified"}
            onChange={handleChange}
          />
          Simplified date
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="formatoFecha"
            value="number"
            checked={format === "number"}
            onChange={handleChange}
          />
          Extended date
        </label>
      </form>
      {format === "extended" && (
        <DateExtended date={date} month={month} year={year} />
      )}
      {format === "simplified" && (
        <DateSimplified date={date} month={month} year={year} />
      )}
      {format === "number" && (
        <DateNumber date={date} month={month} year={year} />
      )}
    </>
  );
};

Dates.propTypes = {
  date: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
};
