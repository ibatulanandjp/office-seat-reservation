const express = require("express");
const router = express.Router();

const seatController = require("../controllers/seat.controller");

// Get seat info
router.get("/", seatController.getSeatInfo);

// Get seat info by date
router.get("/:date", seatController.getSeatInfoByDate);

// Add seat entry
router.post("/", seatController.addSeatEntry);

// Update seat entry
router.put("/update", seatController.updateSeatEntry);

// Delete seat entry
router.delete("/delete/:date", seatController.deleteSeatEntry);

module.exports = router;
