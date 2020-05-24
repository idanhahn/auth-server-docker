var User = require('../models/user.model')
const bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local');

exports.get_user = async (req, res) => {
    console.log(req.params.email)
    try{
        const user = await User.findAll({
            where: {
                email: req.params.email
            }
        });
        res.status(200).json(user)
    } catch (err) {
        console.log("error on get_user " + err)
        res.status(500).json(err)
    }

}

exports.signup = async (req, res) => {

    // TODO: need to check if user already exist, etc'


    console.log(User)
    const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role
    }

    try {
        const data = await User.create(newUser)
        res.status(200).json(data)
    } catch (err) {
        console.log("error on create user " + err)
        res.status(500).json(err)
    }
}

exports.login = async (req, res) => {
    // get user if exists and check if password match
    console.log("received login request " + JSON.stringify(req.body))

    passport.authenticate('local', (err, user, info) => {

        if ( err ) {
            // handle server error
            res.status( 500 ).json({message: "Unknown server error"})
        } else if ( !user ){
            // failed auth
            res.status(404).json(info)
        } else {
            // auth success
            res.status(200).json(user)
        }

    }) (req, res);

}


// Helper functions for passport auth 'local'

passport.use(
    new LocalStrategy ( {usernameField: 'email'}, async (username, password, done) => {

        // query database for username
        const query_result = await User.findAll({
            where: {
                email: username
            }
        });

        user = query_result[0];

        console.log("After db query, user result: " + JSON.stringify(user));

        // Check if user exist:
        if (user == null){

            console.log("User doesn't exist");
            return done(null, false, {message: "Email doesn't exist"});

        }

        bcrypt.compare(password, user.password, (err, res) => {

            if (err) {

                return done(err)

            } else {

                if (!res) {

                    console.log("Password doesn't match");
                    return done(null, false, {message: "Password doesn't match"});

                } else {

                    console.log("User authenticated successfully");
                    return done(null, user);

                }
            }

        } )

    })
)
