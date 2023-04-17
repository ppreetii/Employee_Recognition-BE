const { DataTypes } = require("sequelize");

const sequelize = require("../utils/DbConnection");
const Employee = require('../models/employee')

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

//defining relationships
empOfTheDay.belongsTo(Employee, { foreignKey: "employeeId" });
Employee.hasMany(empOfTheDay, { foreignKey: 'employeeId' });

async function getEmployeeOfTheDay(date) {
  try {
    let employee = await empOfTheDay.findOne({
      where: sequelize.where(sequelize.fn("DATE", sequelize.col("date")), date),
    });

    if (!employee) {
      employee = await findAndSave(date);
    }

    return {
      id: employee.employeeId,
      name: employee.name,
      designation: employee.designation,
      date,
    };
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

    return employee?.[0] ?? {};
  } catch (error) {
    throw error;
  }
}

module.exports = {
  empOfTheDay,
  getEmployeeOfTheDay,
  findAndSave,
};
