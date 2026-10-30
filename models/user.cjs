'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Task, { foreignKey: 'userId', as: 'tasks' });
    }
  }

  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
      },
      // Maps model property 'password' directly to database column 'passwordHash' or 'password'
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'passwordHash' // Tells Sequelize the actual database column name
      },
      role: {
        type: DataTypes.STRING,
        defaultValue: 'member'
      }
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users'
    }
  );

  return User;
};