"use strict";

const Seat = require("../models/seat.model");

// Get all seat information
exports.getSeatInfo = (req, res) => {
  Seat.getSeatInfo((err, seat) => {
    if (err) throw err;
    res.send(seat);
  });
};

// Get seat information by date
exports.getSeatInfoByDate = (req, res) => {
  Seat.getSeatInfoByDate(req.params.date, (err, seat) => {
    if (err) throw err;
    res.send(seat);
  });
};

// Add new seat information
exports.addSeatEntry = (req, res) => {
  const newSeat = new Seat(req.body);
  console.log(newSeat);

  if (req.body.constructor == Object && Object.keys(req.body).length == 0) {
    res.status(400).send({
      error: true,
      message: "Please provide all the required field",
    });
  } else {
    Seat.addSeatEntry(newSeat, (err, seat) => {
      if (err) throw err;
      res.send({
        error: false,
        message: "Seat added successfully!",
        data: seat,
      });
    });
  }
};

// Update seat by date
exports.updateSeatEntry = (req, res) => {
  if (req.body.constructor == Object && Object.keys(req.body).length == 0) {
    res.status(400).send({
      error: true,
      message: "Please provide all the required field",
    });
  } else {
    Seat.updateSeatEntry(req.body, (err, seat) => {
      if (err) throw err;
      res.send({
        error: false,
        message: "Seat info updated!",
        data: seat,
      });
    });
  }
};

// Delete seat by date
exports.deleteSeatEntry = (req, res) => {
  const date = req.params.date;
  Seat.deleteSeatEntry(date, (err, seat) => {
    if (err) throw err;
    res.send({
      error: false,
      message: "Seat entry deleted!",
      data: seat,
    });
  });
};
