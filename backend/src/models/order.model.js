const mongoose = require("mongoose");

const orderSchema =
  new mongoose.Schema(
    {

      userId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      customerName: {
        type: String,
        default: "",
      },

      phoneNumber: {
        type: String,
        default: "",
      },

      items: [
        {
          name: String,
          price: Number,
          quantity: Number,
          flavour: String,
          _id: String,
        },
      ],

      total: {
        type: Number,
        required: true,
      },

      orderNumber: {
        type: String,
        required: true,
      },

      tokenNumber: {
        type: Number,
        required: true,
      },

      pickupTime: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        default: "Preparing",
      },

      pickedUpAt: {
        type: String,
        default: "",
      },

    },

    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Order",
    orderSchema
  );