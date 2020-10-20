module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('FriendRequests', {
      requestId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      requestingUserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      requestedUserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      dateRequested: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      statusId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Statuses', key: 'statusId' },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('FriendRequests');
  },
};