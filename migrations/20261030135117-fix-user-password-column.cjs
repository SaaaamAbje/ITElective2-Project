'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('Users');
    if (!tableInfo.password) {
      await queryInterface.addColumn('Users', 'password', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      });
    }
  },

  async down(queryInterface, Sequelize) {
    const tableInfo = await queryInterface.describeTable('Users');
    if (tableInfo.password) {
      await queryInterface.removeColumn('Users', 'password');
    }
  }
};