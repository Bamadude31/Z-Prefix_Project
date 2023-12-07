import { useContext } from "react";
import { Link } from "react-router-dom";
import { supplyContext } from "../App";
import firebase from 'firebase/compat/app';

export const Home = () => {
  const { loggedIn, userData } = useContext(supplyContext);

  const handleSignIn = (email, password) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Sign-in successful
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        // An error occurred during sign-in
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <div className="homepage">
      {loggedIn ? (
        <>
          <h1>Welcome back {userData.name}!</h1>
          <div></div>
        </>
      ) : (
        <>
          <h1 className="text-center text-3xl font-bold">Inventory Management App</h1>
          <h2 className="text-center text-3xl font-bold">Logistics control the world!</h2>
          <div className="home-links text-center text-3xl">
            <Link to="/signup">
              <button className="loginbutton">Get Started</button>
            </Link>
            <Link to="/signin">
            <button className="loginbutton" onClick={handleSignIn}>
              Already have an account?
            </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;