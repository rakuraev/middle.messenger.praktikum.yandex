export const getFormatHourAndMinutes = (date: Date) => {
  const formatedString = `${date.getHours()}:${date.getMinutes()}`;
  return formatedString;
};
