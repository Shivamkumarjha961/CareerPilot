const mongoose = require('mongoose');

const githubSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  username: String,
  repos: Number,
  followers: Number,
  following: Number,
  profile: String,
}, { timestamps: true });

module.exports = mongoose.model('Github', githubSchema);