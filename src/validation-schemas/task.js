const joi = require("joi");
const Utils = require("../utils/helper");

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

module.exports = {
    createTaskSchema,
    getTaskSchema
}