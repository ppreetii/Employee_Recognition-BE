const rewardService = require("../../services/reward");

exports.getEmployeeReward = async (req, res, next) => {
  try {
    const { rewardType } = req.params;
    const { date } = req.query;

    let data = await rewardService.getEmployees(rewardType, date);

    res.status(200).json({
        rewardType,
        data
    })
  } catch (error) {
    next(error);
  }
};
