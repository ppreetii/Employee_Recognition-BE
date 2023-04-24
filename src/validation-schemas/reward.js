const joi = require("joi");

const COMMON = require("../constants/common");

const getRewardSchema = joi.object().keys({
  rewardType: joi
    .string()
    .valid(COMMON.EMP_OF_DAY, COMMON.EMP_OF_WEEK, COMMON.EMP_OF_MONTH)
    .required(),
  date: joi.date().required()
});

module.exports = {
  getRewardSchema,
};
