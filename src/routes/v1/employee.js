const { Router } = require("express");

const API_CONST = require("../../constants/api");
const employeeController = require("../../controllers/v1/employee")

const router = Router();

router.post("/", employeeController.createEmployee);
router.get(API_CONST.EMPLOYEE_ID, employeeController.getEmployee);
router.get(API_CONST.EMPLOYEE_ID + API_CONST.TASK , employeeController.getEmployeeTasks);
router.patch(API_CONST.EMPLOYEE_ID, employeeController.updateEmployee);
router.delete(API_CONST.EMPLOYEE_ID, employeeController.deleteEmployee)

module.exports = router;
