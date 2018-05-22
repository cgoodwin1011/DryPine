
var Sequelize = require("sequelize");

var sequelize = require("../config/connection.js");

var Chirp = sequelize.define("chirp", {
    author: {
        type: Sequelize.STRING
    },
    body: {
        type: Sequelize.STRING
    },

    input: {
        type: Sequelize.STRING
    },
    created_at: {
        type: Sequelize.DATE
    }
}, {
        timestamps: false

    })


Chirp.sync();

module.exports = Chirp;