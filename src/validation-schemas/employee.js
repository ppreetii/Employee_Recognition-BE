const joi = require("joi");

const getEmployeeSchema = joi.number().integer().required();

const createEmployeeSchema = joi
  .object()
  .keys({
    name: joi.string().required(),
    email: joi.string().email().required(),
    designation: joi.string().required(),
  })
  .required();

const updateEmployeeSchema = joi
  .object()
  .keys({
    id: joi.number().integer().required(),
    designation: joi.string().required()
  })
  .required();

module.exports = {
  getEmployeeSchema,
  createEmployeeSchema,
  updateEmployeeSchema,
};
