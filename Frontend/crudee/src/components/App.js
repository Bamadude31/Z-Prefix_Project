import React from 'react';
import { createContext, useState, UseEffect }  from 'react';
import Home from './components/home';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Signout from './components/Signout';
import Account from './components/Account';
import Dashboard from './components/dashboard'
import EditItem from './components/EditItem'
import { Route, Routes, Link } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import firebase from 'firebase/compat/app';
import 'firebase/auth';


export const supplyContext = createContext();

function App() {
  // Manages user login status
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  return (

    <supplyContext.Provider value={{ loggedIn, setLoggedIn, userData, setUserData, }}>
        <div className='Navbar, text-center text-3xl font-bold'>
          <Link to='/' className='NavBarLink'>Home</Link>
          {!loggedIn ? <>
          <Link to='/signin' className='NavBarLink'>Signin</Link>
          <Link to='/signup' className='NavBarLink'>Signup</Link>
          </>: <>
          <Link to='/edit' className='NavBarLink'>Edit Item</Link>
          <Link to='/signout' className='NavBarLink'>Sign Out</Link></>
          }
        </div>

{/* Setting up routes for different components */}
<Routes>
<Route path='/' element={<Home />} />
<Route path='/signout' element={<Signout />} />
<Route path='/signin' element={<Signin />} />
<Route path='/signup' element={<Signup />} />
<Route path='/account' element={<Account/>}/>
<Route path='/edit' element={<EditItem />} />
<Route path='/:username/:id' element={<Dashboard />} />
</Routes>

</supplyContext.Provider>
);
}
export default App;
