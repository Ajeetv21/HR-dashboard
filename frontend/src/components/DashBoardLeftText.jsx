import React from "react";

function DashBoardLeftText(props) {
  return (
    <div>
      <p style={para}> {props.text} </p>
    </div>
  );
}

const para = {
  fontSize: 16,
  color: "#A4A4A4",
  marginTop: 30,
  marginLeft: 20,
};

export default DashBoardLeftText;
