const mongoose =
  require("mongoose");

const printRequestSchema =
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

      fileUrl: {
        type: String,
      },

      fileName: {
        type: String,
      },

      copies: {
        type: Number,
        default: 1,
      },

      printType: {
        type: String,
        default: "Black & White",
      },

      sideType: {
        type: String,
        default: "Single Side",
      },

      status: {
        type: String,
        default: "Pending",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "PrintRequest",
    printRequestSchema
  );