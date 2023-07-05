import React from "react";

export const Header = () => {
  return (
    <React.Fragment>
      <nav className="navbar sticky-top navbar-dark bg-primary">
        <div className="container-fluid">
          <span className="navbar-brand h1 ">
            Office Seat Reservation - Admin Dashboard
          </span>
        </div>
      </nav>
    </React.Fragment>
  );
};
