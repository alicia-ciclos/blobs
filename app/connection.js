const mongoose = require('mongoose');
const migrations = require('../db/migrations');

require('dotenv/config');

async function connect() {
    const connectOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    try {
        await mongoose.connect(process.env.MONGO_URI, connectOptions);
        console.log(`Connected to database ${process.env.MONGO_URI}`);
        if(process.env.MIGRATE === "1") {
            console.log('Performing migrations:');
            await migrations.migrate();
            console.log('Migrations complete');
        }
    }
    catch(err) {
        console.log(`Couldn't connect: ${err}`);
    }
}

module.exports = {
    connect: connect,
}
