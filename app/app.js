const express = require('express');
const connection = require('./connection');
const routes = require('../routes/routes');

require('dotenv/config');

connection.connect();

const app = express();

app.use(express.json())                                 // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/blobs', routes.blobs);
app.use('/users', routes.users);

app.listen(process.env.PORT || 3030, () => {
    console.log(`Listening on ${process.env.PORT}`)
});
