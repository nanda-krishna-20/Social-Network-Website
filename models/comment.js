const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      // define association here
      Comment.belongsTo(models.Post);
    }
  }
  Comment.init({
    commentId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
