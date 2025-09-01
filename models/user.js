const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true, sparse: true },
  password: { type: String }, // hash
  displayName: { type: String },
  role: { type: String, enum: ['master','player'], default: 'player' },
  avatarUrl: String,
  bio: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
