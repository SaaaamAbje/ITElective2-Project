'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const defaultPassword = await bcrypt.hash('Password123!', 10);

    const users = await queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'alice@example.com',
          password: defaultPassword,
          role: 'member',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'bob@example.com',
          password: defaultPassword,
          role: 'member',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          email: 'charlie@example.com',
          password: defaultPassword,
          role: 'member',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      { returning: ['id'] }
    );

    const aliceId = users[0].id;
    const bobId = users[1].id;
    const charlieId = users[2].id;

    // Insert Tasks using retrieved userIds
    await queryInterface.bulkInsert('Tasks', [
      {
        title: 'Set up database schema',
        dueDate: new Date('2026-09-01'),
        completed: true,
        userId: aliceId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Configure environment variables',
        dueDate: new Date('2026-09-05'),
        completed: false,
        userId: aliceId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Build REST API routes',
        dueDate: new Date('2026-09-10'),
        completed: false,
        userId: bobId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Write unit tests',
        dueDate: new Date('2026-09-15'),
        completed: false,
        userId: charlieId,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tasks', null, {});
    await queryInterface.bulkDelete('Users', null, {});
  }
};