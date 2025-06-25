import React from "react";
import DashBoard from "../DashBoard";
import Leaves from "../../pages/Leaves";
import Button from "../reusableComponent/button";
import CloseCircle from "../../assets/icons/close-circle.svg";
import { Link } from "react-router-dom";
import Logout from "../Logout";
import './AddNewLeaves.css'

function AddNewLeaves() {
  return (
    <div>
      <DashBoard tag={<Leaves />} />
      <div className="background"></div>

      <div className="popUp">
        <div className="leave-heading">
          <p style={{color:"black"}}>Add New Leave</p>
          <Link to="/dashboard/leaves">
            {" "}
            <button id="save">
              {" "}
              <img src={CloseCircle} alt="closeCircle" />{" "}
            </button>{" "}
          </Link>
        </div>

        <form action="">
          <input
            type="text"
            name="full name"
            id="fullname"
            placeholder="Full Name"
            required
          />

          <input
            type="text"
            name="designation"
            id="designation"
            placeholder="Designation"
            required
          />

          <input
            type="date"
            name="leavedate"
            id="leavedate"
            placeholder="Leave Date"
          />

          <input
            type="text"
            name="reason"
            id="reason"
            placeholder="Reason"
            required
          />

          <input
            type="file"
            name="attachment"
            id="attachment"
            placeholder="Attachment"
            required
          />
        </form>

        <div className="bottom">
          <Button text="Save" />
        </div>
      </div>

      <Logout />
    </div>
  );
}

export default AddNewLeaves;
