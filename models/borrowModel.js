const mongoose = require('mongoose');

const borrowSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  },
  borrower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  borrowedAt: {
    type: Date,
    default: Date.now,
  },
  returnedAt: {
    type: Date,
  },
  charge: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true,
});

const Borrow = mongoose.model('Borrow', borrowSchema);

module.exports = Borrow;
