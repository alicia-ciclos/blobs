import { connect as _connect } from 'mongoose';
import { migrate } from '../db/migrations.js';

import 'dotenv/config';

async function connect() {
    const connectOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    try {
        await _connect(process.env.MONGO_URI, connectOptions);
        console.log(`Connected to database ${process.env.MONGO_URI}`);
        if(process.env.MIGRATE === "1") {
            console.log('Performing migrations:');
            await migrate();
            console.log('Migrations complete');
        }
    }
    catch(err) {
        console.log(`Couldn't connect: ${err}`);
    }
}

export { connect };
