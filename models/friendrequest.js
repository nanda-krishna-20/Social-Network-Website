'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FriendRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  FriendRequest.init({
    requestId: DataTypes.INTEGER,
    requestingUserId: DataTypes.INTEGER,
    requestedUserId: DataTypes.INTEGER,
    dateRequested: DataTypes.DATE,
    statusId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FriendRequest',
  });
  return FriendRequest;
};