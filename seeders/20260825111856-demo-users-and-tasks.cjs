'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Insert Users and return their generated IDs dynamically
    const users = await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'Alice Smith',
          email: 'alice@example.com',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Bob Jones',
          email: 'bob@example.com',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Charlie Brown',
          email: 'charlie@example.com',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      { returning: ['id'] }
    );

    // Dynamic lookup of user IDs
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