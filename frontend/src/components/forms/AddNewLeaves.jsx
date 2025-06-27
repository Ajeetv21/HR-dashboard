import React, { useState } from "react";
import DashBoard from "../DashBoard";
import Leaves from "../../pages/Leaves";
import CloseCircle from "../../assets/icons/close-circle.svg";
import { Link } from "react-router-dom";
import './AddNewLeaves.css';
import { ByNameSearchEmployee } from "../../features/EmployeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { createLeave } from "../../features/leaveSlice";

function AddNewLeaves() {
  const dispatch = useDispatch();
  const [nameInput, setNameInput] = useState("");
  const [designation, setDesignation] = useState("");
  const [LeaveDate, setLeaveDate] = useState("");
  const [reason, setReason] = useState("");
  const [file, setFile] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");

  const { employees } = useSelector((state) => state.employees);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("employeeId", selectedEmployeeId);
    formData.append("designation", designation);
    formData.append("LeaveDate", LeaveDate);
    formData.append("reason", reason);
    formData.append("file", file);

    try {
      dispatch(createLeave(formData));
      setNameInput("");
      setSelectedEmployeeId("");
      setDesignation("");
      setLeaveDate("");
      setReason("");
      setFile(null);
      setShowSuggestions(false);
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setNameInput(value);
    if (value.trim() !== "") {
      dispatch(ByNameSearchEmployee({ name: value }));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleNameSelect = (name, id) => {
    setNameInput(name);
    setSelectedEmployeeId(id);
    setShowSuggestions(false);
  };

  return (
    <div>
      <DashBoard tag={<Leaves />} />
      <div className="background"></div>

      <div className="popUp">
        <div className="leave-heading">
          <p style={{ color: "black" }}>Add New Leave</p>
          <Link to="/dashboard/leaves">
            <button id="save">
              <img src={CloseCircle} alt="closeCircle" />
            </button>
          </Link>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="text"
              placeholder="Full Name"
              value={nameInput}
              onChange={handleNameChange}
              autoComplete="off"
              required
            />
            {showSuggestions && employees?.length > 0 && (
              <div className="suggestions">
                {employees.map((emp) => (
                  <div
                    key={emp._id}
                    className="suggestion-item"
                    onClick={() => handleNameSelect(emp.EmployeeName, emp._id)}
                  >
                    {emp.EmployeeName}
                  </div>
                ))}
              </div>
            )}
          </div>

          <input
            type="text"
            placeholder="Designation"
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            required
          />

          <input
            type="date"
            value={LeaveDate}
            onChange={(e) => setLeaveDate(e.target.value)}
          />

          <input
            type="text"
            placeholder="Reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            required
          />

          <div className="bottom">
            <button type="submit" className="custom-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNewLeaves;
