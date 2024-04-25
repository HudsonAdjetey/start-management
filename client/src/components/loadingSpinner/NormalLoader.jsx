import React from "react";
import { FallingLines } from "react-loader-spinner";
import "./loader.css";
const NormalLoader = () => {
  return (
    <div>
      <p className="preloader ">
        <FallingLines
          color="#000"
          width="120"
          visible={true}
          ariaLabel="falling-lines-loading"
        />
      </p>
    </div>
  );
};

export default NormalLoader;
