import React from "react";
import Cards from "../cards/Cards";

const Intro = () => {
  return (
    <section className="banner__container">
      <div className="title__banner flex_row">
        <div className="main__key flex_col ">
          <h2>System Management Analytics</h2>
          <p>Discover the daily activities format</p>
        </div>
        <div className="edit__analytic">
          <button>Edit Analytics</button>
        </div>
      </div>
      {/* CARDS */}
      <Cards />
    </section>
  );
};

export default Intro;
