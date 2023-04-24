const { Router } = require("express");

const API_CONST = require("../../constants/api");
const employeeController = require("../../controllers/v1/employee")

const router = Router();

router.get(API_CONST.EMPLOYEE_ID, employeeController.getEmployee);

module.exports = router;
