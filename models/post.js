module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    postId: {
      type: DataTypes.INTEGER, 
      primaryKey: true
    },
    groupId: {
      type: DataTypes.INTEGER
    },
    threadId: {
      type: DataTypes.INTEGER
    },
    conversationId: {
      type: DataTypes.INTEGER
    },
    conversationLoc: {
      type: DataTypes.INTEGER
    },
    initiatorId: {
      type: DataTypes.INTEGER
    },
    correspondentId: {
      type: DataTypes.INTEGER
    },
    postWriter: {
      type: DataTypes.INTEGER
    },
    pTimestamp: {
      type: DataTypes.DATE
    },
    headline: {
      type: DataTypes.STRING
    },
    content: {
      type: DataTypes.TEXT
    }
  }, {
    timestamps: false
  });
  return Post;
};
