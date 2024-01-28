//React Pieces
import React from "react";
import { createContext, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

//Pages for the Frontend
import { Signup } from "./signup";
import { Home } from "./home";
import { Signin } from "./signin";
import { Signout } from "./signout";
import { Profile } from "./profile";
import { MakeItem } from "./make-item";

export const supplyContext = createContext();

//App functionality
function App() {
  // Manages user login status
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  return (
    <supplyContext.Provider
      value={{ setLoggedIn, userData, setUserData, navigate }}
    >
      <nav className="Navbar">
        <Link to="/" className="NavBarLink">
          Home
        </Link>
        {!loggedIn ? (
          <>
            <Link to="/signin" className="NavBarLink">
              Signin
            </Link>
            <Link to="/signup" className="NavBarLink">
              Signup
            </Link>
          </>
        ) : (
          <>
            <Link to="/make" className="NavBarLink">
              Make Item
            </Link>
            <Link to="/profile">My Inventory</Link>
            <Link to="/signout" className="NavBarLink">
              Sign Out
            </Link>
          </>
        )}
      </nav>

      {/* Setting up routes for different components */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/make" element={<MakeItem />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signout" element={<Signout />} />
        <Route path="/signin" element={<Signin />} />
      </Routes>
    </supplyContext.Provider>
  );
}
export default App;
