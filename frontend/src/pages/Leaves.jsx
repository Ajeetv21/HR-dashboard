import React, { useEffect, useState } from "react";
import Search from "../components/reusableComponent/Search";
import Button from "../components/reusableComponent/button";
import Calender from "./Calender";
import "./Leaves.css";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaves, statusSearch, updateLeaveStatus } from "../features/leaveSlice";
import { ByNameSearchEmployee } from "../features/EmployeeSlice";
function Leaves() {



  const dispatch = useDispatch()
  const { leaves, loading, error } = useSelector((state) => state.leaves)

  const [statusFilter, setStatusFilter] = useState('');
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    if (searchName.trim()) {
      dispatch(ByNameSearchEmployee({ name: searchName.trim() }));} 
      else if (statusFilter) {
      dispatch(statusSearch({ status: statusFilter || undefined }));
    } else {
     dispatch(fetchLeaves())
    }
  }, [statusFilter,searchName, dispatch]);



  useEffect(() => {
    dispatch(fetchLeaves())
  }, [dispatch])


  return (
    <div className="box">
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
             value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: 20 }} className="btngrp">
            {/* <input
              type="search"
              placeholder="Search by name"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              style={style.input}
            /> */}
          <Link to="/dashboard/addnewleaves">
            <Button text="Add New Leave" />
          </Link>
        </div>
      </div>
      <div className="leaveData">
         <div className="leaveData-table">
              <table >

          <thead>
            <tr className="table-heading"><th><h2>Applied</h2></th></tr>
            <tr>

              <th>Name</th>
              <th>Date</th>
              <th>Reason</th>
              <th>Status</th>
              <th>Docs</th>
            </tr>
          </thead>

          <tbody className="scrollable-leaves">
            {
              leaves.map((item, index) =>
                <tr key={index}>

                  <td>{item.employeeId.EmployeeName}</td>
                  <td>{item.LeaveDate}</td>
                  <td>{item.reason}</td>

                  <td>
                    <select

                      value={item.status}
                      onChange={(e) => {
                        const newStatus = e.target.value;
                        console.log(newStatus);
                        dispatch(updateLeaveStatus({
                          id: item._id,
                          updatedData: { status: newStatus }
                        })).then(() => {
                          dispatch(fetchLeaves());
                        });
                      }}
                      style={{ color: item.status === "approved" ? "green" : "red" }}
                    >
                      
                      <option value="approved">Approved</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>

                    </select>
                  </td>

                  <td>

                    {item.file ? (
                      <a
                        href={`http://localhost:4000/${item.file}`}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        download
                      </a>) : (
                      <p>No document</p>
                    )
                    }


                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
         </div>
       
        <Calender />
      </div>
    </div>
  );
}
const style = {
 input: { padding: "6px 12px", borderRadius: 50, border: "1px solid #ccc" }
};
export default Leaves;
