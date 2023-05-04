const { DataTypes, Op } = require("sequelize");

const sequelize = require("../utils/DbConnection");
const {Employee} = require("./employee");
const {Task} = require("./task");
const COMMON = require("../constants/common");
const PdfServices = require("../services/pdf");
const { sendEmail } = require("../utils/sendEmail");

const EmpOfTheMonth = sequelize.define(
  "employee_of_the_month",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      references: { model: "employees", key: "id" },
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    month: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: true }
);

//defining relationships
EmpOfTheMonth.belongsTo(Employee, { foreignKey: "employeeId" });
Employee.hasMany(EmpOfTheMonth, { foreignKey: "employeeId" });

async function getEmployeeOfTheMonth(month, year, firstDay, lastDay) {
  try {
    let data = await EmpOfTheMonth.findOne({
      where: {
        month,
        year,
      },
      include: {
        model: Employee,
        attributes: ["name", "designation", "email"],
      },
    });

    if (!data) {
      data = await findAndSave(month, year, firstDay, lastDay);
      if(!data) return;
      await PdfServices.generateCertificate(COMMON.EMP_OF_MONTH, {
        name: data.name,
        month: COMMON.MONTHS[month],
      });
      await sendEmail(data.email, data.name, COMMON.EMP_OF_MONTH);
    }

    return {
      id: data.employeeId,
      name: data.employee?.dataValues?.name || data.name,
      designation: data.employee?.dataValues?.designation || data.designation,
      email: data.employee?.dataValues?.email || data.email,
    };
  } catch (error) {
    throw error;
  }
}

async function findAndSave(month, year, firstDay, lastDay) {
  try {
    let employee = await Task.findAndCountAll({
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("employeeId")), "totalTasks"],
      ],
      where: {
        status: COMMON.TASK_STATUS.DONE,
        date_completed: {
          [Op.between]: [firstDay, lastDay],
        },
      },
      include: {
        model: Employee,
        attributes: ["id", "name", "designation"],
      },
      order: [["totalTasks", "DESC"]],
      limit: 1,
    });

    if(employee.count === 0){
      return;
    }
    
    const dbEmployee = await Employee.findOne({
      where: {
        id: employee?.rows[0]?.employee?.dataValues?.id,
      },
    });

    if (!dbEmployee) {
      throw new Error("Employee Not Found");
    }

    if (dbEmployee.bonusStars + 500 < 5000) {
      dbEmployee.bonusStars += 500;
    }

    dbEmployee.employee_of_the_month += 1;

    await dbEmployee.save();

    let empObj = {
      month,
      year,
      employeeId: employee?.rows[0]?.employee.dataValues.id,
    };
    const empOfTheMonth = new EmpOfTheMonth(empObj);

    await empOfTheMonth.save();

    return {
      name: employee?.rows[0]?.employee.dataValues.name,
      designation: employee?.rows[0]?.employee.dataValues.designation,
      ...empObj,
      email: dbEmployee.email,
    };
  } catch (error) {
    throw error;
  }
}

module.exports = {
  EmpOfTheMonth,
  getEmployeeOfTheMonth,
};
