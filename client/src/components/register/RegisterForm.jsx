import React from "react";
import { Link } from "react-router-dom";

const RegisterForm = ({
  onSubmit,
  loginID,
  setLoginID,
  usernameID,
  setUsernameID,
  role,
  setRole,
  pwd,
  setPwd,
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
            onChange={(e) => setUsernameID(e.target.value)}
          />
          <label htmlFor="usernameID">Username</label>
        </div>
        {/* USERNAME */}
        <div className="form__input">
          {/* ROLE */}
          <input
            type="text"
            id="role"
            placeholder=""
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
          <label htmlFor="usernameID">Role</label>
        </div>
        {/* ROLE */}

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
        <button className="submit__btn">Register</button>
        {/* SUBMIT BUTTON */}
      </form>
      {/* FORM CONTAINER */}

      {/* NAVIGATE LINK */}

      <p className="b__li-q">
        <span>Admin Already registered?</span>
        <Link to={"/login"} className="nav__reg">
          Login
        </Link>
      </p>
      {/* NAVIGATE LINK */}
    </div>
  );
};

export default RegisterForm;
