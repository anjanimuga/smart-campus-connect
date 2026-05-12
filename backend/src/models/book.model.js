const mongoose =
  require("mongoose");

const bookSchema =
  new mongoose.Schema(
    {
      bookName: {
        type: String,
        required: true,
      },

      author: {
        type: String,
        required: true,
      },

      department: {
        type: String,
        required: true,
      },

      floor: {
        type: String,
        required: true,
      },

      section: {
        type: String,
        required: true,
      },

      shelf: {
        type: String,
        required: true,
      },

      available: {
        type: Boolean,
        default: true,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Book",
    bookSchema
  );