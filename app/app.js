import express, { json, urlencoded, static as express_static } from 'express';
import { connect } from './connection.js';
import { blobs, users } from '../routes/routes.js';

import 'dotenv/config';

connect();

const app = express();

app.use(json())                                 // for parsing application/json
app.use(urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Accept CORS from any domain (just for running locally!)
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type,Client-Token');
    next();
});

app.use(express_static('public'));

app.get('/', async (req, res) => {
   res.send("OK");
});
app.use('/blobs', blobs);
app.use('/users', users);

app.listen(process.env.PORT || 3030, () => {
    console.log(`Listening on ${process.env.PORT}`)
});
