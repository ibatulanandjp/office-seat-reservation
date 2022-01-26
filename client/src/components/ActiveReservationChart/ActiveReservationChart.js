import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const ActiveReservationChart = ({ seatData }) => {
  const data = {
    labels: ["Active Reservation", "Available Seats"],
    datasets: [
      {
        label: "Seat Availability",
        data: seatData,
        backgroundColor: ["#1976D2", "#E3F2FD"],
        hoverBackgroundColor: ["#0D47A1", "#BBDEFB"],
        hoverOffset: 4,
      },
    ],
  };
  return (
    <div className="p-3">
      <Doughnut
        data={data}
        height={250}
        options={{ maintainAspectRatio: false, responsive: true }}
      />
    </div>
  );
};
