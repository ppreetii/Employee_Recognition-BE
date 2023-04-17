const { DataTypes, Op } = require("sequelize");

const sequelize = require("../utils/DbConnection");
const Employee = require("./employee");
const Task = require("./task");
const COMMON = require("../constants/common");

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
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDay: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDay: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    employeeId: {
      type: DataTypes.INTEGER,
      references: { model: "employees", key: "id" },
    },
  },
  { timestamps: true }
);

//defining relationships
EmpOfTheWeek.belongsTo(Employee, { foreignKey: "employeeId" });
Employee.hasMany(EmpOfTheWeek, { foreignKey: "employeeId" });

async function getEmployeeOfTheWeek(date, firstDay, lastDay) {
  try {
    let employee = await EmpOfTheWeek.findOne({
      where: {
        startDay: {
          [Op.lte]: date,
        },
        endDay: {
          [Op.gte]: date,
        },
      },
    });

    if (!employee) {
      employee = await findAndSave(firstDay, lastDay);
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

    const empOfTheWeek = new EmpOfTheWeek({
      name: employee?.rows[0]?.employee.dataValues.name,
      designation: employee?.rows[0]?.employee.dataValues.designation,
      startDay: firstDay,
      endDay: lastDay,
      employeeId: employee?.rows[0]?.employee.dataValues.id,
    });

    await empOfTheWeek.save();

    return empOfTheWeek;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  EmpOfTheWeek,
  getEmployeeOfTheWeek,
};
