// server.js
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bookingRoutes = require("./routes/bookingRoutes.js"); // Import the corrected router

const app = express();
const PORT = 3000;

// --- Database Connection ---
// Replace with your MongoDB connection string
const MONGO_URI = "mongodb://localhost:27017/smartbooker";
mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// --- Middleware ---
// To parse JSON request bodies
app.use(express.json());
// To serve static files (like index.html) from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// --- Routes ---
// Mount the booking routes on the /api/bookings path
app.use("/api/bookings", bookingRoutes);

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
