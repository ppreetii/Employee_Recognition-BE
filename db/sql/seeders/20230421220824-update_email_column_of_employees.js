"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.sequelize.query(
        `
        UPDATE employees SET email = LOWER(CONCAT(SUBSTRING_INDEX(name, ' ', 1), '.', SUBSTRING_INDEX(name, ' ', -1), '@peaksoft.com')) WHERE id > 0;
      `,
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    //Do nothing
  },
};
