import React from "react";
import Mail from "../assets/icons/mail.svg";
import Notification from "../assets/icons/notifications.svg";
import avtar from "../assets/icons/user-circle.svg";
import dropdown from "../assets/icons/dropdown.svg";

function DashBoardRightHead(props) {
  return (
    <div>
      <nav style={styles.navBar}>
        <h2> {props.text} </h2>
        <div className="rightIcons">
          <img style={styles.navBarImg} src={Mail} alt="" />
          <img style={styles.navBarImg} src={Notification} alt="" />
          <img style={styles.navBarImg} src={avtar} alt="" />
          <img src={dropdown} alt="" />
        </div>
      </nav>
      <hr style={styles.line} />
    </div>
  );
}

const styles = {
  line: {
    backgroundColor: "#e5e5e5",
    height: 1,
    border: "none",
    marginBottom: 20,
  },
  navBar: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  navBarImg: {
    marginLeft: 20,
  },
};

export default DashBoardRightHead;
