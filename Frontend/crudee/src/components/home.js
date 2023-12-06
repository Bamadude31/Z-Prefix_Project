import { useContext } from "react";
import { Link } from "react-router-dom";
import { bushContext } from "../App";

export const Home = () => {
  const { loggedIn, userData } = useContext(bushContext);

  return (
    loggedIn ? (
      <div className="homepage">
        <h1>Welcome back {userData.name}!</h1>
        <div></div>
      </div>
    ) : (
      <div className="homepage">
        <h1>Inventory Management App</h1>
        <h2>Logistics control the world!</h2>
        <div className="home-links">
          <Link to='/signup'><button className='loginbutton'>Get Started</button></Link>
          <Link to='/signin'><button className='loginbutton'>Already have an account?</button></Link>
        </div>
      </div>

    )
  );
};
