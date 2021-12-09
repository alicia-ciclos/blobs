const models = require('../models/models');

async function migrate() {
    console.log('Migrating Post model...');
    await models.Post.find({}).populate('author');
    await models.Post.find({}).populate('clientToken');

    console.log('Migrating User model...');
    await models.User.find({}).populate('posts');
}

module.exports = {
    migrate: migrate,
}