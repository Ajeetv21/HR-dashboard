import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchEmployees, deleteEmployee, updateEmployee } from "../features/EmployeeSlice";
import DropdownMenu from "../pages/DropdownMenu";
import Search from "../components/reusableComponent/Search";
import EditAttendanceModel from "../components/forms/EditAttendanceModel"
import "./Attendance.css"

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
    dispatch(fetchEmployees());
  };

  const EditHandler = (id) => {
    const employee = employees.find(emp => emp._id === id);
    setSelectedEmployee(employee);
    dispatch(fetchEmployees());
    setIsEditOpen(true);
  };

  const handleUpdate = (id, updatedData) => {
    dispatch(updateEmployee({ id, updatedData }));
    dispatch(fetchEmployees());
    setIsEditOpen(false);
  };

  return (
    <div>
      <div >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }} className="header-group">
          <div style={{ display: "flex", gap: 10 }} className="option ">
            <select style={{ paddingLeft: 10, paddingRight: 10, borderRadius: 50 }}>
              <option value="">All</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
              <option value="Medical Leave">Medical Leave</option>
              <option value="Work from Home">Work from Home</option>

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
              <th>Position</th>
              <th>Department</th>
              <th>Task</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

        
            <tbody>
              {employees.map((employee, index) => (
                <tr key={employee._id}>
                  <td>{index + 1}</td>
                  <td>{employee.EmployeeName}</td>
                  <td>{employee.position || "..."}</td>
                  <td>{employee.department || "..."}</td>
                  <td>{employee.tasks || "..."}</td>

                  <td>
                    <select
                      value={employee.status}
                      onChange={(e) => {
                        const newStatus = e.target.value;
                        dispatch(updateEmployee({
                          id: employee._id,
                          updatedData: { status: newStatus },
                        })).then(() => {
                          dispatch(fetchEmployees());
                        });
                      }}
                      style={{ color: employee.status === "Present" ? "green" : "red" }}
                    >
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
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
      <EditAttendanceModel
        employee={selectedEmployee}
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        onSave={handleUpdate}
      />
    </div>
  );
}

export default Employee;
