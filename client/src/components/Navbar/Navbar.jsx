import React from "react";
import "./navbar.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCredentials } from "../../features/slice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(clearCredentials());
    navigate("/login");
    <Navigate to={"/login"} replace />;
  };

  return (
    <div className="navbar">
      {/* DISPLAY SCHOOL NAME */}
      <div className="school__Name-display">
        <h4>Arise Montessori International School</h4>
      </div>
      {/* DISPLAY SCHOOL NAME */}

      {/* BUTTON LINKS */}
      <ul className="nav__btn-links">
        <li>
          <Link to={"/"}>Home</Link>
          <i className="bi bi-house-fill"></i>
        </li>
        <li>
          <Link to={"/register-student"}>Register Student</Link>
          <i className="bi bi-person-vcard-fill"></i>
        </li>
        <li>
          <Link to={"/payment-history"}>Payment History</Link>
          <i className="bi bi-hourglass-split"></i>
        </li>
        <li>
          <Link to={"/settings"}>Settings</Link>
          <i className="bi bi-gear-fill"></i>
        </li>
        <li onClick={() => logout()}>
          <p>Logout</p>
          <i className="bi bi-box-arrow-left"></i>
        </li>
      </ul>
      {/* BUTTON LINKS */}
    </div>
  );
};

export default Navbar;
