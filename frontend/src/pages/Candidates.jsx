import React, { useEffect, useState } from "react";
import DropDown from "../components/reusableComponent/DropDown";
import Button from "../components/reusableComponent/button";
import Search from "../components/reusableComponent/Search";
import './Candidates.css'
import { MdDelete } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Link } from "react-router-dom";

function Candidates() {

  const [candidates, setCandidates] = useState([]);

  const navigate = useNavigate();
  useEffect(() => {
   
   axios.get('http://localhost:4000/api/candidates')
   .then((response)=>{
    setCandidates(response.data)

   })
   .catch((error)=>{
    console.log("Error fetching candidates")
   })
   
  }, []);

  const handleDelete  = async (id) => {
   
  let result = await fetch(`http://localhost:4000/api/candidats/${id}`,{
    method:"Delete"
  });

  result = await result.json();  
  
  };
  return (
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
          <select style={style.dropdown}>
            <option value="All">All</option>
            <option value="New">New</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select style={style.dropdown}>
            <option value="All">All</option>
            <option value="Designer">Designer</option>
            <option value="Developer">Developer</option>
            <option value="Human Resource">Human Resource</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: 20 }} className="btngrp">
          <Search />
          <Link to="/dashboard/addnewcandidate">
            <Button text="Add New Candidate" />{" "}
          </Link>
        </div>
      </div>
      <h1>Candidate Page</h1>

      <table>
        <thead>
          <tr>
            <th>Sr No.</th>
            <th>Candidate Name</th>
            <th>Email Address</th>
            <th>Phone Number</th>
            <th>Position</th>
            <th>Status</th>
            <th>Experience</th>
            <th>Resume</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{candidate.name}</td>
              <td>{candidate.email}</td>
              <td>{candidate.phone}</td>
              <td>{candidate.position}</td>
              <td className={`status-${candidate.status.toLowerCase()}`}>
                {candidate.status}
              </td>
              <td>{candidate.experience}</td>
              <td>
                {candidate.file? (
                  <a href={`http://localhost:4000/api/${candidate.file}`}>
                  download
                </a>
                
                ) : (
                  <span style={{ color: "#888" }}>No Resume</span>
                )}
              </td>
              <td><p><button onClick={()=>handleDelete(candidate._id)}><MdDelete /></button></p></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const style = {
  dropdown: { paddingLeft: 10, paddingRight: 10, borderRadius: 50 },
};
export default Candidates;
