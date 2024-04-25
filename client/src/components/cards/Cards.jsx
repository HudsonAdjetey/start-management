import React from "react";

const Cards = () => {
  return (
    /* CARDS */
    <div className="cards">
      {/* CARD */}
      <div className="card">
        <div className="top__sec">
          <span className="color__bann purple"></span>
          <p>Total Students</p>
          <span className="icon_hold lightPurple">
            <i className="bi bi-people-fill purple-icon"></i>
          </span>
        </div>
        <div className="bottom__sec">
          <p className="an__num">0</p>
          <span className="lil_title">Active</span>
        </div>
      </div>
      {/* CARD */}

      {/* CARD */}
      <div className="card">
        <div className="top__sec">
          <span className="color__bann green"></span>
          <p>Total Classes</p>
          <span className="icon_hold lightGreen">
            <i className="bi bi-people-fill green-icon"></i>
          </span>
        </div>
        <div className="bottom__sec">
          <p className="an__num">0</p>
          <span className="lil_title">Assigned</span>
        </div>
      </div>
      {/* CARD */}

      {/* CARD */}
      <div className="card">
        <div className="top__sec">
          <span className="color__bann blue"></span>
          <p>Billing Types</p>
          <span className="icon_hold lightBlue">
            <i className="bi bi-people-fill blue-icon"></i>
          </span>
        </div>
        <div className="bottom__sec">
          <p className="an__num">0</p>
          <span className="lil_title">Registered</span>
        </div>
      </div>
      {/* CARD */}
    </div>
    /* CARDS */
  );
};

export default Cards;
