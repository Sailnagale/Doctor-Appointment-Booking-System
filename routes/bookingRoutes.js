// routes/bookingRoutes.js
const express = require("express");
const router = express.Router();
const Booking = require("../models/booking.js"); // Import the model

// Create booking
// POST /api/bookings/
router.post("/", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all bookings
// GET /api/bookings/
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
