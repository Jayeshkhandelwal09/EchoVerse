const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  mood: {
    type: String,
    required: true,
  },
  audioUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  unlockAt: {
    type: Date,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  isNotified: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Entry', entrySchema);
