const jwt = require('jsonwebtoken');

module.exports.verifyJwtToken = (req, res, next) => {
    var token;
    console.log("In verifyJwtToken")
    console.log(req)
    if ('authorization' in req.headers)
        token = req.headers['authorization'].split(' ')[1];

    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    else {
        jwt.verify(token, process.env.JWT_SECRET,
            (err, decoded) => {
                if (err)
                    return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
                else {
                    req.body.email = decoded.email;
                    next();
                }
            }
        )
    }
}
