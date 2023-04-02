'use strict';

const task_data = require("../../../src/utils/data/task_data");

module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert('Tasks', task_data);
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};
