import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, deleteEmployee, updateEmployee } from "../features/EmployeeSlice";
import DropdownMenu from "../pages/DropdownMenu";
import Search from "../components/reusableComponent/Search";
import EditEmployeeModal from "../components/forms/EditEmployeeModal";

function Employee() {
  const { employees, loading, error } = useSelector((state) => state.employees);
  const dispatch = useDispatch();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const DeleteHandler = (id) => {
    dispatch(deleteEmployee(id));
  };

  const EditHandler = (id) => {
    const employee = employees.find(emp => emp._id === id);
    setSelectedEmployee(employee);
    setIsEditOpen(true);
  };

  const handleUpdate = (id, updatedData) => {
    dispatch(updateEmployee({ id, updatedData }));
    dispatch(fetchEmployees());
    setIsEditOpen(false);
  };

  return (
    <div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }} className="header-group">
          <div style={{ display: "flex", gap: 10 }} className="option">
            <select style={{ paddingLeft: 10, paddingRight: 10, borderRadius: 50 }}>
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
              <th>Action</th>
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
                <td>{employee.position ? employee.position : "..."}</td>
                <td>{employee.department ? employee.department : "..."}</td>
                <td>
                  {new Date(employee.date).toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}
                </td>
                <td colSpan={2}>
                  <div style={{ position: "relative", display: "inline-block" }}>
                    <DropdownMenu
                      employeeId={employee._id}
                      onEdit={EditHandler}
                      onDelete={DeleteHandler}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Popup */}
      <EditEmployeeModal
        employee={selectedEmployee}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleUpdate}
      />
    </div>
  );
}

export default Employee;
