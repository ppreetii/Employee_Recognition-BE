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
