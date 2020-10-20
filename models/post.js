const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // define association here
      Post.belongsTo(models.User);
      Post.hasMany(models.Comment);
    }
  }
  Post.init({
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    caption: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    shares: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
