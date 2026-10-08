const mongoose = require("mongoose");

const qrSessionSchema = new mongoose.Schema(
  {
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
      required: true
    },

    token: {
      type: String,
      required: true
    },

    expiresAt: {
      type: Date,
      required: true
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("QRSession", qrSessionSchema);