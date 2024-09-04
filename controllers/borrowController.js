const mongoose = require('mongoose');
const Borrow = require('../models/borrowModel');
const Book = require('../models/bookModel');

// Check if a value is a valid ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

exports.borrowBook = async (req, res) => {
  try {
    const { bookId, borrowerId, charge } = req.body;

    // Validate ObjectId format
    if (!isValidObjectId(bookId) || !isValidObjectId(borrowerId)) {
      return res.status(400).json({ message: 'Invalid bookId or borrowerId' });
    }

    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    const newBorrow = new Borrow({
      book: bookId,
      borrower: borrowerId,
      charge,
    });

    await newBorrow.save();

    book.borrowedBy = borrowerId;
    await book.save();

    res.status(201).json({ message: 'Book borrowed successfully', borrowId: newBorrow._id });
  } catch (error) {
    res.status(500).json({ message: 'Borrowing failed', error: error.message });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const borrowId = req.params.id;

    // Validate ObjectId format
    if (!isValidObjectId(borrowId)) {
      return res.status(400).json({ message: 'Invalid borrowId' });
    }

    const borrowRecord = await Borrow.findById(borrowId).populate('book');

    if (!borrowRecord) {
      return res.status(404).json({ message: 'Borrow record not found' });
    }

    if (borrowRecord.returnedAt) {
      return res.status(400).json({ message: 'Book already returned' });
    }

    borrowRecord.returnedAt = Date.now();
    await borrowRecord.save();

    const book = await Book.findById(borrowRecord.book._id);
    book.borrowedBy = null;
    await book.save();

    res.status(200).json({ message: 'Book returned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Returning failed', error: error.message });
  }
};
