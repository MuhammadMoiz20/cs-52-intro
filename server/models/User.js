const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email: { type: String, unique: true },
  passwordHash: String,
}, { timestamps: true });

module.exports = mongoose.model('User', schema);
