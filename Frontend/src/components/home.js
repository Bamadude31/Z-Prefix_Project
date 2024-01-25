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
