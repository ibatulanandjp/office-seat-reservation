import React from "react";

export const SeatTable = ({ seatInfo }) => {
  const SeatRow = (seat) => {
    return (
      <tr key={seat.date_reservation}>
        <td>
          {new Date(seat.date_reservation).toLocaleDateString(
            "ja-JP",
            "yyyy-mm-dd"
          )}
        </td>
        <td>{seat.total_seat}</td>
      </tr>
    );
  };

  const seatTable = seatInfo.map((seat) => SeatRow(seat));

  return (
    <div className="container">
      <table className="table table-sm bg-white table-borderless table-hover table-striped table-responsive">
        <thead className="table-dark">
          <tr>
            <th>Date</th>
            <th>Total Seat</th>
          </tr>
        </thead>
        <tbody>{seatTable}</tbody>
      </table>
    </div>
  );
};
