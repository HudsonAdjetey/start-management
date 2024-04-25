import React from "react";
import { Link } from "react-router-dom";
const FormAuth = ({
  onSubmit,
  usernameID,
  setUserNameID,
  pwd,
  setPwd,
  setLoginID,
  loginID,
}) => {
  return (
    <div>
      {/* FORM CONTAINER */}
      <form className="form__login_subContainer flex_col" onSubmit={onSubmit}>
        <div className="form__input">
          {/* LOGIN ID */}
          <input
            type="text"
            id="loginID"
            placeholder=""
            value={loginID}
            onChange={(e) => setLoginID(e.target.value)}
          />
          <label htmlFor="loginID">School Code</label>
        </div>
        {/* LOGIN ID */}

        <div className="form__input">
          {/* USERNAME */}
          <input
            type="text"
            id="usernameID"
            placeholder=""
            value={usernameID}
            onChange={(e) => setUserNameID(e.target.value)}
          />
          <label htmlFor="usernameID">Username</label>
        </div>
        {/* USERNAME */}

        {/* PASSWORD */}
        <div className="form__input">
          <input
            type="password"
            id="password"
            placeholder=""
            value={pwd}
            onChange={(e) => setPwd(e.target.value)}
          />
          <label htmlFor="password">Password</label>
        </div>
        {/* PASSWORD */}

        {/* SUBMIT BUTTON */}
        <button className="submit__btn">Login</button>
        {/* SUBMIT BUTTON */}
      </form>

      {/* NAVIGATE LINK */}

      <p className="b__li-q">
        <span>Are you new?</span>
        <Link to={"/register"} className="nav__reg">
          Register
        </Link>
      </p>
      {/* NAVIGATE LINK */}
    </div>
  );
};

export default FormAuth;
