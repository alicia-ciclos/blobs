const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    creationDate: {type: Date, default: Date.now },
    text: {type: String, required: true },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clientToken: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;