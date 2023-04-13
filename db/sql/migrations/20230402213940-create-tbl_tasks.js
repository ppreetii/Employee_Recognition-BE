'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      summary: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.ENUM("ToDo", "InProgress", "Done"),
        defaultValue: "ToDo",
      },
      date_assigned: {
        type: Sequelize.DATE,
        allowNull: true
      },
      deadline:{
        type: Sequelize.DATE,
        allowNull:true
      },
      date_started:{
        type: Sequelize.DATE,
        allowNull:true
      },
      date_completed:{
        type: Sequelize.DATE,
        allowNull:true
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      employeeId:{
        type: Sequelize.INTEGER,
        references: { model: 'employees', key: 'id' }
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('tasks');
  }
};