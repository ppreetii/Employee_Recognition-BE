const { Router } = require("express");

const API_CONST = require("../../constants/api");
const taskController = require("../../controllers/v1/task");

const router = Router();

router.post("/", taskController.createTask);

module.exports = router;