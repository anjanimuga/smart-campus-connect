const mongoose =
  require("mongoose");

const busSchema =
  new mongoose.Schema(
    {
      busNumber: {
        type: String,
        required: true,
      },

      route: {
        type: String,
        required: true,
      },

      departureTime: {
        type: String,
        required: true,
      },

      arrivalTime: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        default: "On Time",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Bus",
    busSchema
  );