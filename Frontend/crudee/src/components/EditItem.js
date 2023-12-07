import React, { useState, useContext, useEffect } from 'react';
import { supplyContext } from "../App";

export const EditItem = () => {
  const { loggedIn, userData } = useContext(supplyContext);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkTitle, setLinkTitle] = useState('');
  const [header, setHeader] = useState('');
  const [subheader, setSubheader] = useState('');
  const [treeEndpoint, setTreeEndpoint] = useState('');
  const [backgroundImage, setBackgroundImage] = useState('');
  const [userTrees, setUserTrees] = useState(null);
  const [treeToEdit, setTreeToEdit] = useState('Select');
  const [treePreviewData, setTreePreviewData] = useState(null)


  useEffect(() => {
    fetchUserItems()
  }, [])

  const fetchUserItems = () => {
    if (loggedIn) {
    fetch(`http://localhost:3001/edit/trees?userId=${userData.id}`)
      .then(res => res.json())
      .then(data => setUserTrees(data)) // fetches [ [{tree1}, {tree2}], [{link1}, {link2}, {link3}] ]
    }
  }

  const fetchTreeData = (id) => {
    console.log('test')
      fetch(`http://localhost:3001/preview?username=${encodeURIComponent(userData.username)}&treeId=${encodeURIComponent(id)}`)
        .then(res => res.json())
        .then(data => setTreePreviewData(data))
  }

  const handleHeaderInput = (e) => {
    setHeader(e.target.value);
  };
  const handleSubheaderInput = (e) => {
    setSubheader(e.target.value);
  };
  const handleTreeUrlInput = (e) => {
    setTreeEndpoint(e.target.value);
  };
  const handleBackgroundImageInput = (e) => {
    setBackgroundImage(e.target.value);
  };
  const handleUrlInput = (e) => {
    setLinkUrl(e.target.value);
  };
  const handleTitleInput = (e) => {
    setLinkTitle(e.target.value);
  };

  const handleTreeSubmit = (e) => {
    e.preventDefault();
    postNewTree()
    setHeader('');
    setSubheader('');
    setTreeEndpoint('');
    setBackgroundImage('');
  };

  const handleLinkSubmit = (e) => {
    e.preventDefault();
    postNewLink(linkTitle, linkUrl)
    setLinkUrl('');
    setLinkTitle('');
  };

  const postNewLink = (title, url) => {
    const queryParams = `?title=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}&treeId=${encodeURIComponent(treeToEdit.id)}`;
    fetch(`http://localhost:3001/edit${queryParams}`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => {if (res.ok) fetchTreeData(treeToEdit.id)})
  }

  const postNewTree = () => {
    const queryParams = `?header=${encodeURIComponent(header)}&subheader=${encodeURIComponent(subheader)}&treeEndpoint=${encodeURIComponent(treeEndpoint)}&bgimage=${encodeURIComponent(backgroundImage)}&userId=${(userData.id)}&username=${(userData.username)}`;
    fetch(`http://localhost:3001/edit/createTree${queryParams}`,{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => fetchUserItems())
    .catch(error => fetchUserItems())
  }

  const deleteLink = (linkId) => {
    const queryParams = `?linkId=${linkId}`;
    fetch(`http://localhost:3001/edit${queryParams}`,{
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    .then(res => {if (res.ok) fetchTreeData(treeToEdit.id)})
  }

  const handleTreeSelect = (e) => {
    const selectedTree = JSON.parse(e.target.value);
    setTreeToEdit(selectedTree)
    fetchTreeData(selectedTree.id)
  }



  return (
    <>
    {loggedIn ?
      <div>
        <h1>Edit Your Connection Bush</h1>
        <div className='edit-page'>
          <div>
          {userTrees ?
          <div>
            <label htmlFor="dropdown">Select tree to edit</label>
            {userTrees[0].length > 0 ?
            <select id="dropdown" value={treeToEdit.header} onChange={handleTreeSelect}>
              <option value='' hidden>Select tree</option>
              {userTrees[0].map(tree => <option value={JSON.stringify(tree)}>{tree.header}</option>)}
            </select>
            : <select id="dropdown" value={JSON.stringify(treeToEdit)} onChange={handleTreeSelect}>
                <option value=''>-</option>
              </select>}
              <form onSubmit={handleLinkSubmit}>
            <label>
              Enter Title<br/>
              <input className='inputField' type='text' value={linkTitle} onChange={handleTitleInput} placeholder='Title'/>
            </label>
            <br/>
            <label>
              Enter URL<br/>
              <input className='inputField' type='url' value={linkUrl} onChange={handleUrlInput} placeholder='https://www.example.com'/>
            </label>
            <button className='editbutton' type='submit'>Add Link</button>
          </form>
          </div>
          : <></>}

          <div className='create-tree'>
            <a>Create New Tree</a>
          <form onSubmit={handleTreeSubmit}>
            <label>
              Enter Header<br/>
              <input className='inputField' type='text' value={header} onChange={handleHeaderInput} placeholder='Header'/>
            </label><br/>
            <label>
              Enter Subheader<br/>
              <input className='inputField' type='text' value={subheader} onChange={handleSubheaderInput} placeholder='Subheader'/>
            </label><br/>
            <label>
              Enter name of tree for url<br/>
              <input className='inputField' type='text' value={treeEndpoint} onChange={handleTreeUrlInput} placeholder='socials'/>
            </label><br/>
            <label>
              Enter background image link<br/>
              <input className='inputField' type='text' value={backgroundImage} onChange={handleBackgroundImageInput} placeholder='https://www.example.com/image.jpg'/>
            </label><br/>
            <button className='editbutton' type='submit'>Create Tree</button>
          </form>
          </div>
        </div>
        <div>
          {treePreviewData ? <>
            {/* <img className="bg-image" src={treeData[0][0].bgimage} alt='' /> */}
            <div className="link-tree">
              <h1 className='header'>{treePreviewData[0][0].header}</h1>
              <h4 className='subheader'>{treePreviewData[0][0].subheader}</h4>
              {treePreviewData[1].map((linkData, index) => (
                <div className="link-container">
                  <button className='remove-link-button ' onClick={() => deleteLink(linkData.id)}>🗑️</button>
                  <div key={index} className="link-item">
                    <a href={linkData.link_url} target='_blank' rel='noopener noreferrer'>
                      {linkData.link_title}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </> : <> Select or Create a Tree... </>}
        </div>
        <div>

        </div>
        </div>

      </div>
      :
      <div>
        please log in..
      </div>
      }
    </>
  );
};

export default EditItem;