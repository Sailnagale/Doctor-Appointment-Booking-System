const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    time: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true, // Optional: adds createdAt and updatedAt
  }
);

module.exports = mongoose.model("Booking", bookingSchema);
