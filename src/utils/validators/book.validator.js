const Joi = require('joi');


const bookSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  publicationYear: Joi.number().required(),
  genre: Joi.string().required(),
  description: Joi.string().required(),
  publisher: Joi.string().required(),
});


const validateBook = (book) => {
  const { error } = bookSchema.validate(book);
  return error ? error.details[0].message : null;
};

module.exports = validateBook;