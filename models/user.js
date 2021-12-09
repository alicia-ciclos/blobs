const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userid: {type: String, required: true, unique: true},
    fullName: String,
    email: {type: String, required: true},
    creationDate: {type: Date, default: Date.now },
    privileged: {type: Boolean, default: false },
});

userSchema.virtual('posts', {
    ref: 'Post',
    localField: '_id',
    foreignField: 'author'
});

const User = mongoose.model('User', userSchema);

module.exports = User;