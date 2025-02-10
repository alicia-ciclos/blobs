import { v4 } from 'uuid';
import { connect } from '../app/connection.js';
import { User, Client } from '../models/models.js';

const users = [
    new User({
        userid: "admin",
        fullName: "Admin User",
        email: "admin@localhost",
        privileged: true,
    }),
    new User({
        userid: "user",
        fullName: "Regular User",
        email: "user@localhost",
        privileged: false,
    }),
];

async function populate() {
    await connect();
    await User.create(users).catch(err => console.log(err));
    await Client.create({
        clientName: "Demo API token (admin)",
        clientToken: v4(),
        user: await User.findOne({ userid: "admin" }),
    });
    await Client.create({
        clientName: "Demo API token (user)",
        clientToken: v4(),
        user: await User.findOne({ userid: "user" }),
    });
    await Client.find().populate('user');
    console.log("Database populated successfully");
    process.exit(0);
}

populate().catch(err => {
    console.log(err);
    process.exit(1);
});
