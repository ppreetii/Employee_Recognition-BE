const EmpOfTheDayModel = require("../models/employee_of_the_day");
const EmpOfTheMonthModel = require("../models/employee_of_the_month");
const EmpOfTheWeekModel = require("../models/employee_of_the_week");
const COMMON = require("../constants/common");
const Utils = require("../utils/helper");
const holidayList = require("../utils/data/holidays");
const Employee = require("../models/employee");
const PdfServices = require('./pdf');
const {sendEmail} = require('../utils/sendEmail');

exports.getEmployees = async (rewardType, date) => {
  try {
    let employee,certificateData = {};
    if (rewardType === COMMON.EMP_OF_DAY) {
      employee = await getEmployeeOfTheDay(date);
    }
    if (rewardType === COMMON.EMP_OF_WEEK) {
      employee = await getEmployeeOfTheWeek(date);
    }
    if (rewardType === COMMON.EMP_OF_MONTH) {
      employee = await getEmployeeOfTheMonth(date);
      certificateData.month = employee.month;
    }

    certificateData.name = employee.name;
    PdfServices.generateCertificate(rewardType, certificateData);
    await sendEmail(employee.email,employee.name,rewardType)

    return employee ?? {};
  } catch (error) {
    throw error;
  }
};

let getEmployeeOfTheDay = async (date) => {
  try {
    if (Utils.isFutureDate(date)) {
      throw new Error("Date is in the future.");
    }
    const isWeekend = Utils.checkForWeekend(date);
    if (isWeekend && Utils.isCurrentDate(date)) {
      return {
        workingDay: false,
        message:
          "Work is important, so is Rest. Enjoy your Weekend peacefully. Cheers!",
      };
    }

    if (isWeekend && Utils.isDateInPast(date)) {
      return {
        workingDay: false,
        message: "This date falls on weekend. No Results Found",
      };
    }

    const holiday = holidayList.find((elem) => elem.Date === date);

    if (holiday) {
      return {
        workingDay: false,
        message: `Given date is holiday for Occassion '${holiday.Ocassion}'`,
      };
    }
    let data;
    if (!Utils.isDateInPast(date) && !Utils.isFutureDate(date)) {
      // Current Date
      const currentHour = new Date(date).getHours();

      // Check if it is 7 PM
      if (currentHour < 19) {
        let lastDate = Utils.findLastWeekDay(date);
        data = await EmpOfTheDayModel.getEmployeeOfTheDay(lastDate);
      }

      if (currentHour === 19) {
        data = await EmpOfTheDayModel.findAndSave(date);

        if (Array.isArray(data) && data.length > 0) {
          const employee = await Employee.findOne({
            where: {
              id: data[0].employeeId,
            },
          });

          if (!employee) {
            throw new Error("Employee Not Found");
          }

          if (employee.bonusStars + 50 < 5000) {
            employee.bonusStars += 50;
          }

          employee.employee_of_the_day += 1;

          await employee.save();
        }
      }

      // Check if it above 7 PM
      if (currentHour > 19) {
        data = await EmpOfTheDayModel.getEmployeeOfTheDay(date);
      }
    }

    if (Utils.isDateInPast(date)) {
      data = await EmpOfTheDayModel.getEmployeeOfTheDay(date);
    }

    if (Array.isArray(data) && data.length === 0) {
      return {
        workingDay: true,
        message: `No Employee of Day Today. Lets Buckle Up and Try Harder Again. Best of Luck!`,
      };
    }

    return data;
  } catch (error) {
    throw error;
  }
};

let getEmployeeOfTheWeek = async (date) => {
  try {
    if (Utils.isFutureDate(date)) {
      throw new Error("Date is in the future.");
    }

    let { lastMonday, nextMonday } = Utils.getMondays(date);

    if (new Date() < nextMonday) {
      return {
        message: "Results will be declared on Monday.",
      };
    }

    let employee = await EmpOfTheWeekModel.getEmployeeOfTheWeek(
      date,
      lastMonday,
      nextMonday
    );

    return employee
      ? {
          ...employee,
          startOfWeek: lastMonday,
          endOfWeek: nextMonday,
        }
      : {};
  } catch (error) {
    throw error;
  }
};

let getEmployeeOfTheMonth = async (date) => {
  try {
    let { firstDay, lastDay, nextMonthDate, month, year } =
      Utils.findFirstAndLastDayOfPreviousMonth(date);

    let employee = await EmpOfTheMonthModel.getEmployeeOfTheMonth(
      month,
      year,
      firstDay,
      lastDay
    );

    return employee
      ? {
          ...employee,
          month: COMMON.MONTHS[month],
          nextMonthDate,
        }
      : {};
  } catch (error) {
    throw error;
  }
};
