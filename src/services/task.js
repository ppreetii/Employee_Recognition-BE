const Task = require("../models/task");
const Utils = require("../utils/helper");

const createTask = async (data) => {
  try {
    const task = await Task.saveTask(data);
    return sanitizeTaskData(task);
  } catch (error) {
    throw error;
  }
};

const getTask = async (id) => {
  try {
    const task = await Task.findTask(id);
    return sanitizeTaskData(task);
  } catch (error) {
    throw error;
  }
};

const deleteTask = async (id) => {
  try {
    await Task.deleteTask(id);
  } catch (error) {
    throw error;
  }
};

const updateTask = async (id, data) => {
  const task = await Task.updateTask(id, data);
  return sanitizeTaskData(task);
};

const sanitizeTaskData = (task) => {
  return {
    id: task.id,
    summary: task.summary,
    description: task.description ?? null,
    status: task.status,
    employeeId: task.employeeId ?? null,
    deadline: task.deadline ? Utils.formatDate(task.deadline) : null,
  };
};
module.exports = {
  createTask,
  getTask,
  deleteTask,
  updateTask
};
