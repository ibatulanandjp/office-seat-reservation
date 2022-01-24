import React, { useState, useEffect } from "react";
import "./App.css";
// Services
import { getReservationList } from "./services/ReservationListService";
import { getReservationListByDate } from "./services/ReservationListByDateService";
// Components
import { ReservationTable } from "./components/ReservationTable";

function App() {
  const [reservations, setReservations] = useState([]);
  const [reservationsByDate, setReservationsByDate] = useState([]);

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

  useEffect(() => {
    getAllReservation();
  }, []);

  const date = "2022-01-19";
  useEffect(() => {
    getReservationByDate(date);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>
          {!reservations ? (
            <h2>Loading...</h2>
          ) : (
            <div>
              <h2>All Reservation List</h2>
              <ReservationTable reservations={reservations} />
              <br />
              <br />
              <h2>Reservation List By Date: {date}</h2>
              <ReservationTable reservations={reservationsByDate} />
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
