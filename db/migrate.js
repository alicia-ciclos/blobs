const connection = require('../app/connection');
const migrations = require('./migrations');

async function migrate() {
    await connection.connect();
    await migrations.migrate();
    process.exit(0);
}

migrate().catch(err => {
    console.log(err);
    process.exit(1);
});