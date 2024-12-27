import { Router } from 'express';
import { User } from "../models/models.js";
import auth from "./auth.js";

const users = Router();

users.use(auth);  // Authentication middleware

users.get('/', async (req, res) => {
    const docs = await User.find();
    res.send(docs);
});

users.get('/:userid', async (req, res) => {
    const doc = await User.findOne({ userid: req.params.userid }).catch(err => ({
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
    const doc = await User.create(data)
    res.send(doc);
});

export default users;
