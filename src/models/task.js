const { DataTypes } = require("sequelize");

const sequelize = require("../utils/DbConnection");
const { Employee, findEmployee } = require("./employee");
const COMMON = require("../constants/common");
const Utils = require("../utils/helper");

const Task = sequelize.define(
  "task",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM("ToDo", "InProgress", "Done"),
      defaultValue: "ToDo",
    },
    date_assigned: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    date_started: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    date_completed: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { timestamps: true }
);

//defining relationships
Task.belongsTo(Employee, { foreignKey: "employeeId" });
Employee.hasMany(Task, { foreignKey: "employeeId" });

const saveTask = async (data) => {
  const taskData = {
    summary: data?.summary,
  };

  if (data?.description) {
    taskData.description = data.description;
  }
  if (data?.employeeId) {
    await findEmployee(data.employeeId);
    taskData.employeeId = data.employeeId;
    taskData.date_assigned = Utils.convertToIST(new Date());
  }
  if (data?.deadline) {
    taskData.deadline = data.deadline;
  }

  if (data?.status) {
    switch (data.status) {
      case COMMON.TASK_STATUS.INPROGRESS:
        taskData.date_started = Utils.convertToIST(new Date());
        taskData.status = data.status;
        break;

      case COMMON.TASK_STATUS.DONE:
        taskData.date_completed = Utils.convertToIST(new Date());
        taskData.status = data.status;
        break;

      default:
        taskData.status = COMMON.TASK_STATUS.TODO;
    }
  }

  const task = new Task(taskData);
  await task.save();

  return task;
};

const findTask = async (id) => {
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      throw new Error("Task Not Found");
    }

    return task;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  Task,
  saveTask,
  findTask,
};
