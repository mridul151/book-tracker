const Book = require('../models/book.model');
const validateBook = require('../utils/validators/book.validator');
const asyncHandler = require('../utils/handlers/asyncHandler');
const ApiResponse = require('../utils/handlers/ApiResponse');
const ApiError = require('../utils/handlers/ApiError');

const getAllBooks = asyncHandler(async (req, res) => {
  const { author, year } = req.query;
  const query = {};
  if (author) {
    query.author = author;
  }
  if (year) {
    query.publicationYear = parseInt(year);
  }
  const books = await Book.find(query);
  return res.status(200).json(new ApiResponse(200, books));
});


const getBookDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);
  if (!book) {
    throw new ApiError(404, 'Book not found');
  }

  return res.status(200).json(new ApiResponse(200, book));
});
const createBook = asyncHandler(async (req, res) => {
  const { title, author, publicationYear, genre, description, publisher } = req.body;
  const error = validateBook({ title, author, publicationYear, genre, description, publisher });
  if (error) {
    throw new ApiError(400, error);
  }

  const newBook = new Book({ title, author, publicationYear, genre, description, publisher });
  await newBook.save();
  return res.status(201).json(new ApiResponse(201, newBook));
});

const updateBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, author, publicationYear } = req.body;
  const error = validateBook({ title, author, publicationYear });
  if (error) {
    throw new ApiError(400, error);
  }

  const updatedBook = await Book.findByIdAndUpdate(
    id,
    { title, author, publicationYear },
    { new: true }
  );
  if (!updatedBook) {
    throw new ApiError(404, 'Book not found');
  }

  return res.json(new ApiResponse(200, updatedBook));
});

const deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedBook = await Book.findByIdAndDelete(id);
  if (!deletedBook) {
    throw new ApiError(404, 'Book not found');
  }

  return res.json(new ApiResponse(200, { message: 'Book deleted' }));
});

module.exports = {
  getAllBooks,
  getBookDetail,
  createBook,
  updateBook,
  deleteBook,
};