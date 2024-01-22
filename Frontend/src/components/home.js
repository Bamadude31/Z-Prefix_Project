import React from "react";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import { Details } from "./details";

Modal.setAppElement("#root");

export const Home = () => {
  const [allItems, setAllItems] = useState(null);
  const [itemDetails, setItemDetails] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8082/items")
      .then((res) => res.json())
      .then((allItems) => setAllItems(allItems));
  });

  const closeDetails = () => {
    setItemDetails(false);
  };

  return (
    <>
      {allItems ? (
        <div className="items-grid">
          {allItems.map((item) => {
            return (
              <div className="item-container">
                <h3 className="item-title">{item.item_name}</h3>
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
        <></>
      )}
    </>
  );
};

// export default Home;

// import { Link } from "react-router-dom";
// import { supplyContext } from "./App";
// const { loggedIn, userData } = useContext(false);

{
  /* <div className="homepage">
{loggedIn ? (
  <>
    <h1>Welcome back {userData.name}!</h1>
    <div></div>
  </>
) : (
  <>
    <h1 className="text-center text-3xl font-bold">
      Inventory Management App</h1>
    <h2 className="text-center text-3xl font-bold">Logistics control the world!</h2>
    <div className="home-links text-center text-3xl">
      <Link to="/signup"><button className="loginbutton">Get Started</button></Link>
      <Link to="/signin"><button className="loginbutton">Already have an account?</button></Link>
    </div>
  </>
)}
</div> */
}
