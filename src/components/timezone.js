const timezonesByCountry = {
  "United States": "America/New_York",
  Spain: "Europe/Madrid",
  Japan: "Asia/Tokyo",
  India: "Asia/Kolkata",
  Brazil: "America/Sao_Paulo",
  Australia: "Australia/Sydney",
  // Agrega más países y zonas horarias
};

export const getLocalTime = (country) => {
  const timezone = timezonesByCountry[country];
  if (!timezone) return "Zona horaria no disponible";
  const time = new Date().toLocaleString("es-ES", { timeZone: timezone });
  return `${time} (${timezone})`;
};
