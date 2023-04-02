const { DataTypes } = require("sequelize");

const sequelize = require("../utils/DbConnection");
const Employee = require('./employee')

const Task = sequelize.define(
  "task",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.ENUM("ToDo", "InProgress", "Done"),
      defaultValue: "ToDo",
    },
    date_assigned: {
      type: DataTypes.DATE,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  },
  { timestamps: true }
);

//defining relationships
Task.belongsTo(Employee, { foreignKey: "employeeId" });
Employee.hasMany(Task, { foreignKey: 'employeeId' });

module.exports = Task;
