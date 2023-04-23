"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("employee_of_the_weeks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      employeeId: {
        type: Sequelize.INTEGER,
        references: { model: "employees", key: "id" },
      },
      startDay: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      endDay: {
        type: Sequelize.DATE,
        allowNull: false,
      },     
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("employee_of_the_weeks");
  },
};
