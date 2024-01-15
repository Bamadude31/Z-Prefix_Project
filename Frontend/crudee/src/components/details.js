import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import '../CSS/List.css'

export const UserItems = () => {
  const [userItems, setUserItems] = useState([])
  const [pageReload, setPageReload] = useState(null)
  const [item, setItem] = useState('')
  const [quantity, setQuantity] = useState(0)
  const [description, setDescription] = useState('')
  const [name, setName] = useState('')
  const user = auth.currentUser

  useEffect(() => {
    fetch(`http://localhost:8082/items/user/${user.uid}`)
      .then(res => res.json())
      .then(data => setUserItems(data))
      .then(() => {
        fetch(`http://localhost:8082/users/${user.uid}`)
          .then((res) => res.json())
          .then((data) => {
            setName(data[0].firstName.charAt(0).toUpperCase() + data[0].firstName.slice(1))
          })
      })
  }, [user.uid, pageReload])

  const handleSubmit = () => {
    let newItem = {
      "item": item,
      "description": description,
      "quantity": quantity,
      "uid": user.uid
    }
    fetch("http://localhost:8082/items",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          "item": item,
          "description": description,
          "quantity": quantity,
          "uid": user.uid
        }),
      })
      .then(() => setUserItems((prev) => [...prev, newItem]))
      .then(() => {
        setItem('');
        setQuantity(0);
        setDescription('');
        setPageReload(newItem)
      })
  }

  const deleteItem = (itemID) => {
    fetch(`http://localhost:8082/items/${itemID}`, {
      method: 'DELETE'
    })
      .then(() => {
        setPageReload(itemID)
      })
  }

  return (
    <div className="container-list">
      <div className="section-list">
        <div className="post">
          <div className="title">Item: </div> <input type="text" maxLength="250" placeholder="new item..." value={item} onChange={(e) => { setItem(e.target.value) }}></input>
        </div>
        <div className="post">
          <div className="title">Description: </div> <input type="text" maxLength="1000" placeholder="description..." value={description} onChange={(e) => setDescription(e.target.value)}></input>
        </div>
        <div className="post">
          <div className="title">Quantity: </div><input type="number" min="0" placeholder="quantity..." value={quantity} onChange={(e) => setQuantity(e.target.value)}></input>
        </div>
        <button type="submit" onClick={handleSubmit}>Add Item</button>
      </div>
      <div className="item-list">
        <div className="nameTitle"><h3>{`${name}'s Item`}</h3></div>
        <ul>
          {userItems.map((item, index) => {
            let str = item.description;
            if (str.length > 100) str = str.substring(0, 100) + `...`;
            return (
              <li key={index}>
                <Link to={`/item/details/edit/${item.item_id}`} state={{ item }}>
                  <span className="title">Item: </span>{item.item} <br></br>
                  <span className="title">Description: </span> {str} <br></br>
                  <span className="title">Quantity: </span> {item.quantity}
                </Link>
                <br></br>
                <button className="listButton" type="button" onClick={() => deleteItem(item.item_id)}>delete</button>
              </li>
            )
          })}
        </ul>
      </div>
      <Link to={`/public`}><button className="view">View All</button></Link>
    </div>
  )
}
