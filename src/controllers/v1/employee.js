const { validate } = require("../../validation-schemas/validation");
const { getEmployeeSchema } = require("../../validation-schemas/employee");
const employeeServices = require("../../services/employee");

const getEmployee = async (req, res, next) => {
  try {
    const { employeeId } = req.params;
    await validate(getEmployeeSchema, employeeId);
    const data = await employeeServices.getEmployee(employeeId);

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
};

const getEmployeeTasks = async (req, res, next) => {
  try {
    const { employeeId } = req.params;
    await validate(getEmployeeSchema, employeeId);
    const tasks = await employeeServices.getEmployeeTasks(employeeId);

    res.status(200).json({
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getEmployee,
  getEmployeeTasks,
};
