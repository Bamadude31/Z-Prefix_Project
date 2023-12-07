import { useState, useContext } from "react";
import { Link, useNavigate} from "react-router-dom";
import { supplyContext } from "../App";


export const Signout = () => {
  const { setLoggedIn, setUserData } = useContext(supplyContext);
  const navigate = useNavigate();



  const handleSignout = (e) => {
    setLoggedIn(false)
    setUserData(false)
    navigate('/login')
  }


  return (
    <>
      {handleSignout()}
    </>
  )
}

export default Signout;