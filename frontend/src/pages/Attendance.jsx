import React from "react";
import Search from "../components/reusableComponent/Search";
import "./Attendance.css";

function Attendance() {
  return (
    <div>
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
          className="header-group"
        >
          <div style={{ display: "flex", gap: 10 }} className="option">
            <select
              style={{ paddingLeft: 10, paddingRight: 10, borderRadius: 50 }}
            >
              <option value="All">All</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Medical Leave">Medical Leave</option>
              <option value="Work From Home">Work From Home</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: 20 }} className="btngrp">
            <Search />
          </div>
        </div>

        <div className="attendanceData">
          <table border>
            <tr>
              <th colSpan={2}>Profile</th>
              <th>Employee Name</th>
              <th>Designation</th>
              <th>Department</th>
              <th>Task</th>
              <th colSpan={2}>Status</th>
            </tr>

            <tr>
              <td>-</td>
              <td>--</td>
              <td>Ritik Prakash</td>
              <td>Intern</td>
              <td>Backend Development</td>
              <td>Mobile app login page integration</td>
              <td>Work from Home</td>
              <td>...</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Attendance;
