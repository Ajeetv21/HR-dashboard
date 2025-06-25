import React, { useEffect, useState } from "react";
import Search from "../components/reusableComponent/Search";
import Button from "../components/reusableComponent/button";
import Calender from "./Calender";
import "./Leaves.css";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaves } from "../features/leaveSlice";
import { fetchCandidate, updateCandidate } from "../features/CandidateSlice";
function Leaves() {



  const dispatch = useDispatch()
  const { leaves, loading, error } = useSelector((state) => state.leaves)


  useEffect(() => {
    dispatch(fetchLeaves())
  }, [])

  console.log(leaves)


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
          >
            <option value="All">All</option>
            <option value="Pendig">Pendig</option>
            <option value="Approved">Approved</option>
            <option value="Reject">Reject</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: 20 }} className="btngrp">
          <Search />
          <Link to="/dashboard/addnewleaves">
            <Button text="Add New Leave" />
          </Link>
        </div>
      </div>
      <div className="leaveData">

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

          <tbody>
            {
              leaves.map((item, index) =>
                <tr key={index}>

                  <td>{item.employeeId.EmployeeName}</td>
                  <td>{item.LeaveDate}</td>
                  <td>{item.reason}</td>

                  <td>
                    <select
                      value={item.status}
                      style={{ color: item.status === "approved" ? "green" : "red" }}
                    >
                      
                      <option value="approved">Approved</option>
                      <option value="pending">Pending</option>
                      <option value="rejected">Rejected</option>
                     
                    </select>
                  </td>

                  <td>
                    <a
                      href={`http://localhost:4000/${leaves.file}`}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      download
                    </a>

                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
        <Calender />
      </div>
    </div>
  );
}

export default Leaves;
