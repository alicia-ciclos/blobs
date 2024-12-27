import { Schema, model } from 'mongoose';

const postSchema = new Schema({
    creationDate: {type: Date, default: Date.now },
    text: {type: String, required: true },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clientToken: {
        type: Schema.Types.ObjectId,
        ref: 'Client',
        required: true
    },
});

const Post = model('Post', postSchema);

export default Post;
