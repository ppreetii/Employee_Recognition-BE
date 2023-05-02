const Employee = require("../models/employee");
const Task = require("../models/task");

const getEmployee = async (id) => {
  try {
    const employee = await Employee.findEmployee(id);

    return {
      id: employee.id,
      name: employee.name,
      designation: employee.designation,
      email: employee.email,
      bonusStars: employee.bonusStars,
      empOfDayCount: employee.employee_of_the_day,
      empOfWeekCount: employee.employee_of_the_week,
      empOfMonthCount: employee.employee_of_the_month,
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

    const transformedTasks = tasks.map((task) => {
      const { date_assigned, deadline, date_completed, ...rest } =
        task.dataValues;
      const formatDate = (date) => new Date(date).toISOString().split("T")[0];
      return {
        ...rest,
        date_assigned: date_assigned
          ? formatDate(date_assigned)
          : date_assigned,
        deadline: deadline ? formatDate(deadline) : deadline,
        date_completed: date_completed
          ? formatDate(date_completed)
          : date_completed,
      };
    });

    return transformedTasks;
  } catch (error) {
    throw error;
  }
};

const createEmployee = async (data) => {
  try {
    const dbEmployee = await Employee.saveToDb(data);
    return {
      id: "EMPK-" + dbEmployee.id,
      name: dbEmployee.name,
      email: dbEmployee.email,
      designation: dbEmployee.designation,
      bonusStars: dbEmployee.bonusStars,
      empOfDayCount: dbEmployee.employee_of_the_day,
      empOfWeekCount: dbEmployee.employee_of_the_week,
      empOfMonthCount: dbEmployee.employee_of_the_month,
    };
  } catch (error) {
    throw error;
  }
};

const updateEmployee = async (data) => {
  try {
    const updatedDbEmp = await Employee.updateEmployee(data);
    return {
      id: updatedDbEmp?.id,
      name: updatedDbEmp?.name,
      designation: updatedDbEmp?.designation,
      email: updatedDbEmp?.email,
      bonusStars: updatedDbEmp.bonusStars,
      empOfDayCount: updatedDbEmp.employee_of_the_day,
      empOfWeekCount: updatedDbEmp.employee_of_the_week,
      empOfMonthCount: updatedDbEmp.employee_of_the_month,
    };
  } catch (error) {
    throw error;
  }
};

const deleteEmployee = async(id) =>{
  try {
    await Employee.deleteEmployee(id);
  } catch (error) {
    throw error;
  }
}

module.exports = {
  getEmployee,
  getEmployeeTasks,
  createEmployee,
  updateEmployee,
  deleteEmployee
};
