import React, { useState } from "react";
import "./UserRegistration.css";
import Image from "../assets/images/registrationImg.svg";
import Logo from "../assets/icons/Logo.svg";
import { Link, useNavigate } from "react-router-dom";

function UserLogin() {

const [email,setEmail]=useState("");
const [password,setPassword]=useState("")
const navigate=useNavigate()
const handleSubmit = async(e)=>{
  console.log(email,password)
 e.preventDefault();
 let result = await fetch('http://localhost:4000/api/login',{
  method:"post",
  body:JSON.stringify({email,password}),
  headers:{
     "Content-Type": "application/json"
  }
 });
 result = await  result.json();
 console.log(result);
localStorage.setItem("user",JSON.stringify(result));
navigate('/dashboard/candidate')

}

  return (
    <div className="userRegistration">
      <div className="content">
        <div className="leftPanel">
          <img src={Logo} alt="Logo" />
          <div className="userData">
            <h2>Welcome to Dashboard</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="email" className="userLabel">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                placeholder="Email Address"

              />
              <label htmlFor="password" className="userLabel">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />

              <button id="register">Login</button>
              <p>
                Don't have an account{" "}
                <span>
                  <Link to="/register">Register</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
        <div className="rightPanel">
          <img src={Image} alt="" />
          <h2>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero, eum!
          </h2>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corrupti
            nulla impedit quod commodi et eius nobis eos iure minus ratione.
          </p>
          <nav>
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default UserLogin;
