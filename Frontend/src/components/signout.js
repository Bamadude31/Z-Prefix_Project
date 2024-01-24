import React from "react";
import { useContext } from "react";
import { supplyContext } from "./App";

export const Signout = () => {
  const { setUserData, setLoggedIn, navigate } = useContext(supplyContext);

  const handleSignout = (e) => {
    setUserData({});
    setLoggedIn(false);
    navigate("/signin");
  };

  return (
    <>
      <div className="login-form">
        <h2>Are you sure you want to sign out?</h2>
        <button onClick={handleSignout}>Log Out</button>
      </div>
    </>
  );
};

// import { Link, useNavigate } from "react-router-dom";
// export default Signout;
