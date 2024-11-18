export const Date = ({ hour }) => {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let hours12 = hours % 12;
  let amPm = hours >= 12 ? "pm" : "am";

  return hour ? hours : minutes;
};
