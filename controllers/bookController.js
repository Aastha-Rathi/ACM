const Book = require('../models/Book');

// Create 
exports.createBook = async (req, res) => {
  const { title, author, genre, publishedYear } = req.body;
  
  try {
    const newBook = new Book({ title, author, genre, publishedYear });
    await newBook.save();
    res.status(201).json({
      message: 'Book added successfully',
      book: newBook
    });
  } catch (err) {
    console.error(err);  
    res.status(400).json({ message: err.message });
  }
};

// Get 
exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err);  
    res.status(500).json({ message: err.message });
  }
};

// Update 
exports.updateBook = async (req, res) => {
  const { title, author, genre, publishedYear } = req.body;
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });

    book.title = title || book.title;
    book.author = author || book.author;
    book.genre = genre || book.genre;
    book.publishedYear = publishedYear || book.publishedYear;
    await book.save();
    res.json({
      message: 'Book updated successfully',
      updatedBook: book
    });
  } catch (err) {
    console.error(err);  
    res.status(400).json({ message: err.message });
  }
};

// Delete
exports.deleteBook = async (req, res) => {
  const bookId = req.params.id.trim();
  
  try {
    const deletedBook = await Book.findByIdAndDelete(bookId);
    
    if (!deletedBook) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.json({
      message: `Book with ID ${bookId} is deleted successfully.`
    });
  } catch (err) {
    console.error(err);  
    res.status(500).json({ message: err.message });
  }
};
