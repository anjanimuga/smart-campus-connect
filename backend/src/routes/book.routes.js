const express =
  require("express");

const router =
  express.Router();

const {
  getBooks,
  addBook,
  deleteBook,
} = require(
  "../controllers/book.controller"
);

// GET BOOKS
router.get(
  "/",
  getBooks
);

// ADD BOOK
router.post(
  "/",
  addBook
);

// DELETE BOOK
router.delete(
  "/:id",
  deleteBook
);

module.exports =
  router;