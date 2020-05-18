var User = require('../models/User')

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

exports.create_user = async(req, res) => {
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
