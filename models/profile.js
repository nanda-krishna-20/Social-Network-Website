const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User);
    }
  }
  Profile.init({
    profileId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    phoneNumber: DataTypes.STRING,
    dob: DataTypes.DATE,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    school: DataTypes.STRING,
    college: DataTypes.STRING,
    work: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};
