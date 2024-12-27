import { Schema, model } from 'mongoose';

const clientSchema = new Schema({
    clientName: String,
    clientToken: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const Client = model('Client', clientSchema);

export default Client;
