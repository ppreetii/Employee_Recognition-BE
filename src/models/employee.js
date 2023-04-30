const { DataTypes } = require("sequelize");

const sequelize = require("../utils/DbConnection");

const Employee = sequelize.define(
  "employee",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bonusStars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    employee_of_the_day: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    employee_of_the_week: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    employee_of_the_month: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  { timestamps: true }
);

async function saveToDb(empData = {}) {
  try {
    const data = {
      name: empData.name,
      email: empData.email?.toLowerCase(),
      designation: empData.designation,
    };
    const employee = new Employee(data);

    await employee.save();

    return employee;
  } catch (error) {
    throw error;
  }
}
module.exports = {
  Employee,
  saveToDb,
};
