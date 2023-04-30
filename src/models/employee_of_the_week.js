const { DataTypes, Op } = require("sequelize");

const sequelize = require("../utils/DbConnection");
const {Employee} = require("./employee");
const Task = require("./task");
const COMMON = require("../constants/common");
const PdfServices = require("../services/pdf");
const { sendEmail } = require("../utils/sendEmail");

const EmpOfTheWeek = sequelize.define(
  "employee_of_the_week",
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
    startDay: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDay: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  { timestamps: true }
);

//defining relationships
EmpOfTheWeek.belongsTo(Employee, { foreignKey: "employeeId" });
Employee.hasMany(EmpOfTheWeek, { foreignKey: "employeeId" });

async function getEmployeeOfTheWeek(date, firstDay, lastDay) {
  try {
    let data = await EmpOfTheWeek.findOne({
      where: {
        startDay: {
          [Op.lte]: date,
        },
        endDay: {
          [Op.gte]: date,
        },
      },
      include: {
        model: Employee,
        attributes: ["name", "designation", "email"],
      },
    });

    if (!data) {
      data = await findAndSave(firstDay, lastDay);
      if(!data) return;
      await PdfServices.generateCertificate(COMMON.EMP_OF_WEEK, {
        name: data.name,
      });
      await sendEmail(data.email, data.name, COMMON.EMP_OF_WEEK);
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

async function findAndSave(firstDay, lastDay) {
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

    if (dbEmployee.bonusStars + 150 < 5000) {
      dbEmployee.bonusStars += 150;
    }

    dbEmployee.employee_of_the_week += 1;

    await dbEmployee.save();

    let empObj = {
      startDay: firstDay,
      endDay: lastDay,
      employeeId: employee?.rows[0]?.employee.dataValues.id,
    };
    const empOfTheWeek = new EmpOfTheWeek(empObj);

    await empOfTheWeek.save();

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
  EmpOfTheWeek,
  getEmployeeOfTheWeek,
};
