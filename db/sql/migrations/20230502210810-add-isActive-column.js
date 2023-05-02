'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.sequelize.query(
        `
      ALTER TABLE employees ADD COLUMN is_active BIT DEFAULT 1;
      `,
        { transaction }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.sequelize.query(
        `
      ALTER TABLE employees DROP COLUMN is_active;
      `,
        { transaction }
      );
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
