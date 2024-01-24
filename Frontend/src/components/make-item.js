/*************** DONE NEEDS TESTING *******************/

import React, { useState, useContext } from "react";
import { supplyContext } from "./App";

export const MakeItem = () => {
  const { userData, navigate } = useContext(supplyContext);
  const [formDataMissing, setFormDataMissing] = useState(false);
  const [formData, setFormData] = useState({
    user_id: userData.id,
    item_name: "",
    description: "",
    quantity: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { user_id, item_name, description, quantity } = formData;
    // eslint-disable-next-line
    if ((user_id, item_name, description, quantity)) {
      postItem();
    } else {
      setFormDataMissing(true);
    }
  };

  const postItem = () => {
    fetch("http://localhost:8082/make-item", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formData),
    }).then((res) => navigate("/account"));
  };

  return (
    <>
      <div className="create-container">
        <h1>Create a new item</h1>
        <form className="details-head create-form" onSubmit={handleSubmit}>
          <label>Item name</label>
          <input
            type="text"
            name="item_name"
            onChange={handleInputChange}
            placeholder={formDataMissing ? "**Required" : ""}
          />
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            onChange={handleInputChange}
            placeholder={formDataMissing ? "**Required" : "Number"}
          />
          <label>Description</label>
          <input
            className="description-input"
            type="text"
            name="description"
            onChange={handleInputChange}
            placeholder={formDataMissing ? "**Required" : ""}
          />
          <button type="submit">Add Item</button>
        </form>
      </div>
    </>
  );
};

// {loggedIn ? (
//   <div>
//     <h1>Edit Your Connection Bush</h1>
//     <div className="edit-page">
//       <div>
//         {userTrees ? (
//           <div>
//             <label htmlFor="dropdown">Select tree to edit</label>
//             {userTrees[0].length > 0 ? (
//               <select
//                 id="dropdown"
//                 value={treeToEdit.header}
//                 onChange={handleTreeSelect}
//               >
//                 <option value="" hidden>
//                   Select tree
//                 </option>
//                 {userTrees[0].map((tree) => (
//                   <option value={JSON.stringify(tree)}>
//                     {tree.header}
//                   </option>
//                 ))}
//               </select>
//             ) : (
//               <select
//                 id="dropdown"
//                 value={JSON.stringify(treeToEdit)}
//                 onChange={handleTreeSelect}
//               >
//                 <option value="">-</option>
//               </select>
//             )}
//             <form onSubmit={handleLinkSubmit}>
//               <label>
//                 Enter Title
//                 <br />
//                 <input
//                   className="inputField"
//                   type="text"
//                   value={linkTitle}
//                   onChange={handleTitleInput}
//                   placeholder="Title"
//                 />
//               </label>
//               <br />
//               <label>
//                 Enter URL
//                 <br />
//                 <input
//                   className="inputField"
//                   type="url"
//                   value={linkUrl}
//                   onChange={handleUrlInput}
//                   placeholder="https://www.example.com"
//                 />
//               </label>
//               <button className="editbutton" type="submit">
//                 Add Link
//               </button>
//             </form>
//           </div>
//         ) : (
//           <></>
//         )}

//         <div className="create-tree">
//           <a>Create New Tree</a>
//           <form onSubmit={handleTreeSubmit}>
//             <label>
//               Enter Header
//               <br />
//               <input
//                 className="inputField"
//                 type="text"
//                 value={header}
//                 onChange={handleHeaderInput}
//                 placeholder="Header"
//               />
//             </label>
//             <br />
//             <label>
//               Enter Subheader
//               <br />
//               <input
//                 className="inputField"
//                 type="text"
//                 value={subheader}
//                 onChange={handleSubheaderInput}
//                 placeholder="Subheader"
//               />
//             </label>
//             <br />
//             <label>
//               Enter name of tree for url
//               <br />
//               <input
//                 className="inputField"
//                 type="text"
//                 value={treeEndpoint}
//                 onChange={handleTreeUrlInput}
//                 placeholder="socials"
//               />
//             </label>
//             <br />
//             <label>
//               Enter background image link
//               <br />
//               <input
//                 className="inputField"
//                 type="text"
//                 value={backgroundImage}
//                 onChange={handleBackgroundImageInput}
//                 placeholder="https://www.example.com/image.jpg"
//               />
//             </label>
//             <br />
//             <button className="editbutton" type="submit">
//               Create Tree
//             </button>
//           </form>
//         </div>
//       </div>
//       <div>
//         {treePreviewData ? (
//           <>
//             {/* <img className="bg-image" src={treeData[0][0].bgimage} alt='' /> */}
//             <div className="link-tree">
//               <h1 className="header">{treePreviewData[0][0].header}</h1>
//               <h4 className="subheader">
//                 {treePreviewData[0][0].subheader}
//               </h4>
//               {treePreviewData[1].map((linkData, index) => (
//                 <div className="link-container">
//                   <button
//                     className="remove-link-button "
//                     onClick={() => deleteLink(linkData.id)}
//                   >
//                     🗑️
//                   </button>
//                   <div key={index} className="link-item">
//                     <a
//                       href={linkData.link_url}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                     >
//                       {linkData.link_title}
//                     </a>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </>
//         ) : (
//           <> Select or Create a Tree... </>
//         )}
//       </div>
//       <div></div>
//     </div>
//   </div>
// ) : (
//   <div>please log in..</div>
// )}
