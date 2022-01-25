import React, { useState, useEffect } from "react";
import "./App.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Services
import { getReservationList } from "../services/ReservationListService";
import { getReservationListByDate } from "../services/ReservationListByDateService";
import { getActiveReservationCountByDate } from "../services/ActiveReservationCountByDateService";
import { getSeatInfo } from "../services/SeatInfoService";
import { getSeatInfoByDate } from "../services/SeatInfoByDateService";

// Components
import { Header } from "../components/Header/Header";
import { ReservationTable } from "../components/ReservationTable/ReservationTable";
import { SeatTable } from "../components/SeatTable/SeatTable";

function App() {
  const [reservations, setReservations] = useState([]);
  const [reservationsByDate, setReservationsByDate] = useState([]);
  const [activeReservationCountByDate, setActiveReservationCountByDate] =
    useState();

  const [seatInfo, setSeatInfo] = useState([]);
  const [seatInfoByDate, setSeatInfoByDate] = useState([]);

  const [date, setDate] = useState(new Date());

  // ================================
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

  const getActiveReservationCount = async (date) => {
    const activeReservationCount = await getActiveReservationCountByDate(date);
    console.log(activeReservationCount);
    setActiveReservationCountByDate(activeReservationCount);
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

  const getSelectedDate = async (date) => {
    console.log(date);
    setDate(date);
  };

  // ================================
  useEffect(() => {
    getAllReservation();
  }, []);

  useEffect(() => {
    getReservationByDate(
      date.toLocaleDateString("ja-JP", "yyyy-MM-dd").replaceAll("/", "-")
    );
  }, [date]);

  useEffect(() => {
    getActiveReservationCount(
      date.toLocaleDateString("ja-JP", "yyyy-MM-dd").replaceAll("/", "-")
    );
  }, [date]);

  useEffect(() => {
    getSeat();
  }, []);

  useEffect(() => {
    getSeatByDate(
      date.toLocaleDateString("ja-JP", "yyyy-MM-dd").replaceAll("/", "-")
    );
  }, [date]);

  // ==============================
  return (
    <div>
      <Header />
      <br />
      <div>
        {!reservations ? (
          <h2>Loading...</h2>
        ) : (
          <div className="container-fluid">
            <div className="row g-0">
              <div className="col bg-white border rounded p-3 card">
                <div className="border rounded">
                  <div class="card-header bg-primary">Select Date</div>
                  <div className="card-body">
                    <DatePicker
                      selected={date}
                      onSelect={(date) => {
                        getSelectedDate(date);
                      }}
                      dateFormat={"yyyy-MM-dd"}
                    />
                  </div>
                </div>
                <br />
                <div className="border rounded">
                  <div className="bg-primary rounded">
                    <div class="card-header bg-primary">Date Selected:</div>
                    <div className="card-body bg-white">
                      {date
                        .toLocaleDateString("ja-JP", "yyyy-MM-dd")
                        .replaceAll("/", "-")}
                    </div>
                  </div>
                </div>
                <br />
                <div className="border rounded">
                  <div className="bg-primary rounded">
                    <div class="card-header bg-primary">
                      Active Reservation:
                    </div>
                    <div className="card-body bg-white">
                      {activeReservationCountByDate}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col bg-white border rounded p-3 card">
                <div className="border rounded">
                  <div class="card-header bg-primary">
                    Reservation List By Date:
                    {date
                      .toLocaleDateString("ja-JP", "yyyy-MM-dd")
                      .replaceAll("/", "-")}
                  </div>
                  <div className="card-body bg-white">
                    <ReservationTable reservations={reservationsByDate} />
                  </div>
                </div>
              </div>
              <div className="col bg-white border rounded p-3 card">
                <div className="border rounded">
                  <div class="card-header bg-primary">
                    Seat Information By Date:
                    {date
                      .toLocaleDateString("ja-JP", "yyyy-MM-dd")
                      .replaceAll("/", "-")}
                  </div>
                  <div className="card-body bg-white">
                    <SeatTable seatInfo={seatInfoByDate} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
