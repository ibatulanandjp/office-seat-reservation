import React, { useState, useEffect } from "react";
import "./App.css";
// Services
import { getReservationList } from "./services/ReservationListService";
import { getReservationListByDate } from "./services/ReservationListByDateService";
import { getSeatInfo } from "./services/SeatInfoService";
import { getSeatInfoByDate } from "./services/SeatInfoByDateService";

// Components
import { ReservationTable } from "./components/ReservationTable";
import { SeatTable } from "./components/SeatTable";

function App() {
  const [reservations, setReservations] = useState([]);
  const [reservationsByDate, setReservationsByDate] = useState([]);

  const [seatInfo, setSeatInfo] = useState([]);
  const [seatInfoByDate, setSeatInfoByDate] = useState([]);

  const getAllReservation = async () => {
    const reservationList = await getReservationList();
    console.log(reservationList);
    setReservations(reservationList);
  };

  const getReservationByDate = async (date) => {
    const reservationListByDate = await getReservationListByDate(date);
    console.log(reservationListByDate);
    setReservationsByDate(reservationListByDate);
  };

  const getSeat = async () => {
    const seat = await getSeatInfo();
    console.log(seat);
    setSeatInfo(seat);
  };

  const getSeatByDate = async (date) => {
    const seatByDate = await getSeatInfoByDate(date);
    console.log(seatByDate);
    setSeatInfoByDate(seatByDate);
  };

  // ================================
  const date = "2022-01-19";

  useEffect(() => {
    getAllReservation();
  }, []);

  useEffect(() => {
    getReservationByDate(date);
  }, []);

  useEffect(() => {
    getSeat();
  }, []);

  useEffect(() => {
    getSeatByDate(date);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h2>Seat Reservation System - Admin</h2>
      </header>
      <body>
        <div>
          {!reservations ? (
            <h2>Loading...</h2>
          ) : (
            <div className="row">
              <div className="col bg-white">
                <div className="bg-primary rounded">
                  <h4>All Reservation List</h4>
                  <ReservationTable reservations={reservations} />
                </div>
                <div className="bg-primary rounded">
                  <h4>Reservation List By Date:</h4>
                  <h4>{date}</h4>
                  <ReservationTable reservations={reservationsByDate} />
                </div>
              </div>
              <div className="col bg-white">
                <div className="bg-primary rounded">
                  <h4>Seat Information</h4>
                  <SeatTable seatInfo={seatInfo} />
                </div>
                <div className="bg-primary rounded">
                  <h4>Seat Information By Date:</h4>
                  <h4>{date}</h4>
                  <SeatTable seatInfo={seatInfoByDate} />
                </div>
              </div>
            </div>
          )}
        </div>
      </body>
    </div>
  );
}

export default App;
