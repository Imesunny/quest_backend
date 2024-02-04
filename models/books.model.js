const mongoose = require("mongoose");

const booksSchema = new mongoose.Schema({
  title: String,
  author: String,
  createdAt: { type: Date, default: Date.now },
});

const BookModel = mongoose.model("book", booksSchema);
module.exports = BookModel;
