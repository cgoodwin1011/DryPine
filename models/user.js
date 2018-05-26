var bcrypt = require("bcrypt");


module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER, 
      primaryKey: true,
      uniqueKey: true
    },
    email: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    createdAt: {
      type: DataTypes.DATE
    },
    updatedAt: {
      type: DataTypes.DATE
    },
  }, {
    timestamps: false
  });
  User.prototype.validPassword = function(password) {
    // console.log("this.password is ", this.password, "and password is ", password);
    // return 
    var x = bcrypt.compareSync(password, this.password);
    // console.log(x);
    return x;
  };
  // console.log(bcrypt.compareSync(password, this.password));
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });
  return User;
};