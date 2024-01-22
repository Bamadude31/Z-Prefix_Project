import { supplyContext } from "./App";
import React, { useState, useContext } from "react";

export const Signin = () => {
  const { setUserData, setLoggedIn, navigate } = useContext(supplyContext);
  const [formDataMissing, setFormDataMissing] = useState(false);
  const [formDataWrong, setFormDataWrong] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleSignIn = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, password } = formData;
    // eslint-disable-next-line
    if ((username, password)) {
      signIn();
    } else {
      setFormDataMissing(true);
    }
  };

  const signIn = () => {
    fetch("http://localhost:8082/users/signin", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(formData),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((user_data) => {
          setLoggedIn(true);
          setUserData(user_data);
          navigate("/account");
        });
      } else if (res.status === 400) {
        setFormDataWrong(true);
      }
    });
  };

  return (
    <div className="login-form">
      <h2>Sign In</h2>
      {formDataWrong ? <span>username/password incorrect.</span> : <></>}

      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleSignIn}
          placeholder={formDataMissing ? "**Required" : ""}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleSignIn}
          placeholder={formDataMissing ? "**Required" : ""}
        />
        <button type="submit">Sign In</button>
      </form>
      <p> Don't have an account yet?</p>
      <button onClick={() => navigate("/signup")}>Create account</button>
    </div>
  );
};

// export default Signin;

// import { Link, useNavigate } from "react-router-dom";
// import { UserAuth } from "../context/AuthContext";
// import firebase from "firebase/compat/app";

// const { signIn } = UserAuth();
// const { setLoggedIn, setUserData } = useContext(supplyContext);
// const [isDataFilled, setIsDataFilled] = useState(true);
// const [loginData, setLoginData] = useState({
//   username: "",
//   password: "",
// });

// const navigate = useNavigate();

// const handleSignIn = (username, password) => {
//   firebase
//     .auth()
//     .signInWithEmailAndPassword(email, password)
//     .then((userCredential) => {
//       // Sign-in successful
//       const user = userCredential.user;
//       console.log(user);
//     })
//     .catch((error) => {
//       // An error occurred during sign-in
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(errorCode, errorMessage);
//     });

// const signIn = async () => {
//   const queryParams = `?username=${encodeURIComponent(
//     loginData.username
//   )}&password=${encodeURIComponent(loginData.password)}`;
//   fetch(`http://localhost:3001/login${queryParams}`)
//     .then((res) => res.json())
//     .then((userdata) => {
//       if (userdata.user) {
//         setLoggedIn(true);
//         setUserData(userdata.user[0]);
//         navigate("/account");
//       } else {
//         console.log(userdata);
//       }
//     });
// };

// const handleSubmit = (e) => {
//   e.preventDefault();
//   if (loginData.username && loginData.password) getUserData();
//   else setIsDataFilled(false);
// };

// {/* <div className="max-w-[700px] mx-auto my-16 p-4">
// <div>
//   <h1 className="text-2xl font-bold py-2">Sign in to your account</h1>
//   <p className="py-2">
//     Don't have an account yet?{" "}
//     <Link to="/signup">
//       <button className="loginbutton">Sign up!</button>
//     </Link>
//   </p>
// </div> */}

// <form onSubmit={handleSubmit}>
//           <div className="flex flex-col py-2">
//             <label className="py-2 font-medium">Email Address</label>
//             <input
//               className="label-input"
//               type="text"
//               name="username"
//               value={loginData.username}
//               onChange={handleInputChange}
//               placeholder={isDataFilled ? "" : "*missing email"}
//             />
//           </div>
//           <div className="flex flex-col py-2">
//             <label className="py-2 font-medium">Password</label>
//             <input
//               className="label-input"
//               type="password"
//               name="password"
//               value={loginData.password}
//               onChange={handleInputChange}
//               placeholder={isDataFilled ? "" : "*missing password"}
//             />
//           </div>
//           <button className="border border-blue-500 bg-blue-600 hover:bg-blue-500 w-full p-4 my-2 text-white">
//             Sign In
//           </button>
//         </form>
