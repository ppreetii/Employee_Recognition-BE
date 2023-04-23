const COMMON = require("../constants/common");

const checkForWeekend = (date) => {
  let weekDay = new Date(date).getDay();

  if (weekDay === COMMON.WEEKEND.SAT || weekDay === COMMON.WEEKEND.SUN)
    return true;

  return false;
};

const isDateInPast = (date) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // set current date to midnight

  // check if date is not current date and is in the past
  return new Date(date).getTime() < currentDate.getTime();
};

const isFutureDate = (date) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  let givenDate = new Date(date);
  givenDate.setHours(0, 0, 0, 0);

  return givenDate.getTime() > currentDate.getTime();
};

const isCurrentDate = (date) => {
  const givenDate = new Date(date);
  const currentDate = new Date();

  return givenDate.getFullYear() === currentDate.getFullYear() &&
    givenDate.getMonth() === currentDate.getMonth() &&
    givenDate.getDate() === currentDate.getDate();
};

const findLastWeekDay = (date) => {
  let lastDate = new Date(date);
  lastDate.setDate(lastDate.getDate() - 1);
  lastDate = lastDate.toISOString().substring(0, 10);

  if (checkForWeekend(lastDate)) {
    findLastWeekDay(lastDate);
  }

  return lastDate;
};

const daysDifference = (date_1, date_2) => {
  let difference = date_2.getTime() - date_1.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

  return TotalDays;
};

const getMondays = (date) => {
  date = new Date(date);
  const daysUntilMonday =
    date.getDay() === 0 ? 6 : date.getDay() - 1 === 0 ? 7 : date.getDay() - 1;

  const lastMonday = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate() - daysUntilMonday
  );

  const nextMonday =
    date.getDay() !== 1
      ? new Date(
          lastMonday.getFullYear(),
          lastMonday.getMonth(),
          lastMonday.getDate() + 7
        )
      : date;

  const formatDate = (dateString) => {
    const dateParts = dateString.split(/[/: ,]/);
    const year = parseInt(dateParts[2]);
    const month = parseInt(dateParts[1]);
    const day = parseInt(dateParts[0]);

    const monthString = month.toString().padStart(2, "0"); // Pad month component with leading zero if necessary
    const formattedDate = `${year}-${monthString}-${day
      .toString()
      .padStart(2, "0")}`;

    return formattedDate;
  };

  return {
    lastMonday: formatDate(lastMonday.toLocaleString()),
    nextMonday: formatDate(nextMonday.toLocaleString()),
  };
};

const findFirstAndLastDayOfPreviousMonth = (date) => {
  const d = new Date(date);
  const firstDayOfPreviousMonth = new Date(
    d.getFullYear(),
    d.getMonth() - 1,
    1
  );
  const lastDayOfPreviousMonth = new Date(d.getFullYear(), d.getMonth(), 0);
  const nextMonth = new Date(d.getFullYear(), d.getMonth() + 1, 1);

  return {
    firstDay: `${firstDayOfPreviousMonth.getFullYear()}-${(
      firstDayOfPreviousMonth.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-01`,
    lastDay: `${lastDayOfPreviousMonth.getFullYear()}-${(
      lastDayOfPreviousMonth.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${lastDayOfPreviousMonth
      .getDate()
      .toString()
      .padStart(2, "0")}`,
    nextMonthDate: `${nextMonth.getFullYear()}-${(nextMonth.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-01`,
    month: lastDayOfPreviousMonth.getMonth(),
    year: lastDayOfPreviousMonth.getFullYear()
  };
};

module.exports = {
  checkForWeekend,
  isDateInPast,
  isFutureDate,
  isCurrentDate,
  findLastWeekDay,
  daysDifference,
  getMondays,
  findFirstAndLastDayOfPreviousMonth,
};
