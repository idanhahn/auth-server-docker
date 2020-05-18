var Sequelize = require('sequelize');
var sequelize = require("../helpers/db");

const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.CHAR(60),
        allowNull: false
    },
    role: {
        type: Sequelize.STRING
    }
});

User.sync().then(() => {
    console.log("Done syncing database")
}).catch((err) => {
    console.log("Error syncing database " + err)
})

// Create New User
module.exports = User;
