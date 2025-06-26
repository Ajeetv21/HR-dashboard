import React, { useState } from "react";
import "./UserRegistration.css";
import Image from "../assets/images/registrationImg.svg";
import Logo from "../assets/icons/Logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/authSlice";

function UserLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

 const handleSubmit = async (e) => {
    e.preventDefault();

    const result =  dispatch(loginUser({ email, password }));
   
    if (loginUser) {
      navigate('/dashboard/candidate');
    }
};

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
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                required
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
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <button id="register" type="submit" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </button>

              {error && <p style={{ color: 'red' }}>{error}</p>}

              <p>
                Don't have an account?{" "}
                <span>
                  <Link to="/register">Register</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
        <div className="rightPanel">
          <img src={Image} alt="Registration" />
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
