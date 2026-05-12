const mongoose =
  require("mongoose");

const librarySchema =
  new mongoose.Schema(
    {

      seatNumber: {
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

      isBooked: {
        type: Boolean,
        default: false,
      },

      bookedBy: {
        type: String,
        default: "",
      },

      bookedById: {
        type: String,
        default: "",
      },

      bookedAt: {
        type: Date,
      },

      expiryTime: {
        type: Date,
      },

    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "LibrarySeat",
    librarySchema
  );