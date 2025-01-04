import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


const EmployeeForm = () => {
  const [EmployeeName, setEmployeeName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [showModal, setShowModal] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getEmployeeDetails();
  }, []);

  const getEmployeeDetails = async () => {
    try {
      let result = await fetch(`http://localhost:4000/api/employees/${params.id}`);
      result = await result.json();

      setEmployeeName(result.EmployeeName || "");
      setEmail(result.email || "");
      setPhone(result.phone || "");
      setPosition(result.position || "");
      setDepartment(result.department || "");
    } catch (error) {
      console.error("Failed to fetch employee details:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result = await fetch(`http://localhost:4000/api/employees/update/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({ EmployeeName, email, phone, position, department }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      result = await result.json();

      if (result) {
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to update employee:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="candidatePage">
      <div className="background"></div>
      {showModal && (
        <div className="popUp">
          <div className="heading">
            <p>Add Candidate</p>
            <button id="save" onClick={closeModal}>
              &times;
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                value={EmployeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Position:</label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select Position
                </option>
                <option value="Designer Intern">Designer Intern</option>
                <option value="Developer">Developer</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Designer Full time">Designer Full time</option>
                <option value="Developer Full time">Developer Full time</option>
              </select>
            </div>
            <div>
              <label>Department:</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                required
              />
            </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EmployeeForm;
