const express = require('express');
const { borrowBook, returnBook } = require('../controllers/borrowController');

const router = express.Router();

// Borrow a Book
router.post('/', borrowBook);

// Return a Book
router.put('/return/:id', returnBook);

module.exports = router;
