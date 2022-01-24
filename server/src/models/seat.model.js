"use strict";

const db = require("../../config/db.config");

// Seat Constructor
const Seat = function (seat) {
  this.date_reservation = seat.date_reservation;
  this.total_seat = seat.total_seat;
};

// Get all seat information
Seat.getSeatInfo = (result) => {
  const sqlSelectQuery = "SELECT * from seat;";
  db.query(sqlSelectQuery, (err, rows, fields) => {
    if (err) throw err;
    result(null, rows);
  });
};

// Get seat information by date
Seat.getSeatInfoByDate = (date, result) => {
  const sqlSelectQuery = `SELECT * from seat WHERE date_reservation BETWEEN '${date} 00:00:00' AND '${date} 23:59:59';`;
  db.query(sqlSelectQuery, (err, rows, fields) => {
    if (err) throw err;
    result(null, rows);
  });
};

// Add seat information in Seat table
Seat.addSeatEntry = (seat, result) => {
  const sqlInsertQuery =
    "INSERT INTO seat (date_reservation, total_seat) VALUES (?,?);";
  db.query(
    sqlInsertQuery,
    [seat.date_reservation, seat.total_seat],
    (err, row) => {
      if (err) throw err;
      result(null, row);
    }
  );
};

// Update total seat information by date
Seat.updateSeatEntry = (seat, result) => {
  const sqlUpdateQuery = `UPDATE seat SET total_seat = ? WHERE date_reservation BETWEEN '${seat.date_reservation} 00:00:00' AND '${seat.date_reservation} 23:59:59';`;
  const sqlSelectQuery = `SELECT * from seat WHERE date_reservation BETWEEN '${seat.date_reservation} 00:00:00' AND '${seat.date_reservation} 23:59:59';`;

  db.query(sqlUpdateQuery, [seat.total_seat], (err, row) => {
    if (err) throw err;
    db.query(sqlSelectQuery, (err, rows, fields) => {
      if (err) throw err;
      result(null, rows);
    });
  });
};

// Delete seat information by date
Seat.deleteSeatEntry = (date, result) => {
  const sqlDeleteQuery = `DELETE from seat WHERE date_reservation BETWEEN '${date} 00:00:00' AND '${date} 23:59:59';`;
  db.query(sqlDeleteQuery, (err, row) => {
    if (err) throw err;
    result(null, row);
  });
};

module.exports = Seat;
