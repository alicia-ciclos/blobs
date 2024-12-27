import { Post, User } from '../models/models.js';

async function migrate() {
    console.log('Migrating Post model...');
    await Post.find({}).populate('author');
    await Post.find({}).populate('clientToken');

    console.log('Migrating User model...');
    await User.find({}).populate('posts');
}

export { migrate };
