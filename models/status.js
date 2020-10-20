const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    static associate(models) {
      // define association here
      Status.hasOne(models.FriendRequest);
    }
  }
  Status.init({
    statusId: DataTypes.INTEGER,
    status: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Status',
  });
  return Status;
};
