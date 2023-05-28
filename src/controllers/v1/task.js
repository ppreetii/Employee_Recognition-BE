const taskServices = require("../../services/task");
const {
  createTaskSchema,
  getTaskSchema,
  updateTaskSchema,
} = require("../../validation-schemas/task");
const { validate } = require("../../validation-schemas/validation");

const createTask = async (req, res, next) => {
  try {
    const data = req.body;
    await validate(createTaskSchema, data);

    const task = await taskServices.createTask(data);

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

const getTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    await validate(getTaskSchema, taskId);
    const task = await taskServices.getTask(taskId);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    await validate(getTaskSchema, taskId);
    await taskServices.deleteTask(taskId);
    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params;
    await validate(updateTaskSchema, { ...req.body, taskId });
    const task = await taskServices.updateTask(taskId, req.body);
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getTask,
  deleteTask,
  updateTask
};
