import React from "react";

export const WeekDaysTable = ({ weekDays }) => {
  const dayRow = (date) => {
    return (
      <tr key={date}>
        <td>
          {new Date(date)
            .toLocaleDateString("ja-JP", "yyyy/mm/dd")
            .replaceAll("/", "-")}
        </td>
        <td>00:00:00</td>
        <td>23:59:59</td>
        <td>
          {/* {getSeatByDate(
            date.toLocaleDateString("ja-JP", "yyyy-MM-dd").replaceAll("/", "-")
          )} */}
          {/* {getSeatInfoByDate(
            date.toLocaleDateString("ja-JP", "yyyy-MM-dd").replaceAll("/", "-")
          )} */}
          <input
            type="text"
            className="form-control form-control-sm"
            placeholder="0"
          ></input>
        </td>
        <td>
          <button type="button" className="btn btn-light">
            Update
          </button>
        </td>
      </tr>
    );
  };

  const weekTable = weekDays.map((date) => dayRow(date));

  return (
    <div className="container p-3">
      <table className="table table-sm bg-white table-borderless table-responsive p-5">
        <thead className="table-primary p-3">
          <tr>
            <th>Date</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Count</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{weekTable}</tbody>
      </table>
    </div>
  );
};
