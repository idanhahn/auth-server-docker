var Sequelize = require('sequelize');
var sequelize = require("./db");
const bcrypt = require('bcryptjs');

const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.CHAR(60),
        allowNull: false
    },
    role: {
        type: Sequelize.STRING
    },
    saltSecret: {
        type: Sequelize.STRING
    }
});


function hashPassword(password){

    return new Promise( (resolve, reject) => {
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(password, salt, function(err, hash) {
                resolve({
                    password: hash,
                    saltSecret: salt
                });
            });
        });
    });

}

User.beforeCreate( async (user) => {

    const data = await hashPassword(user.password)
    user.password = data.password;
    user.saltSecret = data.saltSecret;

})

User.sync().then(() => {
    console.log("Done syncing database")
}).catch((err) => {
    console.log("Error syncing database " + err)
})


// Create New User
module.exports = User;
