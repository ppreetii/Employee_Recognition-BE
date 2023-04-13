const { DataTypes } = require("sequelize");

const sequelize = require("../utils/DbConnection");
const db = require("../models/index");

const empOfTheDay = sequelize.define(
  "employee_of_the_day",
  {
    date: {
      type: DataTypes.DATE,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    designation: {
      type: DataTypes.STRING,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      references: { model: "employees", key: "id" },
    },
  },
  { timestamps: true }
);

async function getEmployeeOfTheDay(date) {
  try {
    let employee = await empOfTheDay.findOne({
      where: {
        date,
      },
    });

    if (!employee) {
      employee = await findAndSave(date);
    }

    return employee;
  } catch (error) {
    throw error;
  }
}

async function findAndSave(date) {
  try {
    let employee = await sequelize.query(
      `CALL get_employee_of_the_day('Done', '${date}')`
    );

    if (!employee) {
      employee = await sequelize.query(
        `CALL get_employee_of_the_day('InProgress', '${date}')`
      );
    }

    if (!employee) {
      return {
        message: `No Winner on ${date}. Lets Buckle up and try again. Best of Luck!`,
      };
    }

    return employee;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  empOfTheDay,
  getEmployeeOfTheDay,
  findAndSave,
};
