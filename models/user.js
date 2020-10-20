const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasOne(models.Profile);
      User.hasMany(models.Post);
    }
  }
  User.init({
    userId: DataTypes.INTEGER,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    facebookId: DataTypes.STRING,
    googleId: DataTypes.STRING,
    twitterId: DataTypes.STRING,
    linkedinId: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
