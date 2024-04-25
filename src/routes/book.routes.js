const express = require('express');
const {
  getAllBooks,
  getBookDetail,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/book.controller');
const authenticateUser = require('../middlewares/auth.middleware');
const apiHandler = require('../utils/apiHandler');

const router = express.Router();

router.get('/', authenticateUser, getAllBooks);

router.get('/:id', authenticateUser, getBookDetail);

router.post('/', authenticateUser, createBook);

router.put('/:id', authenticateUser, updateBook);

router.delete('/:id', authenticateUser,deleteBook);

module.exports = router;