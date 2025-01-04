import React from 'react'
import { Navigate, Outlet, useNavigate } from "react-router-dom";
function PrivateComponent() {
  
    const auth = localStorage.getItem("user");
    <Outlet/>
     return auth?<Outlet/>:<Navigate to="/register"/>
}

export default PrivateComponent
