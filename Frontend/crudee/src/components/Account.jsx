import React, { useState, useEffect, useContext } from 'react';
import Signout from './Signout';
import { useNavigate, useParams } from 'react-router-dom';
import { UserAuth, SupplyContextProvider } from '../context/AuthContext';
import { Route, Routes } from 'react-router-dom';
import { supplyContext } from "../App";

export const Account = () => {
  const { username, supply } = useParams();
  const [supplyData, setSupplyData] = useState(null);
  const { setLoggedIn, setUserData } = useContext(supplyContext);
  const navigate = useNavigate();

  const handleSignout = (e) => {
    setLoggedIn(false)
    setUserData(false)
    navigate('/login')
  }
  useEffect(() => {
    const fetchSupplyData = async () => {
      const queryParams = `http://localhost:3001/view?username=${encodeURIComponent(
        username
      )}&item=${encodeURIComponent(supply)}`;
      fetch(queryParams)
        .then((res) => res.json())
        .then((data) => setSupplyData(data));
    };
    fetchSupplyData();
  }, []);

  return (
    <div className='max-w-[600px] mx-auto my-16 p-4'>
      <h1 className='text-2xl font-bold py-4'>Account</h1>
      <SupplyContextProvider>
        <Routes>
          <Route path='/' element={<Signout />} />
        </Routes>
      </SupplyContextProvider>
      <button onClick={handleSignout} className='border px-6 py-2 my-4'>
        Logout
      </button>

      {supplyData ? (
        <>
          {/* <img className="bg-image" src={treeData[0][0].bgimage} alt='' /> */}
          <div className='supply-items'>
            <h1 className='header'>{supplyData[0][0].header}</h1>
            <h4 className='subheader'>{supplyData[0][0].subheader}</h4>
            {supplyData[1].map((linkData, index) => (
              <div key={index} className='link-item'>
                {linkData.logoUrl ? (
                  <img src={linkData.logoUrl} alt='Logo' />
                ) : (
                  <div className='no-logo'></div>
                )}
                <a href={linkData.link_url} target='_blank' rel='noopener noreferrer'>
                  {linkData.link_title}
                </a>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          {username} {supply}
        </>
      )}
    </div>
  );
};

export default Account;

//     <div className='max-w-[600px] mx-auto my-16 p-4'>
//   <h1 className='text-2xl font-bold py-4'>Account</h1>
//   <AuthContextProvider>
//     <Routes>
//       <Route path='/' element={<Signout />} />
//     </Routes>
//   </AuthContextProvider>
//   <button onClick={handleLogout} className='border px-6 py-2 my-4'>
//     Logout
//   </button>

// {supplyData ? (

//     {/* <img className="bg-image" src={treeData[0][0].bgimage} alt='' /> */}
//     <div className="supply-items"/>
//       <h1 className='header'>{supplyData[0][0].header}</h1>
//       <h4 className='subheader'>{supplyData[0][0].subheader}</h4>
//       {supplyData[1].map((linkData, index) => (
//         <div key={index} className="link-item">
//           {linkData.logoUrl ? (
//             <img src={linkData.logoUrl} alt="Logo" />
//           ) : (
//             <div className="no-logo"></div>
//           )}
//           <a href={linkData.link_url} target='_blank' rel='noopener noreferrer'>
//             {linkData.link_title}
//           </a>
//         </div>
//       ))}
//     </div>
//     </div>
// ) : (
//   <> : </> <> {username} {supply}