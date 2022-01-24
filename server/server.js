const express = require("express");
const app = express();

// DB Config
const db = require("./config/db.config");

// Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 3001;

// -------------

// Reservation routes
const reservationRoutes = require("./src/routes/reservation.routes");
app.use("/api/v1/reservation", reservationRoutes);

// Seat routes
const seatRoutes = require("./src/routes/seat.routes");
app.use("/api/v1/seat", seatRoutes);

// -------------

// Get on / for checking if the app works
app.get("/", (req, res) => {
  res.send({ message: "The app is working fine!" });
});

// // Get on /reservation for list of all reservations
// app.get("/reservation", (req, res) => {
//   const sqlSelectQuery = "SELECT * from reservation;";
//   db.query(sqlSelectQuery, (err, rows, fields) => {
//     if (err) throw err;
//     res.send(rows);
//   });
// });

// // Get on /reservation/date for list of all reservations on a specific date
// app.get("/reservation/date", (req, res) => {
//   let dt = req.query.dt;
//   const sqlSelectQuery = `SELECT * from reservation WHERE date_reservation BETWEEN '${dt} 00:00:00' AND '${dt} 23:59:59';`;

//   db.query(sqlSelectQuery, (err, rows, fields) => {
//     if (err) throw err;
//     res.send(rows);
//   });
// });

// // Post on /reservation/create to reserve a seat
// app.post("/reservation/create", (req, res) => {
//   const user_id = req.body.user_id;
//   const first_name = req.body.first_name;
//   const last_name = req.body.last_name;
//   const date_reservation = req.body.date_reservation;
//   const cancelled = req.body.cancelled;

//   const sqlInsertQuery =
//     "INSERT INTO reservation (user_id, first_name, last_name, date_reservation, cancelled) VALUES (?,?,?,?,?);";

//   db.query(
//     sqlInsertQuery,
//     [user_id, first_name, last_name, date_reservation, cancelled],
//     (err, row) => {
//       if (err) throw err;
//       res.send(row);
//     }
//   );
// });

// // Put on /reservation/cancel to cancel the reservation
// app.put("/reservation/cancel", (req, res) => {
//   const user_id = req.body.user_id;
//   const day_reserved = req.body.day_reserved;
//   const cancelled = req.body.cancelled;

//   const sqlUpdateQuery =
//     "UPDATE reservation SET cancelled = ? WHERE user_id = ? AND day_reserved = ?;";
//   const sqlSelectQuery = "SELECT * from reservation;";

//   db.query(sqlUpdateQuery, [cancelled, user_id, day_reserved], (err, row) => {
//     if (err) throw err;
//     db.query(sqlSelectQuery, (err, rows, fields) => {
//       if (err) throw err;
//       res.send(rows);
//     });
//   });
// });

// ---------
// // Get on /seat/date for total seat on a specific date
// app.get("/seat/date", (req, res) => {
//   let dt = req.query.dt;
//   const sqlSelectQuery = `SELECT total_seat from seat WHERE date_reservation BETWEEN '${dt} 00:00:00' AND '${dt} 23:59:59';`;

//   db.query(sqlSelectQuery, (err, rows, fields) => {
//     if (err) throw err;
//     res.send(rows);
//   });
// });

// Listen on the port
app.listen(port, () => {
  console.log("Running on port", port);
});
