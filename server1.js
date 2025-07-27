const express = require("express");
const fs = require("fs");
const cors = require("cors");
const app = express();
const PORT = 3000;
const FILE_PATH = "./backend/appointments.json";

// Middleware
app.use(cors());
app.use(express.json());

// Load appointments
function loadAppointments() {
  const data = fs.readFileSync(FILE_PATH);
  return JSON.parse(data);
}

// Save appointments
function saveAppointments(data) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

// Get all appointments
app.get("/api/appointments", (req, res) => {
  const appointments = loadAppointments();
  res.json(appointments);
});

// Update appointment status
app.put("/api/appointments/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  let appointments = loadAppointments();
  const index = appointments.findIndex(app => app.id === id);
  if (index !== -1) {
    appointments[index].status = status;
    saveAppointments(appointments);
    res.json({ message: "Status updated successfully." });
  } else {
    res.status(404).json({ message: "Appointment not found." });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});
