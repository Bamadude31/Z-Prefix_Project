import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supplyContext } from "../App";
import { UserAuth } from '../context/AuthContext';

export const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = UserAuth();
  const { setLoggedIn, setUserData } = useContext(supplyContext);
  const [registrationData, setRegistrationData] = useState({
    first_name: '',
    last_name: '',
    username: '',
    email: '',
    password: ''
  });

  const [isDataFilled, setIsDataFilled] = useState(true);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRegistrationData({
      ...registrationData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (registrationData.first_name && registrationData.last_name && registrationData.username && registrationData.email && registrationData.password) {
      try {
        await signIn(email, password);
        navigate('/account');
      } catch (error) {
        console.error(error);
      }
    } else {
      setIsDataFilled(false);
    }
  };

  const postUserData = async () => {
    const queryParams = `?first_name=${encodeURIComponent(registrationData.first_name)}&last_name=${encodeURIComponent(registrationData.last_name)}&username=${encodeURIComponent(registrationData.username)}&email=${encodeURIComponent(registrationData.email)}&password=${encodeURIComponent(registrationData.password)}`;
    fetch(`http://localhost:3001/register${queryParams}`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => res.json())
    .then(userdata => {
      if (userdata[0]) {
        setLoggedIn(true)
        setUserData(userdata[0])
        navigate('/');
      } else {
        console.log('invalid username/password')
      }
    })
  }

  return (
    <div className='max-w-[700px] mx-auto my-16 p-4'>
  <div>
    <h1 className='text-2xl font-bold py-2'>Sign in to your account</h1>
    <p className='py-2'>
      Don't have an account yet?{' '}
      <Link to='/signup' className='underline'>
        Sign up.
      </Link>
    </p>
  </div>
  <form onSubmit={handleSubmit} className="registration-form">
    <div className='flex flex-col py-2'>
      <label className='py-2 font-medium'>Email Address</label>
      <input onChange={(e) => setEmail(e.target.value)} className='border p-3' type='email' />
    </div>
    <div className='flex flex-col py-2'>
      <label className='py-2 font-medium'>Password</label>
      <input onChange={(e) => setPassword(e.target.value)} className='border p-3' type='password' />
    </div>
    <button className='border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white'>
      Sign In
    </button>
  </form>

  <div className='reg-form'>
    <form onSubmit={postUserData} className="registration-form">
      <label>
        <p className="label-text py-2 font-medium">First Name</p>
        <input className="label-input" type="text" name="first_name" value={registrationData.first_name} onChange={handleInputChange} placeholder={isDataFilled ? '' : "*missing name"} />
      </label>
      <label>
        <p className="label-text py-2 font-medium">Last Name</p>
        <input className="label-input" type="text" name="last_name" value={registrationData.last_name} onChange={handleInputChange} placeholder={isDataFilled ? '' : "*missing name"} />
      </label>
      <label>
        <p className="label-text py-2 font-medium">Username</p>
        <input className="label-input" type="text" name="username" value={registrationData.username} onChange={handleInputChange} placeholder={isDataFilled ? '' : "*missing username"} />
      </label>
      <label>
        <p className="label-text py-2 font-medium">Email</p>
        <input className="label-input" type="text" name="email" value={registrationData.email} onChange={handleInputChange} placeholder={isDataFilled ? '' : "*missing email"} />
      </label>
      <label>
        <p className="label-text py-2 font-medium">Password</p>
        <input className="label-input" type="password" name="password" value={registrationData.password} onChange={handleInputChange} placeholder={isDataFilled ? '' : "*missing password"} />
      </label>
      <div className="label-input-container">
        <button type="submit" className='regbutton'>Register</button>
      </div>
    </form>
  </div>
  <div className="registration-button-container">
    <div className="registration-button">
      <h4>Already have an account?</h4>
    </div>
    <div className="registration-button">
      <Link to='/login'><button className='regbutton'>Go To Login Page</button></Link>
    </div>
  </div>
</div>
  );
}

export default Signup;