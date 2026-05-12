const Book =
  require(
    "../models/book.model"
  );

// GET ALL BOOKS
exports.getBooks =
  async (
    req,
    res
  ) => {

    try {

      const books =
        await Book.find();

      res.json(
        books
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// ADD BOOK
exports.addBook =
  async (
    req,
    res
  ) => {

    try {

      const book =
        await Book.create(
          req.body
        );

      res.status(201).json(
        book
      );

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

// DELETE BOOK
exports.deleteBook =
  async (
    req,
    res
  ) => {

    try {

      await Book.findByIdAndDelete(
        req.params.id
      );

      res.json({
        message:
          "Book deleted",
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };