import React from "react";

function DropDown() {
  return (
    <div>
      <select>
        <option value="All">All</option>
        <option value="New">New</option>
        <option value="Ongoing">Ongoing</option>
        <option value="Selected">Selected</option>
        <option value="Rejected">Rejected</option>
      </select>
    </div>
  );
}

export default DropDown;
