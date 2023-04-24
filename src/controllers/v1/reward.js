const rewardService = require("../../services/reward");
const { getRewardSchema } = require("../../validation-schemas/reward");
const { validate } = require("../../validation-schemas/validation");

exports.getEmployeeReward = async (req, res, next) => {
  try {
    const { rewardType } = req.params;
    const { date } = req.query;
    await validate(getRewardSchema, { rewardType, date });

    let data = await rewardService.getEmployees(rewardType, date);

    res.status(200).json({
      rewardType,
      data,
    });
  } catch (error) {
    next(error);
  }
};
