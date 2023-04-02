'use strict';

const emp_data = require("../../../src/utils/data/employee_data");

module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert('Employees', emp_data);
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete('Employees', null, {});
  }
};
