var User = require('../models/user.model')
const bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken')


exports.get_user = async (req, res) => {
    console.log(req.params.email)
    try{
        const db_query = await User.findAll({
            where: {
                email: req.params.email
            }
        })

        const user = {
            firstName: db_query[0].firstName,
            lastName: db_query[0].lastName,
            email: db_query[0].email,
            role: db_query[0].role
        }
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
        const user = await User.create(newUser)

        var response = {
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            },
            token: generate_jwt(user.email)
        }

        res.status(200).json(response)
    } catch (err) {
        console.log("error on create user " + JSON.stringify(err));
        if (err.name == "SequelizeUniqueConstraintError"){
            // email unique error
            var response = {
                user: {
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                },
                errorMsg: "Email already exist in the system"
            };
            res.status(422).json(response)
        } else {
            res.status(500).json(err)
        }
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
            res.status(200).json({token: generate_jwt(user.email)})
        }

    }) (req, res);

}


// Helper functions

// generate jwt token:
var generate_jwt = username => {

    return jwt.sign({username: username},
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRATION
        });
}


// jwt Strategy

var options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = process.env.JWT_SECRET;
options.username =

passport.use(
    new JwtStrategy(options, (jwt_payload, done) => {
        console.log("In jwt strategy: " + JSON.stringify(jwt_payload));

        return done(null, {})

    })
)

// 'local' Strategy

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
                    return done(null, false, {message: "Wrong password"});

                } else {

                    console.log("User authenticated successfully");
                    return done(null, user);

                }
            }

        } )

    })
);


