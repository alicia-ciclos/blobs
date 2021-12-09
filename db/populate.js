const uuid = require('uuid');
const connection = require('../app/connection');
const models = require('../models/models');

const users = [
    new models.User({
        userid: "admin",
        fullName: "Admin User",
        email: "admin@localhost",
        privileged: true,
    }),
];

async function populate() {
    await connection.connect();
    await models.User.create(users).catch(err => console.log(err));
    await models.Client.create({
        clientName: "Demo API token",
        clientToken: uuid.v4(),
        user: await models.User.findOne({ userid: "admin" }),
    });
    await models.Client.find().populate('user');
    console.log("Database populated successfully");
    process.exit(0);
}

populate().catch(err => {
    console.log(err);
    process.exit(1);
});
