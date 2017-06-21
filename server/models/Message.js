let mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
    received: Date,
    name: String,
    email: String,
    phone: String,
    message: String
});

var Message = mongoose.model('Message', MessageSchema);

module.exports = Message;