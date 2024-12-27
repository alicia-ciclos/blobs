import { connect } from '../app/connection.js';
import { migrate as _migrate } from './migrations.js';

async function migrate() {
    await connect();
    await _migrate();
    process.exit(0);
}

migrate().catch(err => {
    console.log(err);
    process.exit(1);
});
