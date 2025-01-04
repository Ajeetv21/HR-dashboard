
import Search from "../components/reusableComponent/Search";

import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

import axios from 'axios';

function Employee() {

  const [employees, setEmployees] = useState([]);


  useEffect(() => {

    fetch("http://localhost:4000/api/employees")
      .then(response => response.json())
      .then(data => {
        setEmployees(data)
      })


  }, []);


  const DeleteHandler = async (id) => {

    try {
      await axios.delete(`http://localhost:4000/api/employees/${id}`);
      setEmployees((prev) => prev.filter((employee) => employee.id !== id));
      alert(id);
    } catch (err) {
      console.error('Error deleting employee:', err);
      alert('Failed to delete employee. Please try again.');
    }

  };
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
              <option value="Designer">Designer</option>
              <option value="Developer">Developer</option>
              <option value="Human Resource">Human Resource</option>
            </select>
          </div>

          <div style={{ display: "flex", gap: 20 }} className="btngrp">
            <Search />
          </div>
        </div>
        <h1>Employee Page</h1>
        <table>
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Employee Name</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Position</th>
            <th>Department</th>
            <th>Date of joining</th>
            <th></th>
            <th></th>

          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee._id}>
              <td>{index + 1}</td>
              <td>{employee.EmployeeName}</td>
              <td>{employee.email}</td>
              <td>{employee.phone}</td>
              <td>{employee.position}</td>

              <td>{new Date(employee.date).toLocaleDateString()}</td>
              <td><p><button onClick={() => DeleteHandler(employee._id)}>delete</button></p></td>
              <td><Link to={"/employeeUpdate/"+employee._id}>
                <button>Edit</button>
              </Link></td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Employee;
