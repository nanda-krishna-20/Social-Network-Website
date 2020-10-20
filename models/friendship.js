const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Friendship extends Model {
    static associate(models) {
      // define association here
      Friendship.belongsTo(models.FriendRequest);
    }
  }
  Friendship.init({
    friendshipId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    friendId: DataTypes.INTEGER,
    requestId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Friendship',
  });
  return Friendship;
};
