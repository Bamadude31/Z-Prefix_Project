/*************** DONE NEEDS TESTING *******************/

import { supplyContext } from "./App";
import { useState, useEffect, useContext } from "react";
import Modal from "react-modal";
import { Details } from "./details";

Modal.setAppElement("#root");

export const Account = () => {
  const { userData } = useContext(supplyContext);
  const [userItems, setUserItems] = useState(null);
  const [itemDetails, setItemDetails] = useState(null);

  const closeDetails = () => {
    setItemDetails(null);
  };

  useEffect(() => {
    getUserItems();
  });

  const getUserItems = () => {
    fetch(`http://localhost:8082/user/items?id=${userData.id}`)
      .then((res) => res.json())
      .then((userItemsData) => setUserItems(userItemsData));
  };

  return (
    <>
      {userItems ? (
        <>
          {userItems.length > 0 ? (
            <div className="items-grid">
              {userItems.map((item) => {
                return (
                  <div className="item-container">
                    <span className="item-head-container">
                      <h3 className="item-title">{item.item_name}</h3>
                      <p className="item-quantity">{item.quantity} In stock</p>
                    </span>
                    {item.description.length > 100 ? (
                      <p className="item-description">
                        {item.description.slice(0, 100)}...
                      </p>
                    ) : (
                      <p className="item-description">{item.description}</p>
                    )}
                    <button onClick={() => setItemDetails(item)}>
                      View Details
                    </button>
                  </div>
                );
              })}
              <Modal isOpen={itemDetails}>
                <Details item={itemDetails} setItem={closeDetails} />
              </Modal>
            </div>
          ) : (
            <h2>No items in inventory..</h2>
          )}
        </>
      ) : (
        <></>
      )}
    </>
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
