const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    email: { type: String, required: true},
    password: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now}
});

module.exports = mongoose.model('User', UserSchema);