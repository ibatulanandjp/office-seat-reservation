"use strict";

const db = require("../../config/db.config");

// Reservation constructor
const Reservation = function (reservation) {
  this.user_id = reservation.user_id;
  this.first_name = reservation.first_name;
  this.last_name = reservation.last_name;
  this.date_reservation = reservation.date_reservation;
  this.cancelled = reservation.cancelled;
};

// Get reservations
Reservation.getReservationList = (result) => {
  const sqlSelectQuery = "SELECT * from reservation;";
  db.query(sqlSelectQuery, (err, rows, fields) => {
    if (err) throw err;
    result(null, rows);
  });
};

// Get reservations by date
Reservation.getReservationListByDate = (date, result) => {
  const sqlSelectQuery = `SELECT * from reservation WHERE date_reservation BETWEEN '${date} 00:00:00' AND '${date} 23:59:59';`;
  db.query(sqlSelectQuery, (err, rows, fields) => {
    if (err) throw err;
    result(null, rows);
  });
};

// Get active reservations count for the date
Reservation.getActiveReservationCountByDate = (date, result) => {
  const sqlSelectQuery = `SELECT COUNT(*) AS active_reservation_count from reservation WHERE date_reservation BETWEEN '${date} 00:00:00' AND '${date} 23:59:59' AND cancelled=0;`;
  db.query(sqlSelectQuery, (err, rows, fields) => {
    if (err) throw err;
    result(null, rows);
  });
};

// Create Reservation
Reservation.create = (reservation, result) => {
  const sqlInsertQuery =
    "INSERT INTO reservation (user_id, first_name, last_name, date_reservation, cancelled) VALUES (?,?,?,?,?);";

  db.query(
    sqlInsertQuery,
    [
      reservation.user_id,
      reservation.first_name,
      reservation.last_name,
      reservation.date_reservation,
      reservation.cancelled,
    ],
    (err, row) => {
      if (err) throw err;
      result(null, row);
    }
  );
};

// Cancel Reservation
Reservation.cancel = (user_id, date_reservation, result) => {
  const sqlUpdateQuery = `UPDATE reservation SET cancelled = ? WHERE user_id = ? AND date_reservation BETWEEN '${date_reservation} 00:00:00' AND '${date_reservation} 23:59:59';`;
  const sqlSelectQuery = `SELECT * from reservation WHERE user_id = ? AND date_reservation BETWEEN '${date_reservation} 00:00:00' AND '${date_reservation} 23:59:59';`;

  db.query(sqlUpdateQuery, [1, user_id], (err, row) => {
    if (err) throw err;
    db.query(sqlSelectQuery, (err, rows, fields) => {
      if (err) throw err;
      result(null, rows);
    });
  });
};

// // ReReserve
// Reservation.reReserve = (user_id, date_reservation, result) => {
//   const sqlUpdateQuery =
//     "UPDATE reservation SET cancelled = ? WHERE user_id = ? AND date_reservation = ?;";
//   const sqlSelectQuery = "SELECT * from reservation;";

//   db.query(sqlUpdateQuery, [0, user_id, date_reservation], (err, row) => {
//     if (err) throw err;
//     db.query(sqlSelectQuery, (err, rows, fields) => {
//       if (err) throw err;
//       result(null, rows);
//     });
//   });
// };

module.exports = Reservation;
