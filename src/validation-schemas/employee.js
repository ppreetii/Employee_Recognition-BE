const joi = require('joi');

const getEmployeeSchema = joi.number().integer().required();

module.exports = {
    getEmployeeSchema
}