export const getFormatHourAndMinutes = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formatedString = `${hours > 10 ? hours : '0' + hours}:${
    minutes > 10 ? minutes : '0' + minutes
  }`;
  return formatedString;
};
