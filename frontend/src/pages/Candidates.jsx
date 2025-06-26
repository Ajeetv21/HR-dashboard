import React, { useEffect, useState } from "react";
import DropDown from "../components/reusableComponent/DropDown";
import Button from "../components/reusableComponent/button";
import './Candidates.css';
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCandidate,
  fetchCandidate,
  updateCandidate,
  ByNameSearchCandidate,
  searchByPsCandidate
} from "../features/CandidateSlice";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Candidates() {
  const dispatch = useDispatch();
  const { candidates, loading, error } = useSelector((state) => state.candidates);

  const [statusFilter, setStatusFilter] = useState('');
  const [positionFilter, setPositionFilter] = useState('');
  const [searchName, setSearchName] = useState('');

  useEffect(() => {
    if (searchName.trim()) {
      dispatch(ByNameSearchCandidate({ name: searchName.trim() }));
    } else if (statusFilter || positionFilter) {
      dispatch(searchByPsCandidate({ status: statusFilter || undefined, position: positionFilter || undefined }));
    } else {
      dispatch(fetchCandidate());
    }
  }, [statusFilter, positionFilter, searchName, dispatch]);

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
      dispatch(deleteCandidate(id)).then(() => {
        dispatch(fetchCandidate());
      });
    });
  };

  const clearFilters = () => {
    setStatusFilter('');
    setPositionFilter('');
    setSearchName('');
    dispatch(fetchCandidate());
  };

  return (
    <div className="candidate">
      <div
        style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}
        className="header-group"
      >
        <div style={{ display: "flex", gap: 10 }} className="option">
          <select
            style={style.dropdown}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="New">New</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            style={style.dropdown}
            value={positionFilter}
            onChange={(e) => setPositionFilter(e.target.value)}
          >
            <option value="">All Positions</option>
            <option value="Designer">Designer</option>
            <option value="Developer">Developer</option>
            <option value="Human Resource">Human Resource</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: 20 }} className="btngrp">
          <input
            type="search"
            placeholder="Search by name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            style={style.input}
          />
          <Button text="Clear Filters" onClick={clearFilters} />
          <Link to="/dashboard/addNewCandidate">
            <Button text="Add New Candidate" />
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
          {loading ? (
            <tr><td colSpan="9">Loading...</td></tr>
          ) : candidates.length === 0 ? (
            <tr><td colSpan="9">No candidates found.</td></tr>
          ) : (
            candidates.map((candidate, index) => (
              <tr key={candidate._id}>
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
                        updatedData: { status: newStatus }
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
                      Download
                    </a>
                  ) : (
                    <span style={{ color: "#888" }}>No Resume</span>
                  )}
                </td>
                <td>
                  <button onClick={() => handleDelete(candidate._id)}>
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

const style = {
  dropdown: { paddingLeft: 10, paddingRight: 10, borderRadius: 50 },
  input: { padding: "6px 12px", borderRadius: 50, border: "1px solid #ccc" }
};

export default Candidates;
