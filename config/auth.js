const nJwt = require('njwt');
const secret = require('../config/secret');

function jwtAuth(req, res, next) {
    if (!req.token) {
        return res.status(403).send({ auth: false, message: 'No token provided' });
    }

    nJwt.verify(req.token, secret.secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Could not authenticate token' });
        }
        req.user_id = decoded.body.user_id;
        next();
    }); 
}

module.exports.jwtAuth = jwtAuth;