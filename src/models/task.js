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

const deleteTask = async (id) => {
  try {
    await findTask(id);
    await Task.destroy({
      where: { id },
    });
  } catch (error) {
    throw error;
  }
};

const updateTask = async (id, data) => {
  try {
    const task = await findTask(id);

    if (data) {
      task.summary = data?.summary;
      task.description = data?.description;

      if (task.employeeId !== data?.employeeId) {
        await findEmployee(data.employeeId);
        task.employeeId = data.employeeId;
      }

      if (task.status !== data?.status) {
        task.status = data.status;
        switch (data.status) {
          case COMMON.TASK_STATUS.INPROGRESS:
            if (!task.date_started) {
              task.date_started = Utils.convertToIST(new Date());
            }
            break;

          case COMMON.TASK_STATUS.DONE:
            if (!task.date_started) {
              task.date_completed = Utils.convertToIST(new Date());
            }
            break;

          default:
            task.status = COMMON.TASK_STATUS.TODO;
        }
      }

      if (data?.deadline) task.deadline = data.deadline;

      await task.save();

      return task;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  Task,
  saveTask,
  findTask,
  deleteTask,
  updateTask,
};
