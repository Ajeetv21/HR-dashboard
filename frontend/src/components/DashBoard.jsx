import React from "react";
import Logo from "../assets/icons/Logo.svg";
import candidateLogo from "../assets/icons/user-add.svg";
import employeeLogo from "../assets/icons/user-group.svg";
import AttedanceLogo from "../assets/icons/Signal.svg";
import leavesLogo from "../assets/icons/shine-2.svg";
import logOutLogo from "../assets/icons/logOut.svg";
import "./DashBoard.css";
import DashBoardLeftText from "./DashBoardLeftText";
import DashBoardLeftNav from "./DashBoardLeftNav";
import DashBoardRightHead from "./DashBoardRightHead";

import Candidates from "../pages/Candidates";
import Employee from "../pages/Employee";
import Attendance from "../pages/Attendance";
import Leaves from "../pages/Leaves";

import { Link } from "react-router-dom";

function DashBoard(props) {
  return (
    <div className="dashboard">
      <div className="dashboardLeft">
        <div className="leftHeader">
          <img src={Logo} alt="logo" />
          <input type="search" name="search" id="search" placeholder="Search" />
        </div>
        <div className="leftNavigation">
          <DashBoardLeftText text="Recruitment" />
          <Link className="link" to="/dashboard/candidate">
            <DashBoardLeftNav path={candidateLogo} text="Candidates" />
          </Link>
          <DashBoardLeftText text="Organization" />
          <Link className="link" to="/dashboard/employees">
            <DashBoardLeftNav path={employeeLogo} text="Employees" />
          </Link>
          <Link className="link" to="/dashboard/attendance">
            <DashBoardLeftNav path={AttedanceLogo} text="Attendance" />
          </Link>
          <Link className="link" to="/dashboard/leaves">
            <DashBoardLeftNav path={leavesLogo} text="Leaves" />
          </Link>
          <DashBoardLeftText text="Others" />
          <Link className="link" to="/">
            <DashBoardLeftNav path={logOutLogo} text="Logout" />
          </Link>
        </div>
      </div>

      <div className="dashboardRight">
        <div className="rightHeader">
          <DashBoardRightHead text={props.heading} />
        </div>
        <div className="rightData">{props.tag}</div>
      </div>
    </div>
  );
}

export default DashBoard;
