import { useContext } from "react";
import { Link } from "react-router-dom";
import { supplyContext } from "../App";

export const Home = () => {
  const { loggedIn, userData } = useContext(supplyContext);

  return (
    loggedIn ? (
      <div className="homepage">
        <h1>Welcome back {userData.name}!</h1>
        <div></div>
      </div>
    ) : (
      <div className="homepage">
        <h1 className='text-center text-3xl font-bold'>Inventory Management App</h1>
        <h2 className='text-center text-3xl font-bold'>Logistics control the world!</h2>
        <div className="home-links, text-center text-3xl">
          <Link to='/signup'><button className='loginbutton'>Get Started</button></Link>
          <Link to='/signin'><button className='loginbutton'>Already have an account?</button></Link>
        </div>
      </div>

    )
  );
};

export default Home;