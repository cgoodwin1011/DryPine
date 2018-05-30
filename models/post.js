module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    postId: {
      type: DataTypes.INTEGER, 
      primaryKey: true
    },
    author: {
      type: DataTypes.STRING
    },
    replyingTo: {
      type: DataTypes.INTEGER
    },
    pTimestamp: {
      type: DataTypes.DATE
    },
    content: {
      type: DataTypes.TEXT
    }
  }, {
    timestamps: false
  });
  return Post;
};

