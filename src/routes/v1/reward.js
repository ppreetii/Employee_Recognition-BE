const { Router } = require("express");

const API_CONST = require("../../constants/api");
const rewardController = require("../../controllers/v1/reward")

const router = Router();

router.get('/:rewardType', rewardController.getEmployeeReward);

module.exports = router;
