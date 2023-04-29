const Employee = require("../models/employee");
const Task = require("../models/task");

const getEmployee = async (id) => {
  try {
    const employee = await Employee.findOne({
      attributes: [
        "name",
        "designation",
        "bonusStars",
        "employee_of_the_day",
        "employee_of_the_week",
        "employee_of_the_month",
      ],
      where: {
        id,
      },
    });

    if (!employee) {
      throw new Error("Employee Not Found");
    }

    return {
      id: "EMPK-" + id,
      ...employee.dataValues,
    };
  } catch (error) {
    throw error;
  }
};
const getEmployeeTasks = async (id) => {
  try {
    const tasks = await Task.findAll({
      attributes: [
        "id",
        "summary",
        "status",
        "date_assigned",
        "deadline",
        "date_completed",
      ],
      where: {
        employeeId: id,
      },
      order: [[["status", "ASC"]]],
    });

    const transformedTasks = tasks.map(task => {
      const { date_assigned, deadline, date_completed, ...rest } = task.dataValues;
      const formatDate = date => new Date(date).toISOString().split('T')[0];
      return {
        ...rest,
        date_assigned: date_assigned ? formatDate(date_assigned) : date_assigned,
        deadline: deadline ? formatDate(deadline) : deadline,
        date_completed: date_completed ? formatDate(date_completed) : date_completed,     
      };
    });

    return transformedTasks;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  getEmployee,
  getEmployeeTasks,
};
