const { Router } = require("express");

const API_CONST = require("../../constants/api");
const taskController = require("../../controllers/v1/task");

const router = Router();

router.post("/", taskController.createTask);
router.get(API_CONST.TASK_ID, taskController.getTask);
router.delete(API_CONST.TASK_ID, taskController.deleteTask);

module.exports = router;
