import React from "react";
import Intro from "../components/intro/Intro";
import StudentTable from "../components/HomeTable/StudentTable";

const Home = () => {
  return (
    <div className="home">
      <Intro />
      <StudentTable />
    </div>
  );
};

export default Home;
