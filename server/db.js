const mongoose = require('mongoose');

async function connect() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/cs52notes';
  await mongoose.connect(uri);
  console.log('mongo connected');
}

module.exports = { connect };
