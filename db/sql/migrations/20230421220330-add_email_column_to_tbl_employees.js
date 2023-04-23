'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.sequelize.query(
        `
      ALTER TABLE employees ADD COLUMN email VARCHAR(255);
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
      ALTER TABLE employees DROP COLUMN email;
      `,
        { transaction }
      );
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
