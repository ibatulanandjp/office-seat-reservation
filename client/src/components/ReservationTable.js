import React from "react";

export const ReservationTable = ({ reservations }) => {
  const ReservationRow = (reservation) => {
    return (
      <tr key={reservation.user_id}>
        <td>{reservation.user_id}</td>
        <td>{reservation.first_name}</td>
        <td>{reservation.last_name}</td>
        <td>{new Date(reservation.date_reservation).toLocaleDateString('ja-JP', 'yyyy-mm-dd')}</td>
        <td>{reservation.cancelled}</td>
      </tr>
    );
  };

  const reservationTable = reservations.map((reservation) =>
    ReservationRow(reservation)
  );

  return (
    <div className="container">
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>User Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Reservation Date</th>
            <th>Cancellation Status</th>
          </tr>
        </thead>
        <tbody>{reservationTable}</tbody>
      </table>
    </div>
  );
};
