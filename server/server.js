const express = require("express");
const app = express();

// DB Config
const db = require("./config/db.config");

// Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3001;

// === Routes ===
// Reservation routes
const reservationRoutes = require("./src/routes/reservation.routes");
app.use("/api/v1/reservation", reservationRoutes);

// Seat routes
const seatRoutes = require("./src/routes/seat.routes");
app.use("/api/v1/seat", seatRoutes);

// Get on / for checking if the app works
app.get("/", (req, res) => {
  res.send({ message: "The app is working fine!" });
});

// Listen on the port
app.listen(port, () => {
  console.log("Running on port", port);
});
