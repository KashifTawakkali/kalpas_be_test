const Library = require('../models/libraryModel');
const Book = require('../models/bookModel');
const Borrow = require('../models/borrowModel');

// Get all libraries
exports.getAllLibraries = async (req, res) => {
  try {
    const libraries = await Library.find().populate('books');
    res.status(200).json(libraries);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve libraries', error: error.message });
  }
};

// Get library by ID with book details
exports.getLibraryById = async (req, res) => {
  try {
    const library = await Library.findById(req.params.id)
      .populate({
        path: 'books',
        populate: {
          path: 'borrowedBy',
          select: 'name'
        }
      });

    if (!library) {
      return res.status(404).json({ message: 'Library not found' });
    }

    res.status(200).json(library);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve library', error: error.message });
  }
};

// Create a new library
exports.createLibrary = async (req, res) => {
  try {
    const { name, location } = req.body;
    const newLibrary = new Library({ name, location });
    await newLibrary.save();
    res.status(201).json({ message: 'Library created successfully', library: newLibrary });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create library', error: error.message });
  }
};

// Update library by ID
exports.updateLibrary = async (req, res) => {
  try {
    const library = await Library.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!library) {
      return res.status(404).json({ message: 'Library not found' });
    }

    res.status(200).json({ message: 'Library updated successfully', library });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update library', error: error.message });
  }
};

// Delete library by ID
exports.deleteLibrary = async (req, res) => {
  try {
    const library = await Library.findByIdAndDelete(req.params.id);

    if (!library) {
      return res.status(404).json({ message: 'Library not found' });
    }

    // Optionally, you can also remove books or handle other cleanup tasks here

    res.status(200).json({ message: 'Library deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete library', error: error.message });
  }
};
