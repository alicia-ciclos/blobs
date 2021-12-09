const express = require('express');
const auth = require('./auth');
const models = require("../models/models");

const blobs = express.Router();

async function formatPost(post) {
    return {
        id:             post['_id'],
        creationDate:   post['creationDate'],
        author:         await (models.User.findById(post['author']).then(data => data.userid)),
        text:           post['text'],
    }
}

blobs.get('/', async (req, res) => {
    const posts = await models.Post.find();
    const docs = posts.map(formatPost);
    Promise.all(docs).then((data) => {
        res.send(data);
    });
});

blobs.get('/:id', async (req, res) => {
    try {
        const doc = await models.Post.findById(req.params.id);
        if(doc) {
            res.send(await formatPost(doc));
        }
    }
    catch (err) {
        console.error("There was an error!");
        res.status(500).send();
    }
});

blobs.post('/new', auth, async (req, res) => {
    const doc = await models.Post.create({
        text: req.body.text,
        author: await models.User.findOne( { userid: req.body.author }),
        clientToken: await models.Client.findOne({ clientToken: req.header('Client-Token') }),
    }).catch(err => {
        console.log(err);
        res.status(401).send();
    });
    res.send(doc);
});

module.exports = blobs;