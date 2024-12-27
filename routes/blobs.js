import { Router } from 'express';
import auth from './auth.js';
import { User, Post, Client } from "../models/models.js";

const blobs = Router();

async function formatPost(post) {
    return {
        id:             post['_id'],
        creationDate:   post['creationDate'],
        author:         await (User.findById(post['author']).then(data => data.userid)),
        text:           post['text'],
    }
}

blobs.get('/', async (req, res) => {
    const posts = await Post.find();
    const docs = posts.map(formatPost);
    Promise.all(docs).then((data) => {
        res.send(data);
    });
});

blobs.get('/:id', async (req, res) => {
    try {
        const doc = await Post.findById(req.params.id);
        if(doc) {
            res.send(await formatPost(doc));
        }
    }
    catch (err) {
        res.status(404).send();
    }
});

blobs.post('/new', auth, async (req, res) => {
    const doc = await Post.create({
        text: req.body.text,
        author: await User.findOne( { userid: req.body.author }),
        clientToken: await Client.findOne({ clientToken: req.header('Client-Token') }),
    }).catch(err => {
        console.log(err);
        res.status(401).send();
    });
    res.send(doc);
});

export default blobs;
