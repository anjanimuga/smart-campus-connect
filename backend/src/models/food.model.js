const mongoose = require("mongoose");

const foodSchema =
  new mongoose.Schema(
    {

      name: {
        type: String,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },

      category: {
        type: String,
        required: true,
      },

      image: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        default: "",
      },

      available: {
        type: Boolean,
        default: true,
      },

      stock: {
        type: Number,
        default: 20,
      },

      flavours: [
        {
          type: String,
        },
      ],

    },

    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Food",
    foodSchema
  );