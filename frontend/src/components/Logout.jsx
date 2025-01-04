import React from "react";
import { useLocation } from "react-router-dom";

function Logout() {
  const location = useLocation();

  return (
    <div>
      <p>Current Path: {location.pathname} </p>
    </div>
  );
}

export default Logout;
