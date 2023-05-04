const taskServices = require("../../services/task");
const {createTaskSchema} = require("../../validation-schemas/task");
const {validate} = require("../../validation-schemas/validation")

const createTask = async (req,res,next) =>{
    try {
        const data = req.body;
        await validate(createTaskSchema, data);

        const task = await taskServices.createTask(data);

        res.status(201).json(task);
    } catch (error) {
        next(error)
    }
}

module.exports = {
    createTask
}