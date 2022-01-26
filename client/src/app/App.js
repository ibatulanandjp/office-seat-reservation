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

// Components
import { Header } from "../components/Header/Header";
import { ReservationTable } from "../components/ReservationTable/ReservationTable";
import { ActiveReservationChart } from "../components/ActiveReservationChart/ActiveReservationChart";
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

  // ================================
  // useEffect(() => {
  //   // getAllReservation();
  //   // getSeat();
  //   if (!date) getSelectedDate(new Date());
  // }, [date]);

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
              {/* <div className="col bg-white border rounded p-3 card">
                <div className="border rounded">
                  <div className="card-header bg-primary">Select Date</div>
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
                    <div className="card-header bg-primary">Date Selected:</div>
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
                    <div className="card-header bg-primary">
                      Active Reservation:
                    </div>
                    <div className="card-body bg-white">
                      {activeReservationCountByDate}
                    </div>
                  </div>
                </div>
              </div> */}
              {/* <div className="col bg-white border rounded p-3 card">
                <div className="border rounded">
                  <div className="card-header bg-primary">
                    Reservation List By Date:
                    {date
                      .toLocaleDateString("ja-JP", "yyyy-MM-dd")
                      .replaceAll("/", "-")}
                  </div>
                  <div className="card-body bg-white">
                    <ReservationTable reservations={reservationsByDate} />
                  </div>
                </div>
              </div> */}
              {/* <div className="col bg-white border rounded p-3 card">
                <div className="border rounded">
                  <div className="card-header bg-primary">
                    Seat Information By Date:
                    {date
                      .toLocaleDateString("ja-JP", "yyyy-MM-dd")
                      .replaceAll("/", "-")}
                  </div>
                  <div className="card-body bg-white">
                    <SeatTable seatInfo={seatInfoByDate} />
                  </div>
                </div>
              </div> */}
            </div>
            <div className="row g-0">
              <div className="col bg-white border rounded p-3 card">
                {/* <div className="border rounded"> */}
                {/* <div className="card-header bg-primary">Select Date</div> */}
                <div className="card-body">
                  <div className="row g-0">
                    {/* <div className="col bg-white border rounded p-3 card">
                        <DatePicker
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          selected={date}
                          onSelect={(date) => {
                            getSelectedDate(date);
                          }}
                          dateFormat={"yyyy-MM-dd"}
                        />
                      </div> */}
                    <div className="col bg-white border rounded p-3 card">
                      <div className="card-header bg-primary">
                        <h5>Select Date</h5>
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
                      <div className="card-header bg-primary">
                        <h5>Seat Availability:</h5>
                      </div>
                      <div className="card-body bg-white">
                        Active Reservation / Total Seat :{" "}
                        <h5>
                          [ {activeReservationCountByDate} / {seatInfoByDate} ]
                        </h5>
                      </div>
                      <ActiveReservationChart seatData={chartData} />
                      {/* <ActiveReservationChart /> */}
                    </div>
                  </div>

                  {/* <DayPicker
                      onDayClick={(date) => {
                        getSelectedDate(date);
                      }}
                      selectedDays={date}
                      // disabledDays={{ daysOfWeek: [0, 6] }}
                    /> */}
                </div>
                {/* </div> */}
                <br />

                {/* <div className="border rounded">
                  <div className="bg-primary rounded">
                    <div className="card-header bg-primary">Date Selected:</div>
                    <div className="card-body bg-white">
                      {date
                        .toLocaleDateString("ja-JP", "yyyy-MM-dd")
                        .replaceAll("/", "-")}
                    </div>
                  </div>
                </div>
                <br /> */}

                {/* <div className="border rounded">
                  <div className="bg-primary rounded">
                    <div className="card-header bg-primary">
                      Active Reservation:
                    </div>
                    <div className="card-body bg-white">
                      {activeReservationCountByDate} / {seatInfoByDate}
                    </div>
                  </div>
                </div> */}
              </div>
              <div className="col bg-white border rounded p-3 card">
                <div className="border rounded">
                  <div className="card-header bg-primary">
                    <h5>
                      Reservation List By Date:
                      {date
                        .toLocaleDateString("ja-JP", "yyyy-MM-dd")
                        .replaceAll("/", "-")}
                    </h5>
                  </div>
                  <div className="card-body bg-white">
                    <ReservationTable reservations={reservationsByDate} />
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
