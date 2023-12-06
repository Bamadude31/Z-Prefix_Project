import { useState, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { supplyContext } from "../App";
import { UserAuth } from '../context/AuthContext';


const Signin = () => {
  const { signIn } = UserAuth();
  const { setLoggedIn, setUserData } = useContext(supplyContext);
  const [isDataFilled, setIsDataFilled] = useState(true);
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (loginData.username && loginData.password) {
  //     setIsDataFilled(true);
  //     try {
  //       await signIn(loginData.username, loginData.password); // Assuming signIn function takes username and password as parameters
  //       navigate('/account');
  //     } catch (e) {
  //       console.log(e.message);
  //     }
  //   } else {
  //     setIsDataFilled(false);
  //   }
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loginData.username && loginData.password) getUserData();
    else setIsDataFilled(false);
  }

  const getUserData = async () => {
    const queryParams = `?username=${encodeURIComponent(loginData.username)}&password=${encodeURIComponent(loginData.password)}`;
    fetch(`http://localhost:3001/login${queryParams}`)
    .then(res => res.json())
    .then(userdata => {
      if (userdata.user) {
        setLoggedIn(true)
        setUserData(userdata.user[0])
        navigate('/account');
      } else {
        console.log(userdata)
      }
    })
  }

  return (
    <div className='max-w-[700px] mx-auto my-16 p-4'>
      <div>
        <h1 className='text-2xl font-bold py-2'>Sign in to your account</h1>
        <p className='py-2'>
          Don't have an account yet?{' '}
          <Link to='/signup'><button className='loginbutton'>Sign up!</button></Link>
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium'>Email Address</label>
          <input className="label-input" type="text" name="email" value={loginData.email} onChange={handleInputChange}
          placeholder={isDataFilled ? '' : "*missing email" }/>
        </div>

        <div className='flex flex-col py-2'>
          <label className='py-2 font-medium'>Password</label>
          <a className="label-text">Password</a>
          <input className="label-input" type="password" name="password" value={loginData.password} onChange={handleInputChange}
          placeholder={isDataFilled ? '' : "*missing password" }/>


        </div>
        <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signin;