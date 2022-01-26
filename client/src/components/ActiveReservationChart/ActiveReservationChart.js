import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const ActiveReservationChart = ({ seatData }) => {
  // export const ActiveReservationChart = () => {
  const data = {
    labels: ["Active Reservation", "Available Seats"],
    datasets: [
      {
        label: "Seat Availability",
        data: seatData,
        // backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(75, 192, 192, 0.2)"],
        // borderColor: ["rgba(54, 162, 235, 1)", "rgba(75, 192, 192, 1)"],
        backgroundColor: ["#1976D2", "#E3F2FD"],
        hoverBackgroundColor: ["#0D47A1", "#BBDEFB"],
        borderWidth: 1,
      },
    ],
    hoverOffset: 4,
  };
  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};
