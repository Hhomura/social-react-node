const jwt = require('jsonwebtoken')
const {promisfy} = require('util');

async function validate(req, res, next) {
    const {authorization} = req.headers;

    if(!authorization) {
        return res.sendStatus(401);
    }

    const [, token] = authorization.split(' ');

    try{
        await promisfy(jwt.verify)(token, process.env.SECRET);

        return next();
    }catch(err){
        return res.sendStatus(401)
    }
}

module.exports = validate;