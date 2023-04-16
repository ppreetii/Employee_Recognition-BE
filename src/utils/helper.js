const COMMON = require("../constants/common");

exports.checkForWeekend = (date) => {
  let weekDay = new Date(date).getDay();

  if (weekDay === COMMON.WEEKEND.SAT || weekDay === COMMON.WEEKEND.SUN)
    return true;

  return false;
};

exports.isDateInPast = (date) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // set current date to midnight

  // check if date is not current date and is in the past
  return new Date(date).getTime() < currentDate.getTime();
};

exports.isFutureDate = (date) => {
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  let givenDate = new Date(date);
  givenDate.setHours(0, 0, 0, 0);

  return givenDate.getTime() > currentDate.getTime();
};

exports.isCurrentDate = (date) => {
  return new Date(date).getTime() === new Date().getTime();
};

exports.findLastWeekDay = (date) => {
  let lastDate = new Date(date);
  lastDate.setDate(lastDate.getDate() - 1);
  lastDate = lastDate.toISOString().substring(0, 10);

  if (this.checkForWeekend(lastDate)) {
    findLastWeekDay(lastDate);
  }

  return lastDate;
};

exports.daysDifference = (date_1, date_2) => {
  let difference = date_2.getTime() - date_1.getTime();
  let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));

  return TotalDays;
};

exports.getMondays = (date) => {
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
