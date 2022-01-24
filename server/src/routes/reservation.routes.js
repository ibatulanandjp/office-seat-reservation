const express = require("express");
const router = express.Router();

const reservationController = require("../controllers/reservation.controller");

// Get all reservations
router.get("/", reservationController.getReservationList);

// Get reservations by date
router.get("/:date", reservationController.getReservationListByDate);

// Create reservation
router.post("/", reservationController.create);

// Cancel reservation
router.put("/cancel", reservationController.cancel);

module.exports = router;
