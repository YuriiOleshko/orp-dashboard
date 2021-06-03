const addZeroAheadToDate = (num) => `${(`0${num.toString()}`).slice(-2)}`;

// Format (00.00.00)
export const formattedDate = (timestamp, divider) => {
  const time = new Date(timestamp);
  return `${addZeroAheadToDate(time.getMonth() + 1)}${divider}${addZeroAheadToDate(time.getDate())}${divider}${time.getFullYear().toString().slice(-2)}`;
};

export const convertDateToMonths = (timestamp, monthsText, daysText) => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const daysInMonth = new Date(year, month, 0).getDate();

  const totalDays = Math.ceil(timestamp / (1000 * 60 * 60 * 24));
  const restMonthsDec = totalDays / daysInMonth;
  const restMonths = Math.trunc(restMonthsDec);
  const restDays = Math.ceil((restMonthsDec - restMonths) * daysInMonth);
  return `${restMonths} ${monthsText} ${restDays} ${daysText}`;
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

export const noDublicateElements = (arr1, arr2, arrg = 'path') => {
  const awesomeArr = arr1.concat(arr2);
  const arrayIndexs = [];
  const currentlyArray = [];
  awesomeArr.map((el) => el[arrg]).forEach((elem, index) => {
    if (arrayIndexs.indexOf(JSON.stringify(elem)) === -1) {
      arrayIndexs.push(JSON.stringify(elem));
      currentlyArray.push(awesomeArr[index]);
    }
  });

  return currentlyArray;
};
