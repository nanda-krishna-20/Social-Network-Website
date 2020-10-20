const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FriendRequest extends Model {
    static associate(models) {
      // define association here
      FriendRequest.hasOne(models.Friendship);
      FriendRequest.belongsTo(models.Status);
    }
  }
  FriendRequest.init({
    requestId: DataTypes.INTEGER,
    requestingUserId: DataTypes.INTEGER,
    requestedUserId: DataTypes.INTEGER,
    dateRequested: DataTypes.DATE,
    statusId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'FriendRequest',
  });
  return FriendRequest;
};
