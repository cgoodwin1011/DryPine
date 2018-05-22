

var Sequelize =  require("sequelize");

var sequelize = new Sequelize("sequelize_chirpy", "root", "Mungu@sifiWE20!8", {

  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    idle: 1000
  } 

});

module.exports = sequelize;

