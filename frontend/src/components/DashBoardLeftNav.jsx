import React from "react";
import { logout } from "../features/authSlice";


function DashBoardLeftNav(props) {

  return (
    <div style={styles.container} onClick={props.onClick}>
      <img src={props.path} alt="Logo" />{" "}
      <p style={styles.font}>{props.text}</p>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
    marginTop: 15,
    marginLeft: 20,
  },

  font: {
    fontSize: 16,
    color: "#121212",
    fontWeight: 400,
  },
};

export default DashBoardLeftNav;
