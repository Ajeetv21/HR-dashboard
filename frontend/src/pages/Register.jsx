
import React, { useEffect, useState } from "react";
import "./UserRegistration.css";
import Image from "../assets/images/registrationImg.svg";
import Logo from "../assets/icons/Logo.svg";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
function Register() {
  const [username ,setuserName ]=useState("");
  const [email,setEmail]=useState("")
  const [password ,setPassword]=useState("");
 const navigate= useNavigate()

  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/register",
        {
          username,
          email,
          password
         
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      
    } catch (err) {
      alert("There was an error submitting the form.");
    }
    setuserName('');
    setEmail('');
    setPassword('');
    navigate('/')

  }
  return (
    <div className="userRegistration">
      <div className="content">
        <div className="leftPanel">
          <img src={Logo} alt="Logo" />
          <div className="userData">
            <h2>Welcome to Dashboard</h2>
            <form onSubmit={handleSubmit}>
              <label >
                Full name
              </label>
              <input
                type="text"
                name="username"
                id="name"
              value={username}
                onChange={(e)=>setuserName(e.target.value)}
                placeholder="Full name"
              />
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
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                placeholder="Password"
              />
           
           <button id="register">Register</button>
              <p>
                Already have an account{" "}
                <span>
                  <Link to="/">Login</Link>
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

export default Register;
