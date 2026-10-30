'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    const customPassword = await bcrypt.hash('samespeletadlsl', 10);
    const defaultPassword = await bcrypt.hash('Password123!', 10);

    const users = await queryInterface.bulkInsert(
      'Users',
      [
        {
          email: 'samabjelina@gmail.com',
          password: customPassword,
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        },
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
        }
      ],
      { returning: ['id'] }
    );

    const samId = users[0].id;
    const aliceId = users[1].id;
    const bobId = users[2].id;

    await queryInterface.bulkInsert('Tasks', [
      {
        title: 'Set up database schema',
        dueDate: new Date('2026-09-01'),
        completed: true,
        userId: samId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Configure environment variables',
        dueDate: new Date('2026-09-05'),
        completed: false,
        userId: samId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Build REST API routes',
        dueDate: new Date('2026-09-10'),
        completed: false,
        userId: aliceId,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Write unit tests',
        dueDate: new Date('2026-09-15'),
        completed: false,
        userId: bobId,
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