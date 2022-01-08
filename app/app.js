const express = require('express');
const connection = require('./connection');
const routes = require('../routes/routes');

require('dotenv/config');

connection.connect();

const app = express();

app.use(express.json())                                 // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Accept CORS from any domain (just for running locally!)
app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type,Client-Token');
    next();
});

app.get('/', async (req, res) => {
   res.send("OK");
});
app.use('/blobs', routes.blobs);
app.use('/users', routes.users);

app.listen(process.env.PORT || 3030, () => {
    console.log(`Listening on ${process.env.PORT}`)
});
