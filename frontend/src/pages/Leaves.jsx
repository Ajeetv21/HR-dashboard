import React, { useEffect, useState } from "react";
import Search from "../components/reusableComponent/Search";
import Button from "../components/reusableComponent/button";
import Calender from "./Calender";
import "./Leaves.css";
import { Link } from "react-router-dom";
import axios from 'axios'
function Leaves() {
  
  
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    
   axios.get('http://localhost:4000/api/getAllEmployee')
   .then((response)=>{
    setLeaves(response.data)

   })
   .catch((error)=>{
    console.log("Error fetching candidates")
   })
   
  }, []);
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
        <table border={0}>
          <tr style={{ backgroundColor: "#783FED", color: "#ffffff" }}>
            <th style={{ textAlign: "left", marginLeft: 10 }} colSpan={6}>
              Applied Leaves
            </th>
          </tr>
          <tr className="tableHeading">
            <th></th>
            <th>Name</th>
            <th>Date</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Docs</th>
          </tr>

          {
      leaves.map((item,index) =>
   <tr className="leave-row" key={index}>

    <td>{item.fullname}</td>
    <td>{item.reason}</td>
    <td>{item.designation}</td>
    <td>{item.startDate}</td>
   <td>{item.status}</td>
   </tr>
      )
}
        </table>

       <Calender/>
      </div>
    </div>
  );
}

export default Leaves;
