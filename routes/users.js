const express = require('express');
const models = require("../models/models");
const auth = require("./auth");

const users = express.Router();

users.use(auth);  // Authentication middleware

users.get('/', async (req, res) => {
    const docs = await models.User.find();
    res.send(docs);
});

users.get('/:userid', async (req, res) => {
    const doc = await models.User.findOne({ userid: req.params.userid }).catch(err => ({
        "error": err,
    }));
    res.send(doc);
});

users.post('/new', async (req, res) => {
    const data = {
        userid: req.body.userid,
        fullName: req.body.fullName,
        email: req.body.email,
    }
    const doc = await models.User.create(data)
    res.send(doc);
});

module.exports = users;