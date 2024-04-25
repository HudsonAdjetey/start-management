import React from "react";

const TopNav = () => {
  const username = JSON.parse(sessionStorage.getItem("userinfo"));
  return (
    <div className="topNav">
      <span className="notify">
        <i className="bi bi-bell-fill"></i>
      </span>
      <div className="profile__info">
        <span className="profile__icon">
          <i className="bi bi-person-fill"></i>
        </span>
        {/* <span className="username">{username}</span> */}
      </div>
    </div>
  );
};

export default TopNav;
