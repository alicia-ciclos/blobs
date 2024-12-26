const Client = require('../models/client');

const auth = async function(req, res, next) {
    const token = req.header('Client-Token');
    const client = await Client.findOne({ clientToken: token });
    if(client) {
        next();
    } else {
        res.status(401).send();
    }
}

module.exports = auth;
