const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    fileName: {
      type: String,
      default: '',
      trim: true,
    },

    filePath: {
      type: String,
      default: '',
      trim: true,
    },

    atsScore: {
      type: Number,
      required: true,
      default: 0,
    },

    extractedText: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Resume', resumeSchema);
