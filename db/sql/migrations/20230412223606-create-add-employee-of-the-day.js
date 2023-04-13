"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        "employee_of_the_days",
        {
          date: {
            type: Sequelize.DATE,
            primaryKey: true,
          },
          name: {
            type: Sequelize.STRING,
          },
          designation: {
            type: Sequelize.STRING,
          },
          employeeId: {
            type: Sequelize.INTEGER,
            references: { model: "employees", key: "id" },
          },
          createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          },
          updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
          },
        },
        { transaction }
      );
      await queryInterface.sequelize.query(`
      CREATE INDEX Idx_date ON employee_of_the_days (date);  
      `, {transaction})
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  async down(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.sequelize.query(`
      DROP INDEX Idx_date ON employee_of_the_days;
      `, {transaction});
      await queryInterface.dropTable("employee_of_the_days", {transaction});
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
};
