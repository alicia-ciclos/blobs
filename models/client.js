const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
    clientName: String,
    clientToken: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Client', clientSchema);