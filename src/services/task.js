const Task = require("../models/task");
const Utils = require("../utils/helper")

const createTask = async (data) => {
  try {
    const task = await Task.saveTask(data);
    return {
      id: task.id,
      summary: task.summary,
      description: task.description ?? null,
      status: task.status,
      employeeId: task.employeeId ?? null,
      deadline: task.deadline? Utils.formatDate(task.deadline) : null,
    };
  } catch (error) {
    throw error;
  }
};

const getTask = async (id) => {
  try {
    const task = await Task.findTask(id);
     return {
       id: task.id,
       summary: task.summary,
       description: task.description ?? null,
       status: task.status,
       employeeId: task.employeeId ?? null,
       deadline: task.deadline ? Utils.formatDate(task.deadline) : null,
     };
  } catch (error) {
    throw error;
  }
}

const deleteTask = async (id) =>{
  try {
    await Task.deleteTask(id);    
  } catch (error) {
    throw error;
  }
}

module.exports = {
    createTask,
    getTask,
    deleteTask
}