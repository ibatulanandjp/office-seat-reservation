"use strict";

const Reservation = require("../models/reservation.model");

// Get all reservations
exports.getReservationList = (req, res) => {
  Reservation.getReservationList((err, reservation) => {
    if (err) res.send(err);
    res.send(reservation);
  });
};

// Get reservations by date
exports.getReservationListByDate = (req, res) => {
  Reservation.getReservationListByDate(req.params.date, (err, reservation) => {
    if (err) res.send(err);
    res.send(reservation);
  });
};

// Get active reservations count for the date
exports.getActiveReservationCountByDate = (req, res) => {
  Reservation.getActiveReservationCountByDate(
    req.params.date,
    (err, reservationCount) => {
      if (err) res.send(err);
      res.send(reservationCount);
    }
  );
};

// Create reservation
exports.create = (req, res) => {
  const newReservation = new Reservation(req.body);

  if (req.body.constructor == Object && Object.keys(req.body).length == 0) {
    res.status(400).send({
      error: true,
      message: "Please provide all the required field",
    });
  } else {
    Reservation.create(newReservation, (err, reservation) => {
      if (err) res.send(err);
      res.send({
        error: false,
        message: "Reservation added successfully!",
        data: reservation,
      });
    });
  }
};

// Cancel reservation
exports.cancel = (req, res) => {
  const user_id = req.body.user_id;
  const date_reservation = req.body.date_reservation;

  if (req.body.constructor == Object && Object.keys(req.body).length == 0) {
    res.status(400).send({
      error: true,
      message: "Please provide all the required field",
    });
  } else {
    Reservation.cancel(user_id, date_reservation, (err, reservation) => {
      if (err) res.send(err);
      res.send({
        error: false,
        message: "Reservation cancelled!",
        data: reservation,
      });
    });
  }
};

// // Re-reserve
// exports.reReserve = (req, res) => {
//   const user_id = req.body.user_id;
//   const date_reservation = req.body.date_reservation;

//   if (req.body.constructor == Object && Object.keys(req.body).length == 0) {
//     res.status(400).send({
//       error: true,
//       message: "Please provide all the required field",
//     });
//   } else {
//     Reservation.reReserve(user_id, date_reservation, (err, reservation) => {
//       if (err) res.send(err);
//       res.send({
//         error: false,
//         message: "Re-Reservation successful!",
//         data: reservation,
//       });
//     });
//   }
// };
