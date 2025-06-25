import React, { useEffect, useState } from "react";
import DropDown from "../components/reusableComponent/DropDown";
import Button from "../components/reusableComponent/button";
import Search from "../components/reusableComponent/Search";
import './Candidates.css'
import { MdDelete } from "react-icons/md";

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteCandidate, fetchCandidate, updateCandidate } from "../features/CandidateSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Candidates() {



  const { candidates, loading, error } = useSelector((state) => state.candidate)

  const dispatch = useDispatch()
  const token = localStorage.getItem('authToken')
  useEffect(() => {

    dispatch(fetchCandidate())

  }, []);


  candidates.map((candidate, id) => (
    console.log(candidate._id)
  ))

  // 
  const showDeleteConfirmation = (onConfirm) => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete?</p>
          <button
            onClick={() => {
              onConfirm();
              closeToast();
            }}
            style={{ marginRight: '10px' }}
          >
            Yes
          </button>
          <button onClick={closeToast}>No</button>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false
      }
    );
  };
  const handleDelete = (id) => {

    showDeleteConfirmation(() => {
      dispatch(deleteCandidate(id))
      dispatch(fetchCandidate())
    })


  }

  return (
    <div className="candidate">
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
          <Link to="/dashboard/addNewCandidate">
            <Button text="Add New Candidate" />{" "}
          </Link>
        </div>
      </div>

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

              <td>
                <select
                  value={candidate.status}
                  onChange={(e) => {
                    const newStatus = e.target.value;
                    dispatch(updateCandidate({
                      id: candidate._id,
                      updatedData: { status: newStatus },
                    })).then(() => {
                      dispatch(fetchCandidate());
                    });
                  }}
                  style={{ color: candidate.status === "Selected" ? "green" : "red" }}
                >
                  <option value="New">New</option>
                  <option value="Selected">Selected</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Pending">Pending</option>
                  <option value="ongoing">Ongoing</option>
                </select>
              </td>
              <td>{candidate.experience}</td>
              <td>
                {candidate.file ? (
                  <a
                    href={`http://localhost:4000/${candidate.file}`}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    download
                  </a>
                ) : (
                  <span style={{ color: "#888" }}>No Resume</span>
                )}
              </td>
              <td>
                <p>
                  <button onClick={() => handleDelete(candidate._id)} >
                    <MdDelete />
                  </button>
                </p>
              </td>
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
