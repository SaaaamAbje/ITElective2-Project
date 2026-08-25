'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
   
    static associate(models) {
      Task.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Task.init({
    title: DataTypes.STRING,
    dueDate: DataTypes.DATE,
    completed: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};