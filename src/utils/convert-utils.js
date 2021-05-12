const addZeroAheadToDate = (num) => `${(`0${num.toString()}`).slice(-2)}`;

// Format (00.00.00)
export const formattedDate = (timestamp, divider) => {
  const time = new Date(timestamp);
  return `${addZeroAheadToDate(time.getMonth() + 1)}${divider}${addZeroAheadToDate(time.getDate())}${divider}${time.getFullYear().toString().slice(-2)}`;
};

export const convertDateToMonths = (timestamp) => {
  const date = new Date(timestamp);
  return (date.getFullYear() - 1970) * 12 + date.getMonth() + 1;
};

export const randomHexColor = () => {
  let color = '';
  const type = ['char', 'digit'];
  const char = ['a', 'b', 'c', 'd', 'e', 'f'];

  for (let i = 1; i <= 6; i++) {
    const typeId = Math.round(Math.random());
    const typeValue = type[typeId];

    if (typeValue === 'digit') {
      const randomDigit = Math.round(Math.random() * 9);
      color += `${randomDigit}`;
    }
    if (typeValue === 'char') {
      const charId = Math.round(Math.random() * 5);
      const randomChar = char[charId];
      color += `${randomChar}`;
    }
  }
  return `#${color}`;
};
