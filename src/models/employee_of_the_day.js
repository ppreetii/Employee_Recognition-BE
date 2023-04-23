const { DataTypes } = require("sequelize");

const sequelize = require("../utils/DbConnection");
const Employee = require('../models/employee');
const COMMON = require('../constants/common');
const PdfServices = require("../services/pdf");
const { sendEmail } = require("../utils/sendEmail");

const empOfTheDay = sequelize.define(
  "employee_of_the_day",
  {
    date: {
      type: DataTypes.DATE,
      primaryKey: true,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      references: { model: "employees", key: "id" },
    }
  },
  { timestamps: true }
);

//defining relationships
empOfTheDay.belongsTo(Employee, { foreignKey: "employeeId" });
Employee.hasMany(empOfTheDay, { foreignKey: 'employeeId' });

async function getEmployeeOfTheDay(date) {
  try {
    let data = await empOfTheDay.findOne({
      where: sequelize.where(sequelize.fn("DATE", sequelize.col("date")), date),
      include: {
        model: Employee,
        attributes: [ "name", "designation","email"],
      },
    });

    if (!data) {
      data = await findAndSave(date);
      await PdfServices.generateCertificate(COMMON.EMP_OF_DAY, {name: data.name});
      await sendEmail(data.email, data.name, COMMON.EMP_OF_DAY);
    }

    return {
      id: data.employeeId,
      name: data.employee?.dataValues?.name || data.name,
      designation: data.employee?.dataValues?.designation || data.designation,
      email: data.employee?.dataValues?.email || data.email,
      date,
    };
  } catch (error) {
    throw error;
  }
}

async function findAndSave(date) {
  try {
    let employee = await sequelize.query(
      `CALL get_employee_of_the_day('${COMMON.TASK_STATUS.DONE}', '${date}')`
    );

    if (!employee) {
      employee = await sequelize.query(
        `CALL get_employee_of_the_day('${COMMON.TASK_STATUS.INPROGRESS}', '${date}')`
      );
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
