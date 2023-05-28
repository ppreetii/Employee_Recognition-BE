const joi = require("joi");
const Utils = require("../utils/helper");
const COMMON = require("../constants/common")

const createTaskSchema = joi.object().keys({
  summary: joi.string().required(),
  description: joi.string(),
  employeeId: joi.number().integer().when("deadline", {
    is: joi.exist(),
    then: joi.required(),
    otherwise: joi.optional(),
  }),
  deadline: joi
    .date()
    .min(`${Utils.formatDate(new Date())}`),
});

const getTaskSchema = joi.number().integer().required();

const updateTaskSchema = joi.object().keys({
  taskId: getTaskSchema,
  summary: joi.string().required(),
  description: joi.string().required(),
  status: joi
    .string()
    .valid(
      COMMON.TASK_STATUS.TODO,
      COMMON.TASK_STATUS.INPROGRESS,
      COMMON.TASK_STATUS.DONE
    )
    .required(),
  deadline: joi.date().min(`${Utils.formatDate(new Date())}`),
  employeeId: joi.number().integer().when("deadline", {
    is: joi.exist(),
    then: joi.required(),
    otherwise: joi.optional(),
  }),
});

module.exports = {
    createTaskSchema,
    getTaskSchema,
    updateTaskSchema
}