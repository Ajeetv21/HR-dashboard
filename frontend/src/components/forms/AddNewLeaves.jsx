import React, { useState } from "react";
import DashBoard from "../DashBoard";
import Leaves from "../../pages/Leaves";
import Button from "../reusableComponent/button";
import CloseCircle from "../../assets/icons/close-circle.svg";
import { Link } from "react-router-dom";
import Logout from "../Logout";
import './AddNewLeaves.css';
import { ByNameSearchEmployee } from "../../features/EmployeeSlice";
import { useDispatch, useSelector } from "react-redux";

function AddNewLeaves() {
  const dispatch = useDispatch();
  const [nameInput, setNameInput] = useState("");
  const [designation, setDesignation] = useState("");
  const [leavedate, setLeavedate] = useState("");
  const [reason, setReason] = useState("");
  const [file, setFile] = useState(null);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { employees } = useSelector((state) => state.employees);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(createCandidate({ name:nameInput, email, phone, position, status, experience, file }));
    } catch (error) {
      console.log(error.message);
    }
    setName("");
    setEmail("");
    setPhone("");
    setPosition("");
    setStatus("New");
    setExperience("");
    setFile(null);
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

  const handleNameSelect = (name) => {
    setNameInput(name);
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

        <form action="">
          <div className="input-group">
            <input
              type="text"
              name="full name"
              id="fullname"
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
                    onClick={() => handleNameSelect(emp.EmployeeName)}
                  >
                    {emp.EmployeeName}
                  </div>
                ))}
              </div>
            )}
          </div>

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
