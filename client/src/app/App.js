import React, { useState, useEffect } from "react";
import "./App.css";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

// Services
// import { getReservationList } from "../services/ReservationListService";
import { getReservationListByDate } from "../services/ReservationListByDateService";
import { getActiveReservationCountByDate } from "../services/ActiveReservationCountByDateService";
// import { getSeatInfo } from "../services/SeatInfoService";
import { getSeatInfoByDate } from "../services/SeatInfoByDateService";

import { getWeekDays, getWeekRange } from "../services/WeekDaysService";

// Components
import { Header } from "../components/Header/Header";
import { ReservationTable } from "../components/ReservationTable/ReservationTable";
import { ActiveReservationChart } from "../components/ActiveReservationChart/ActiveReservationChart";
import { WeekDaysTable } from "../components/WeekDaysTable/WeekDaysTable";
// import { SeatTable } from "../components/SeatTable/SeatTable";

function App() {
  // const [reservations, setReservations] = useState([]);
  const [reservationsByDate, setReservationsByDate] = useState([]);
  const [activeReservationCountByDate, setActiveReservationCountByDate] =
    useState(0);

  // const [seatInfo, setSeatInfo] = useState([]);
  const [seatInfoByDate, setSeatInfoByDate] = useState(0);

  const [date, setDate] = useState(new Date());
  const [chartData, setChartData] = useState();

  const [weekDates, setWeekDates] = useState([]);

  // ================================
  // const getAllReservation = async () => {
  //   const reservationList = await getReservationList();
  //   console.log(reservationList);
  //   setReservations(reservationList);
  // };

  const getReservationByDate = async (date) => {
    const reservationListByDate = await getReservationListByDate(date);
    // console.log(reservationListByDate);
    setReservationsByDate(reservationListByDate);
  };

  const getActiveReservationCount = async (date) => {
    const activeReservationCount = await getActiveReservationCountByDate(date);
    // console.log("Active reservation: " + activeReservationCount);
    setActiveReservationCountByDate(activeReservationCount);
  };

  const getSeatByDate = async (date) => {
    const seatByDate = await getSeatInfoByDate(date);
    // console.log("Total Seat: " + seatByDate);
    setSeatInfoByDate(seatByDate);
  };

  const getSelectedDate = async (date) => {
    // console.log("Selected Date: " + date);
    setDate(date);
  };

  const showChartData = async (occupiedSeat, totalSeat) => {
    // console.log("Active Reservation count: " + occupiedSeat);
    // console.log("Total Seat count: " + totalSeat);
    setChartData([occupiedSeat, totalSeat - occupiedSeat]);
  };

  const getWeekDates = (date) => {
    // console.log("date for week: " + date);
    const weekDates = getWeekDays(getWeekRange(date).from);
    // console.log("week dates: " + weekDates);
    setWeekDates(weekDates);
  };

  // ================================
  // useEffect(() => {
  //   // getAllReservation();
  //   // getSeat();
  // }, []);

  useEffect(() => {
    getReservationByDate(
      date.toLocaleDateString("ja-JP", "yyyy-MM-dd").replaceAll("/", "-")
    );
    getSeatByDate(
      date.toLocaleDateString("ja-JP", "yyyy-MM-dd").replaceAll("/", "-")
    );
    getActiveReservationCount(
      date.toLocaleDateString("ja-JP", "yyyy-MM-dd").replaceAll("/", "-")
    );
    getWeekDates(date);
  }, [date]);

  useEffect(() => {
    showChartData(activeReservationCountByDate, seatInfoByDate);
  }, [activeReservationCountByDate, seatInfoByDate]);

  // ==============================
  return (
    <div>
      <Header />
      <br />
      <div>
        {!reservationsByDate ? (
          <h2>Loading...</h2>
        ) : (
          <div className="container-fluid">
            <div className="row g-0">
              <div className="col bg-white border rounded p-4 card">
                <div className="card-header bg-primary text-white fw-bold">
                  Seat Availability List
                </div>
                <div className="card-body">
                  <WeekDaysTable
                    weekDays={weekDates}
                  />
                </div>
                <br />
              </div>
              <div className="col bg-white border rounded card">
                <div className="card-body">
                  <div className="row g-0">
                    <div className="col bg-white border rounded p-3 card">
                      <div className="card-header bg-primary text-white fw-bold">
                        Select Date
                      </div>
                      <DayPicker
                        onDayClick={(date) => {
                          getSelectedDate(date);
                        }}
                        selectedDays={date}
                        // disabledDays={{ daysOfWeek: [0, 6] }}
                      />
                    </div>
                    <div className="col bg-white border rounded p-3 card">
                      <div className="card-header bg-primary text-white fw-bold">
                        Seat Availability
                      </div>

                      <div className="card-body bg-white">
                        <ActiveReservationChart seatData={chartData} />
                        <div className="row p-3">
                          <div className="col-7 text-center">
                            Active Reservation / Total Seat :
                          </div>
                          <div className="col-5 text-start fw-bold">
                            [ {activeReservationCountByDate} / {seatInfoByDate}{" "}
                            ]
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row g-0">
                    <div className="col bg-white border rounded p-3 card">
                      <div className="border rounded">
                        <div className="card-header bg-primary text-white fw-bold">
                          <div className="row">
                            <div className="col">Reservation List By Date </div>
                            <div className="col">
                              {date
                                .toLocaleDateString("ja-JP", "yyyy-MM-dd")
                                .replaceAll("/", "-")}
                            </div>
                          </div>
                        </div>
                        <div className="card-body bg-white">
                          <ReservationTable reservations={reservationsByDate} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
