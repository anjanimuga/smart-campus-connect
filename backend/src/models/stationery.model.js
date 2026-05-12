const mongoose =
  require("mongoose");

const stationerySchema =
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
        default: "Stationery",
      },

      image: {
        type: String,
        default: "",
      },

      stock: {
        type: Number,
        default: 0,
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Stationery",
    stationerySchema
  );