const express = require('express');
const bookRoutes = require('./book.routes');
const userRoutes=require('./user.routes')

const router = express.Router();

router.use('/users', userRoutes);
router.use('/books', bookRoutes);

module.exports = router;