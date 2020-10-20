module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Statuses', [
      { status: 'active' },
      { status: 'declined' },
      { status: 'accepted' },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Statuses', null, {});
  },
};
