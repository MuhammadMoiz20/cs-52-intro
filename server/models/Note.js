const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Note', schema);
