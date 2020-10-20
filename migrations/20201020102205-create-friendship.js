module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Friendships', {
      friendshipId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      friendId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      requestId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'FriendRequests', key: 'requestId' },
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
    await queryInterface.dropTable('Friendships');
  },
};
