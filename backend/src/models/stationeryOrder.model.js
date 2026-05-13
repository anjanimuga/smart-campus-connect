const mongoose =
  require("mongoose");

const stationeryOrderSchema =
  new mongoose.Schema(
    {
      userId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      userName: {
        type: String,
      },

      items: [
        {
          name: String,

          price: Number,

          quantity: Number,
        },
      ],

      totalPrice: {
        type: Number,
      },

      status: {
        type: String,
        default: "Preparing",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "StationeryOrder",
    stationeryOrderSchema
  );